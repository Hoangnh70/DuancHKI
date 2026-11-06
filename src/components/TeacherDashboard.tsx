import React, { useState, useMemo } from 'react';
import { Team, TopicId } from '../types';
import { AVAILABLE_CLASSES, PROJECT_TOPICS, ALL_MTB_ITEMS, getTopicById } from '../data/curriculum';
import { exportTeamsToCSV, deleteTeam, saveTeam } from '../services/storage';
import { 
  Users, 
  Search, 
  Download, 
  FolderOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  Trash2, 
  Plus, 
  BarChart3, 
  FileSpreadsheet, 
  ExternalLink,
  Edit,
  Filter,
  Check,
  ShieldCheck,
  Folder,
  Lock,
  Unlock,
  X
} from 'lucide-react';

import { AuthUser, TEACHER_EMAIL } from '../types';
import { 
  MASTER_FOLDER_NAME, 
  MASTER_FOLDER_URL, 
  generateClassGoogleSheetUrl, 
  checkLockStatus, 
  exportClassGoogleSheetCSV 
} from '../services/googleDriveWorkspace';
import { toggleTeamLock } from '../services/storage';

interface TeacherDashboardProps {
  teams: Team[];
  currentUser: AuthUser | null;
  onOpenLoginModal: () => void;
  onOpenTeamFolder: (team: Team) => void;
  onOpenRegisterModal: () => void;
  onRefreshTeams: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teams,
  currentUser,
  onOpenLoginModal,
  onOpenTeamFolder,
  onOpenRegisterModal,
  onRefreshTeams
}) => {
  const isTeacher = currentUser?.email.toLowerCase() === TEACHER_EMAIL.toLowerCase();

  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Grading Modal State
  const [gradingTeam, setGradingTeam] = useState<Team | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(9.0);
  const [gradeComment, setGradeComment] = useState<string>('');
  const [teacherName, setTeacherName] = useState<string>(
    currentUser?.email ? `${currentUser.name} (${currentUser.email})` : `Thầy Hoàng (${TEACHER_EMAIL})`
  );

  // Filtered teams
  const filteredTeams = useMemo(() => {
    return teams.filter(t => {
      const matchClass = selectedClass === 'all' || t.className === selectedClass;
      const matchTopic = selectedTopic === 'all' || t.topicId === selectedTopic;
      const matchStatus = selectedStatus === 'all' || t.folder.status === selectedStatus;
      
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !q ||
        t.teamName.toLowerCase().includes(q) ||
        t.teamCode.toLowerCase().includes(q) ||
        t.members.some(m => m.name.toLowerCase().includes(q) || m.studentId.toLowerCase().includes(q));

      return matchClass && matchTopic && matchStatus && matchQuery;
    });
  }, [teams, selectedClass, selectedTopic, selectedStatus, searchQuery]);

  // Statistics
  const totalStudents = useMemo(() => {
    return teams.reduce((acc, t) => acc + t.members.length, 0);
  }, [teams]);

  const submittedCount = useMemo(() => {
    return teams.filter(t => t.folder.status === 'submitted' || t.folder.status === 'graded').length;
  }, [teams]);

  const gradedCount = useMemo(() => {
    return teams.filter(t => t.folder.status === 'graded' || t.folder.teacherAssessment !== undefined).length;
  }, [teams]);

  const averageScore = useMemo(() => {
    const graded = teams.filter(t => t.folder.teacherAssessment?.score !== undefined);
    if (graded.length === 0) return 0;
    const sum = graded.reduce((acc, t) => acc + (t.folder.teacherAssessment?.score || 0), 0);
    return (sum / graded.length).toFixed(1);
  }, [teams]);

  // Handle open grading modal
  const handleOpenGradeModal = (team: Team) => {
    setGradingTeam(team);
    setGradeScore(team.folder.teacherAssessment?.score ?? 9.0);
    setGradeComment(team.folder.teacherAssessment?.comment ?? 'Nhóm triển khai tốt các mục tiêu bài, giải pháp có tính sáng tạo và tài liệu đầy đủ.');
    setTeacherName(team.folder.teacherAssessment?.teacherName ?? 'Thầy Hoàng (Tổ Tin học - AI)');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingTeam) return;

    const updatedTeam: Team = {
      ...gradingTeam,
      folder: {
        ...gradingTeam.folder,
        status: 'graded',
        teacherAssessment: {
          score: Number(gradeScore),
          criteriaScores: gradingTeam.folder.teacherAssessment?.criteriaScores || {},
          comment: gradeComment.trim(),
          gradedAt: new Date().toISOString(),
          teacherName: teacherName.trim()
        }
      }
    };

    saveTeam(updatedTeam);
    onRefreshTeams();
    setGradingTeam(null);
  };

  const handleDeleteTeam = (team: Team) => {
    if (confirm(`Bạn có chắc chắn muốn xóa nhóm "${team.teamName}" (Lớp ${team.className})?`)) {
      deleteTeam(team.id);
      onRefreshTeams();
    }
  };

  if (!isTeacher) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-md text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              Khu vực Dành riêng cho Giáo viên
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Theo quy định phân quyền, chỉ duy nhất địa chỉ email Google{' '}
              <strong className="text-amber-900 font-mono">{TEACHER_EMAIL}</strong>{' '}
              mới có quyền truy cập bảng quản lý danh sách các nhóm, chấm điểm và xuất báo cáo.
            </p>
            {currentUser && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                Tài khoản Google hiện tại: <strong className="text-slate-900">{currentUser.email}</strong> (Vai trò: Học sinh)
              </div>
            )}
          </div>
          <div className="pt-2">
            <button
              onClick={onOpenLoginModal}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Đăng nhập với {TEACHER_EMAIL}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Cổng Quản lý Dành cho Giáo viên</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quản lý Danh sách Nhóm & Đánh giá Dự án
            </h1>
            <p className="text-sm text-slate-600">
              Theo dõi tiến độ, xem trực tiếp folder tài liệu của từng nhóm, chấm điểm ma trận MTB và xuất bảng điểm chuẩn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Master Google Drive Folder */}
            <a
              href={MASTER_FOLDER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] rounded-xl shadow-xs transition-colors"
            >
              <Folder className="w-4 h-4" />
              <span>Thư mục Tổng Khối 9 (Google Drive)</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>

            {/* Class Google Sheet Export */}
            <button
              onClick={() => {
                if (selectedClass === 'all') {
                  exportTeamsToCSV();
                } else {
                  const teamsInClass = teams.filter(t => t.className === selectedClass);
                  exportClassGoogleSheetCSV(selectedClass, teamsInClass);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-xl shadow-xs transition-colors"
              title="Xuất file Google Sheet chứa link folder và rubric các nhóm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>
                {selectedClass === 'all' ? 'Xuất Google Sheet Toàn Khối' : `Xuất Sheet Lớp ${selectedClass}`}
              </span>
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Nhóm</span>
            </button>
          </div>
        </div>

        {/* 4 Stats KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">Tổng số nhóm</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{teams.length}</div>
            <span className="text-[11px] text-slate-500">{totalStudents} học sinh tham gia</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">Tiến độ nộp bài</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{submittedCount} / {teams.length}</div>
            <span className="text-[11px] text-slate-500">
              {teams.length ? Math.round((submittedCount / teams.length) * 100) : 0}% đã hoàn thành
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">Đã chấm điểm</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{gradedCount} nhóm</div>
            <span className="text-[11px] text-slate-500">Còn lại {teams.length - gradedCount} nhóm</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">Điểm trung bình</span>
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{averageScore} / 10</div>
            <span className="text-[11px] text-slate-500">Dựa trên các nhóm đã chấm</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Class Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Lọc theo Lớp
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Tất cả các lớp ({teams.length})</option>
              {AVAILABLE_CLASSES.map(cls => (
                <option key={cls} value={cls}>Lớp {cls}</option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Lọc theo Chủ đề
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Tất cả 3 chủ đề</option>
              {PROJECT_TOPICS.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.shortName}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Trạng thái
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Đang soạn thảo</option>
              <option value="in_progress">Đang làm việc</option>
              <option value="submitted">Đã nộp bài</option>
              <option value="graded">Đã chấm điểm</option>
            </select>
          </div>

          {/* Search box */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Tìm kiếm
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tên nhóm, mã HS, học sinh..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredTeams.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Không tìm thấy nhóm nào phù hợp</p>
            <p className="text-xs text-slate-500">Thử thay đổi bộ lọc hoặc thêm nhóm mới</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3.5 px-4 w-28">Mã Nhóm</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Tên Nhóm & Lớp</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Thành viên & Email</th>
                  <th className="py-3.5 px-4 min-w-[160px]">Chủ đề Dự án</th>
                  <th className="py-3.5 px-3 text-center min-w-[130px]">Folder Drive</th>
                  <th className="py-3.5 px-3 text-center min-w-[140px]">Quyền Sửa (2 tuần)</th>
                  <th className="py-3.5 px-3 text-center w-20">Điểm</th>
                  <th className="py-3.5 px-4 text-right min-w-[140px]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeams.map((team) => {
                  const topic = getTopicById(team.topicId);
                  const isGraded = team.folder.status === 'graded';
                  const isSubmitted = team.folder.status === 'submitted';
                  const lockStatus = checkLockStatus(team.createdAt, team.folder.isLocked);

                  return (
                    <tr key={team.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {team.teamCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {team.teamName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-blue-700">Lớp {team.className}</span>
                          <span>·</span>
                          <span>{team.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          {team.members.map((m, idx) => (
                            <div key={idx} className="text-slate-800 text-xs">
                              <span className="font-semibold text-slate-900">{m.name}</span>
                              <span className="text-[10px] text-slate-500 block font-mono truncate max-w-[170px]">
                                {m.email || m.studentId}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span 
                          className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded border"
                          style={{
                            color: topic?.colorScheme.text,
                            backgroundColor: topic?.colorScheme.light,
                            borderColor: topic?.colorScheme.border
                          }}
                        >
                          {topic?.shortName || team.topicId}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <a
                          href={team.folder.driveFolderUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                          title="Mở thư mục Google Drive của nhóm"
                        >
                          <Folder className="w-3.5 h-3.5 text-blue-600" />
                          <span>Mở Drive</span>
                          <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                        </a>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {lockStatus.isLocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              <Lock className="w-3 h-3" />
                              <span>Đã khóa</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Unlock className="w-3 h-3" />
                              <span>Còn {lockStatus.daysRemaining} ngày</span>
                            </span>
                          )}
                          <button
                            onClick={() => {
                              toggleTeamLock(team.id);
                              onRefreshTeams();
                            }}
                            className="text-[10px] text-slate-500 hover:text-slate-800 underline transition-colors"
                          >
                            {lockStatus.isLocked ? 'Mở lại quyền' : 'Khóa sớm'}
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-extrabold text-sm">
                        {team.folder.teacherAssessment?.score !== undefined ? (
                          <span className="text-blue-700">{team.folder.teacherAssessment.score}</span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenTeamFolder(team)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
                            title="Mở Thư mục làm việc của Nhóm"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenGradeModal(team)}
                            className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg border border-amber-200 transition-colors"
                            title="Chấm điểm & Nhận xét"
                          >
                            <Award className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(team)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa nhóm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {gradingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-white" />
                <div>
                  <h3 className="font-bold text-sm">Chấm điểm & Nhận xét Dự án</h3>
                  <p className="text-[11px] text-amber-100">
                    Nhóm: {gradingTeam.teamName} - Lớp {gradingTeam.className}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setGradingTeam(null)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Điểm số cuối kỳ (Thang 10) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="10"
                    required
                    value={gradeScore}
                    onChange={(e) => setGradeScore(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giáo viên chấm
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhận xét chuyên môn & Góp ý cho nhóm <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={gradeComment}
                  onChange={(e) => setGradeComment(e.target.value)}
                  placeholder="Ghi nhận xét về User Story, kỹ thuật Prompt Chain, tính liêm chính và slide thuyết trình..."
                  className="w-full p-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Summary of what team has in folder */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Tóm tắt hồ sơ nhóm:</span>
                <div className="text-slate-600 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span>• {gradingTeam.folder.selectedMTBIds.length} MTB đã tick</span>
                  <span>• {gradingTeam.folder.userStories.length} User Stories</span>
                  <span>• {gradingTeam.folder.promptChain.length} Bước Prompt</span>
                  <span>• {gradingTeam.folder.files.length} Tệp nộp</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGradingTeam(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
                >
                  Lưu Điểm & Hoàn tất
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
