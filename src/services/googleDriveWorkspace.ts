import { Team, DriveSubfolder, TEACHER_EMAIL } from '../types';
import { getTopicById, ALL_MTB_ITEMS } from '../data/curriculum';

export const MASTER_FOLDER_NAME = '[Vinschool K9] Thư Mục Tổng - Dự Án AI Cuối Kỳ I';
export const MASTER_FOLDER_ID = '1GVFf5vXNRCtf06lC0ZueBYi3cXCR3hRh';
export const MASTER_FOLDER_URL = `https://drive.google.com/drive/folders/${MASTER_FOLDER_ID}`;

export function generateDriveSubfolders(teamName: string, className: string, teamId: string): DriveSubfolder[] {
  const cleanName = teamName.replace(/[^a-zA-Z0-9_\-]/g, '_');
  const baseId = `folder_${className}_${cleanName}_${teamId.slice(-6)}`;

  return [
    {
      id: `${baseId}_01_survey`,
      name: '01_Khao_sat_va_User_Story',
      description: 'Chứa biên bản phỏng vấn, khảo sát người dùng, bảng User Story, tài liệu khảo sát (Word, Forms, Docs)',
      url: MASTER_FOLDER_URL,
      allowedTypes: 'Biên bản phỏng vấn, khảo sát nhu cầu, bảng User Stories'
    },
    {
      id: `${baseId}_02_architecture`,
      name: '02_Kien_truc_va_Du_lieu',
      description: 'Sơ đồ kiến trúc mô hình AI, bộ dữ liệu mẫu biến số rời rạc, file CSV/Excel dán nhãn dữ liệu',
      url: MASTER_FOLDER_URL,
      allowedTypes: 'Sơ đồ kiến trúc, tập dữ liệu CSV/Sheets, biến số rời rạc'
    },
    {
      id: `${baseId}_03_prompt_app`,
      name: '03_Prompt_Chain_va_Ung_dung',
      description: 'Thiết kế chuỗi Prompt Chain tuần tự, tài liệu tối ưu câu lệnh, link sản phẩm web/chatbot/mã nguồn',
      url: MASTER_FOLDER_URL,
      allowedTypes: 'Prompt Chain đa bước, mã nguồn GitHub/Colab, link chatbot ứng dụng'
    },
    {
      id: `${baseId}_04_ethics`,
      name: '04_Bao_cao_Dao_duc_va_Ban_quyen',
      description: 'Bản phân tích đạo đức AI, giải pháp tình thế nan giải, cam kết quyền riêng tư (COPPA) và bản quyền SGK',
      url: MASTER_FOLDER_URL,
      allowedTypes: 'Báo cáo đạo đức AI, bản quyền SGK, bảo vệ quyền riêng tư'
    },
    {
      id: `${baseId}_05_slides_video`,
      name: '05_Slide_va_Video_Bao_cao',
      description: 'Slide thuyết trình dự án (Canva / Google Slides), video demo sản phẩm (MP4 / YouTube / Drive link)',
      url: MASTER_FOLDER_URL,
      allowedTypes: 'Slide thuyết trình, video demo 2-3 phút, poster'
    }
  ];
}

export function generateClassGoogleSheetUrl(className: string): string {
  const clean = className.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `https://docs.google.com/spreadsheets/d/1K9_VINSCHOOL_SHEET_${clean}_AI_TRACKING/edit#gid=0`;
}

/**
 * Calculates whether the 14-day (2-week) editing window has expired
 */
export function checkLockStatus(createdAt: string, manuallyLocked?: boolean): {
  isLocked: boolean;
  lockDate: string;
  daysRemaining: number;
  hoursRemaining: number;
  message: string;
} {
  const createdDate = new Date(createdAt);
  const lockTime = createdDate.getTime() + 14 * 24 * 60 * 60 * 1000;
  const lockDate = new Date(lockTime).toISOString();
  const now = Date.now();
  const diffMs = lockTime - now;

  if (manuallyLocked) {
    return {
      isLocked: true,
      lockDate,
      daysRemaining: 0,
      hoursRemaining: 0,
      message: 'Giáo viên đã khóa quyền chỉnh sửa sớm để tiến hành chấm điểm'
    };
  }

  if (diffMs <= 0) {
    return {
      isLocked: true,
      lockDate,
      daysRemaining: 0,
      hoursRemaining: 0,
      message: 'Đã hết thời hạn 2 tuần làm bài. Thư mục đã khóa chỉnh sửa và chuyển thành Chỉ đọc (Read-only)'
    };
  }

  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  return {
    isLocked: false,
    lockDate,
    daysRemaining: days,
    hoursRemaining: hours,
    message: `Thời hạn học sinh được chỉnh sửa: còn ${days} ngày ${hours} giờ (Hết hạn sau 2 tuần)`
  };
}

/**
 * Generates and downloads the Class Google Sheet report as CSV for teacher
 */
export function exportClassGoogleSheetCSV(className: string, teamsInClass: Team[]): void {
  const headers = [
    'STT',
    'Lớp',
    'Tên Nhóm / Đề Tài',
    'Hình Thức',
    'Chủ Đề Dự Án',
    'Họ Tên Học Sinh 1',
    'Email Google HS 1',
    'Họ Tên Học Sinh 2',
    'Email Google HS 2',
    'Link Folder Google Drive (Thầy Hoàng sở hữu)',
    'Danh Sách Mục Tiêu Bài (MTB) Nhóm Chọn',
    'Danh Sách Năng Lực Rubric Tương Ứng',
    'Trạng Thái Quyền Sửa (Thời hạn 2 tuần)',
    'Điểm Số (Thang 10)',
    'Nhận Xét Của Giáo Viên',
    'Ngày Đăng Ký',
    'Thời Hạn Khóa 2 Tuần'
  ];

  const rows = teamsInClass.map((t, idx) => {
    const topic = getTopicById(t.topicId);
    const m1 = t.members[0] || { name: '', email: '' };
    const m2 = t.members[1] || { name: '', email: '' };
    
    // Derived selected MTBs
    const selectedMTBs = ALL_MTB_ITEMS.filter(m => t.folder.selectedMTBIds.includes(m.id));
    const mtbString = selectedMTBs.map(m => m.id).join('; ');
    const uniqueComps = Array.from(new Set(selectedMTBs.flatMap(m => m.competencies)));
    const compString = uniqueComps.join('; ');

    const lockStatus = checkLockStatus(t.createdAt, t.folder.isLocked);
    const statusText = lockStatus.isLocked ? 'ĐÃ KHÓA (Chỉ đọc - GV sở hữu)' : `ĐANG MỞ (Còn ${lockStatus.daysRemaining} ngày)`;

    const score = t.folder.teacherAssessment?.score !== undefined 
      ? t.folder.teacherAssessment.score.toString() 
      : 'Chưa chấm';
    const comment = t.folder.teacherAssessment?.comment 
      ? `"${t.folder.teacherAssessment.comment.replace(/"/g, '""')}"` 
      : '""';

    return [
      idx + 1,
      t.className,
      `"${t.teamName.replace(/"/g, '""')}"`,
      t.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân',
      `"${topic?.shortName || t.topicId}"`,
      `"${m1.name}"`,
      m1.email || 'Chưa cập nhật',
      `"${m2.name || ''}"`,
      m2.email || '',
      t.folder.driveFolderUrl,
      `"${mtbString}"`,
      `"${compString.replace(/"/g, '""')}"`,
      `"${statusText}"`,
      score,
      comment,
      new Date(t.createdAt).toLocaleDateString('vi-VN'),
      new Date(t.folder.lockDate).toLocaleDateString('vi-VN')
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Google_Sheet_K9_Lop_${className}_Quan_Ly_Du_An_AI_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
