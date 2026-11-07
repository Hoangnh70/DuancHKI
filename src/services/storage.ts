import { Team, TeamFolder, TopicId, TEACHER_EMAIL } from '../types';
import { INITIAL_SAMPLE_TEAMS } from '../data/sampleTeams';
import { getTopicById } from '../data/curriculum';
import { 
  generateDriveSubfolders, 
  generateClassGoogleSheetUrl, 
  checkLockStatus,
  MASTER_FOLDER_NAME,
  MASTER_FOLDER_ID,
  MASTER_FOLDER_URL
} from './googleDriveWorkspace';

const STORAGE_KEY = 'k9_ai_project_teams_v2';
const EVENT_NAME = 'k9_teams_updated';

export function getTeams(): Team[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_TEAMS));
      return INITIAL_SAMPLE_TEAMS;
    }
    const parsed: Team[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      let needsSave = false;
      const updated = parsed.map(t => {
        if (t.folder && (!t.folder.driveFolderUrl || t.folder.driveFolderUrl.includes('1K9_VSC_') || t.folder.driveFolderUrl.includes('1K9_VINSCHOOL'))) {
          needsSave = true;
          return {
            ...t,
            folder: {
              ...t.folder,
              driveFolderId: MASTER_FOLDER_ID,
              driveFolderUrl: MASTER_FOLDER_URL,
              subfolders: generateDriveSubfolders(t.teamName, t.className, t.id)
            }
          };
        }
        return t;
      });
      if (needsSave) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_TEAMS));
    return INITIAL_SAMPLE_TEAMS;
  } catch (error) {
    console.error('Error reading teams from storage:', error);
    return INITIAL_SAMPLE_TEAMS;
  }
}

export function saveAllTeams(teams: Team[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: teams }));
  } catch (error) {
    console.error('Error saving teams to storage:', error);
  }
}

export function getTeamById(id: string): Team | undefined {
  const teams = getTeams();
  return teams.find(t => t.id === id);
}

export function getTeamByCode(code: string): Team | undefined {
  const normalized = code.trim().toUpperCase();
  const teams = getTeams();
  return teams.find(t => t.teamCode.toUpperCase() === normalized);
}

export function saveTeam(team: Team): void {
  const teams = getTeams();
  const index = teams.findIndex(t => t.id === team.id);
  if (index >= 0) {
    teams[index] = team;
  } else {
    teams.unshift(team);
  }
  saveAllTeams(teams);
}

export function deleteTeam(id: string): void {
  const teams = getTeams();
  const filtered = teams.filter(t => t.id !== id);
  saveAllTeams(filtered);
}

export function generateTeamCode(className: string): string {
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const cleanClass = className.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `K9-${cleanClass}-${randomChars}`;
}

export function toggleTeamLock(teamId: string, forceState?: boolean): void {
  const teams = getTeams();
  const team = teams.find(t => t.id === teamId);
  if (!team) return;

  const currentLock = team.folder.isLocked;
  team.folder.isLocked = forceState !== undefined ? forceState : !currentLock;
  saveTeam(team);
}

export function createNewTeam(data: {
  teamName: string;
  className: string;
  projectType: 'individual' | 'pair';
  topicId: TopicId;
  members: { name: string; studentId: string; email?: string; role?: string }[];
}): Team {
  const id = `team-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  const teamCode = generateTeamCode(data.className);
  const topic = getTopicById(data.topicId);
  const driveFolderId = MASTER_FOLDER_ID;
  const driveFolderUrl = MASTER_FOLDER_URL;
  const classGoogleSheetUrl = generateClassGoogleSheetUrl(data.className);
  const subfolders = generateDriveSubfolders(data.teamName, data.className, id);
  const lockDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const newFolder: TeamFolder = {
    folderId: `folder-${id}`,
    folderName: `${data.teamName.replace(/\s+/g, '_')}_${data.className}_Workspace`,
    driveFolderUrl,
    driveFolderId,
    ownerEmail: TEACHER_EMAIL,
    lockDate,
    isLocked: false,
    classGoogleSheetUrl,
    subfolders,
    selectedMTBIds: [],
    mtbNotes: {},
    userStories: [],
    promptChain: [],
    agileRisks: [],
    ethicsAnalysis: {
      privacyStrategy: '',
      intellectualProperty: '',
      dilemmaSolution: '',
      wellbeingStrategy: ''
    },
    files: [
      {
        id: `f-init-doc-${Date.now()}`,
        title: 'Hồ sơ Báo cáo Dự án Tổng quan (Google Docs)',
        type: 'doc',
        url: `${driveFolderUrl}/doc_tong_quan`,
        description: 'Tài liệu báo cáo tóm tắt nằm trong Folder thuộc sở hữu của Thầy Hoàng',
        updatedAt: new Date().toISOString().split('T')[0]
      }
    ],
    workLogs: [
      {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        author: data.members[0]?.name || 'Học sinh',
        content: `Đăng ký thành công nhóm ${data.teamName} - Lớp ${data.className}. Đã tự động tạo Folder Drive trong Thư mục Tổng (Khối 9) thuộc quyền sở hữu Thầy Hoàng (${TEACHER_EMAIL}). Hạn sửa: 14 ngày.`,
        progressPercent: 10
      }
    ],
    summaryReport: '',
    status: 'draft'
  };

  const newTeam: Team = {
    id,
    teamCode,
    teamName: data.teamName,
    className: data.className,
    projectType: data.projectType,
    topicId: data.topicId,
    members: data.members,
    createdAt: new Date().toISOString(),
    folder: newFolder
  };

  saveTeam(newTeam);
  return newTeam;
}

export function exportTeamsToCSV(): void {
  const teams = getTeams();
  
  // Headers
  const headers = [
    'Mã nhóm',
    'Tên nhóm',
    'Lớp',
    'Hình thức',
    'Chủ đề dự án',
    'Thành viên 1',
    'Mã HS 1',
    'Thành viên 2',
    'Mã HS 2',
    'Số MTB đã chọn',
    'Trạng thái nộp',
    'Điểm số (0-10)',
    'Nhận xét của Giáo viên',
    'Ngày đăng ký'
  ];

  const rows = teams.map(t => {
    const topic = getTopicById(t.topicId);
    const m1 = t.members[0] || { name: '', studentId: '' };
    const m2 = t.members[1] || { name: '', studentId: '' };
    const score = t.folder.teacherAssessment?.score !== undefined 
      ? t.folder.teacherAssessment.score.toString() 
      : 'Chưa chấm';
    const comment = t.folder.teacherAssessment?.comment 
      ? `"${t.folder.teacherAssessment.comment.replace(/"/g, '""')}"` 
      : '""';
    const statusMap = {
      draft: 'Mới khởi tạo',
      in_progress: 'Đang làm việc',
      submitted: 'Đã nộp bài',
      graded: 'Đã có điểm'
    };

    return [
      t.teamCode,
      `"${t.teamName.replace(/"/g, '""')}"`,
      t.className,
      t.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân',
      `"${topic?.shortName || t.topicId}"`,
      `"${m1.name}"`,
      m1.studentId,
      `"${m2.name}"`,
      m2.studentId,
      t.folder.selectedMTBIds.length,
      statusMap[t.folder.status] || t.folder.status,
      score,
      comment,
      new Date(t.createdAt).toLocaleDateString('vi-VN')
    ].join(',');
  });

  // Include UTF-8 BOM for Microsoft Excel Vietnamese support
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `K9_Danh_Sach_Nhom_Du_An_AI_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function subscribeToTeams(callback: (teams: Team[]) => void): () => void {
  const handler = () => {
    callback(getTeams());
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}
