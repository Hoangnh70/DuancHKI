import React, { useState } from 'react';
import { Team, DeliverableFile, AuthUser, TEACHER_EMAIL } from '../types';
import { ALL_MTB_ITEMS, getTopicById } from '../data/curriculum';
import { saveTeam, toggleTeamLock } from '../services/storage';
import { checkLockStatus, MASTER_FOLDER_NAME, MASTER_FOLDER_URL } from '../services/googleDriveWorkspace';
import confetti from 'canvas-confetti';
import { 
  Folder, 
  Award, 
  FileText, 
  Send, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Clock, 
  Save, 
  Share2, 
  Copy, 
  Check, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ArrowLeft,
  Lock,
  Unlock,
  FileSpreadsheet
} from 'lucide-react';

interface TeamFolderViewProps {
  team: Team;
  currentUser?: AuthUser | null;
  onUpdateTeam: (updatedTeam: Team) => void;
  onBackToHome: () => void;
}

export const TeamFolderView: React.FC<TeamFolderViewProps> = ({
  team,
  currentUser,
  onUpdateTeam,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<'files' | 'rubric'>('files');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Local state for folder modifications
  const [folderState, setFolderState] = useState(team.folder);

  const topic = getTopicById(team.topicId);
  const isTeacher = currentUser?.role === 'teacher';
  const lockStatus = checkLockStatus(team.createdAt, folderState.isLocked);
  const isReadOnly = lockStatus.isLocked && !isTeacher;

  // Handle save changes
  const handleSave = (updatedFolder = folderState, notify = true) => {
    if (isReadOnly) {
      alert('Thư mục đã hết hạn 2 tuần và bị khóa chỉnh sửa đối với học sinh.');
      return;
    }
    const updatedTeam: Team = {
      ...team,
      folder: updatedFolder
    };
    saveTeam(updatedTeam);
    onUpdateTeam(updatedTeam);
    if (notify) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleToggleLock = () => {
    const nextLocked = !folderState.isLocked;
    const updated = {
      ...folderState,
      isLocked: nextLocked
    };
    setFolderState(updated);
    toggleTeamLock(team.id, nextLocked);
    handleSave(updated, true);
  };

  // Copy team code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(team.teamCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Submit project to teacher
  const handleSubmitProject = () => {
    if (isReadOnly) {
      alert('Thư mục đã bị khóa chỉnh sửa.');
      return;
    }
    if (folderState.selectedMTBIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 Mục tiêu bài (MTB) trước khi nộp bài.');
      return;
    }
    const updated = {
      ...folderState,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString()
    };
    setFolderState(updated);
    handleSave(updated, false);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
    alert('Chúc mừng nhóm đã nộp bài thành công! Thầy cô sẽ xem xét và chấm điểm trên hệ thống.');
  };

  // MTB toggle
  const toggleMTB = (id: string) => {
    const exists = folderState.selectedMTBIds.includes(id);
    const nextIds = exists 
      ? folderState.selectedMTBIds.filter(x => x !== id)
      : [...folderState.selectedMTBIds, id];
    
    const updated = {
      ...folderState,
      selectedMTBIds: nextIds
    };
    setFolderState(updated);
    handleSave(updated, false);
  };

  const updateMTBNote = (id: string, note: string) => {
    const updated = {
      ...folderState,
      mtbNotes: {
        ...folderState.mtbNotes,
        [id]: note
      }
    };
    setFolderState(updated);
  };



  // File link actions
  const addDeliverableFile = () => {
    const newFile: DeliverableFile = {
      id: `file-${Date.now()}`,
      title: 'Tài liệu / Slide thuyết trình mới',
      type: 'slide',
      url: '',
      description: '',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = {
      ...folderState,
      files: [...folderState.files, newFile]
    };
    setFolderState(updated);
    handleSave(updated, false);
  };

  const updateDeliverableFile = (id: string, field: keyof DeliverableFile, val: string) => {
    const updatedFiles = folderState.files.map(f => {
      if (f.id === id) {
        return { ...f, [field]: val, updatedAt: new Date().toISOString().split('T')[0] };
      }
      return f;
    });
    const updated = { ...folderState, files: updatedFiles };
    setFolderState(updated);
  };

  const removeDeliverableFile = (id: string) => {
    const updated = {
      ...folderState,
      files: folderState.files.filter(f => f.id !== id)
    };
    setFolderState(updated);
    handleSave(updated, false);
  };



  // Selected competencies calculation
  const selectedMTBs = ALL_MTB_ITEMS.filter(m => folderState.selectedMTBIds.includes(m.id));
  const uniqueCompetencies = Array.from(new Set(selectedMTBs.flatMap(m => m.competencies)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Bar: Back & Save Status */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về danh sách nhóm</span>
        </button>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Đã lưu thành công</span>
            </span>
          )}
          <button
            onClick={() => handleSave(folderState, true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu thay đổi</span>
          </button>
          {folderState.status !== 'submitted' && folderState.status !== 'graded' && (
            <button
              onClick={handleSubmitProject}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp bài cho Giáo viên</span>
            </button>
          )}
        </div>
      </div>

      {/* Google Drive Integration & 2-Week Lock Countdown Banner */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {lockStatus.isLocked ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  <Lock className="w-3.5 h-3.5" />
                  <span>ĐÃ KHÓA (CHỈ ĐỌC)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>HỌC SINH ĐANG ĐƯỢC PHÉP CHỈNH SỬA</span>
                </span>
              )}
              <span className="text-[11px] text-slate-500">
                Sở hữu bởi: <strong className="font-mono text-slate-700">{folderState.ownerEmail}</strong>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {lockStatus.message}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Direct Drive Button */}
            <a
              href={folderState.driveFolderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Mở Folder Drive</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>

            {/* Direct Sheet Button */}
            <a
              href={folderState.classGoogleSheetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sheet Lớp {team.className}</span>
              <ExternalLink className="w-3 h-3 text-emerald-600" />
            </a>

            {/* Teacher Toggle Lock Button */}
            {isTeacher && (
              <button
                onClick={handleToggleLock}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  folderState.isLocked
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                }`}
                title="Thay đổi quyền chỉnh sửa của học sinh"
              >
                {folderState.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{folderState.isLocked ? 'Mở lại quyền sửa' : 'Khóa sửa sớm'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Folder Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: topic?.colorScheme.primary || '#2563eb' }}
            >
              <Folder className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {team.teamName}
                </h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Lớp {team.className}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {team.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân'}
                </span>
                {folderState.status === 'graded' ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Đã chấm: {folderState.teacherAssessment?.score}/10
                  </span>
                ) : folderState.status === 'submitted' ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Đã nộp bài
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Đang thực hiện
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {topic?.title}
              </p>
              <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3 pt-0.5">
                <span>
                  <strong>Thành viên:</strong> {team.members.map(m => m.name).join(', ')}
                </span>
                <span>·</span>
                <span>
                  <strong>Thư mục:</strong> {folderState.folderName}
                </span>
              </div>
            </div>
          </div>

          {/* Access Code Box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Mã truy cập nhóm
              </span>
              <span className="font-mono text-sm font-bold text-slate-900 tracking-wider">
                {team.teamCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-white border border-slate-200 transition-colors"
              title="Sao chép mã"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Teacher Feedback Banner if graded */}
        {folderState.teacherAssessment && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Nhận xét từ Giáo viên ({folderState.teacherAssessment.teacherName})
              </span>
              <span className="text-sm font-extrabold text-amber-900">
                Điểm: {folderState.teacherAssessment.score} / 10
              </span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              "{folderState.teacherAssessment.comment}"
            </p>
          </div>
        )}
      </div>

      {/* 2 Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('files')}
          className={`py-3 px-5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'files'
              ? 'border-blue-600 text-blue-600 bg-white shadow-2xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Folder className="w-4 h-4 text-blue-600" />
          <span>Thư mục Drive & Tệp Nộp bài ({folderState.files.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`py-3 px-5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'rubric'
              ? 'border-blue-600 text-blue-600 bg-white shadow-2xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Phiếu Đăng ký MTB & Tiêu chí Đánh giá ({folderState.selectedMTBIds.length}/21)</span>
        </button>
      </div>

      {/* Tab 1: Rubric & MTB Checklist */}
      {activeTab === 'rubric' && (
        <div className="space-y-6">
          {/* Summary Box matching school document formula */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold">
                  Ma trận Tự Đánh giá Mục tiêu Bài & Năng lực
                </h3>
                <p className="text-xs text-blue-200">
                  Tick chọn các MTB mà nhóm đã thực hiện và ghi rõ minh chứng cụ thể
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-xl font-bold text-blue-300 block">
                    {folderState.selectedMTBIds.length}
                  </span>
                  <span className="text-slate-300">Mục tiêu bài</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <span className="text-xl font-bold text-emerald-300 block">
                    {uniqueCompetencies.length}
                  </span>
                  <span className="text-slate-300">Năng lực đạt</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-blue-300 block mb-1">
                  Mục tiêu bài (Sau khi đã tick sẽ hiển thị các MTB đã chọn):
                </span>
                <p className="text-slate-300 line-clamp-3">
                  {selectedMTBs.map(m => m.id).join(', ') || 'Chưa chọn mục tiêu nào'}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-emerald-300 block mb-1">
                  Năng lực (Sau khi đã tick sẽ hiển thị các năng lực đã chọn):
                </span>
                <p className="text-slate-300 line-clamp-3">
                  {uniqueCompetencies.join(', ') || 'Chưa tích lũy năng lực nào'}
                </p>
              </div>
            </div>
          </div>

          {/* List of all MTBs */}
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {ALL_MTB_ITEMS.map((item) => {
              const isChecked = folderState.selectedMTBIds.includes(item.id);
              const note = folderState.mtbNotes[item.id] || '';

              return (
                <div 
                  key={item.id}
                  className={`p-4 transition-colors ${isChecked ? 'bg-blue-50/25' : 'bg-white'}`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMTB(item.id)}
                      className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-xs text-blue-700">
                          {item.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.domainLabel}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                        {item.title}
                      </p>
                      
                      {/* Competencies */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {item.competencies.map((comp, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>

                      {/* Evidence note input if checked */}
                      {isChecked && (
                        <div className="pt-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Minh chứng nhóm đã thực hiện (Link file, trích đoạn hoặc mô tả):
                          </label>
                          <input
                            type="text"
                            value={note}
                            onChange={(e) => updateMTBNote(item.id, e.target.value)}
                            onBlur={() => handleSave(folderState, false)}
                            placeholder="VD: Đã làm trong Slide trang 4; Đã phỏng vấn 5 bạn học sinh..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Deliverables & Files */}
      {activeTab === 'files' && (
        <div className="space-y-6">
          
          {/* 5 Structured Subfolders inside Master Folder */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-600" />
                  <span>5 Thư Mục Con Tự Động Tạo Trong Thư Mục Tổng Khối 9</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Học sinh lưu trữ khảo sát, sơ đồ kiến trúc, prompt chain, báo cáo đạo đức, slide và video vào đúng các folder dưới đây
                </p>
              </div>
              <a
                href={folderState.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
              >
                <span>Mở Toàn Bộ Folder Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(folderState.subfolders || []).map((sub) => (
                <div key={sub.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-blue-300 transition-colors flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900 truncate">
                        📁 {sub.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                      {sub.allowedTypes}
                    </span>
                    <a
                      href={sub.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
                    >
                      <span>Mở</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary report text */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Tóm tắt Tổng quan Dự án (Executive Summary)
            </h3>
            <textarea
              rows={4}
              value={folderState.summaryReport}
              onChange={(e) => setFolderState({ ...folderState, summaryReport: e.target.value })}
              onBlur={() => handleSave()}
              placeholder="Giới thiệu ngắn gọn về ý tưởng, vấn đề giải quyết, đối tượng người dùng và kết quả đạt được..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submission links list */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Tài liệu & Đường link Sản phẩm Bàn giao
                </h3>
                <p className="text-xs text-slate-500">
                  Nộp link Slide Canva, Google Drive, Video YouTube, Figma hoặc mã nguồn để giáo viên chấm
                </p>
              </div>
              <button
                onClick={addDeliverableFile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Link Tệp</span>
              </button>
            </div>

            {folderState.files.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500">
                  Chưa có liên kết tệp nào. Bấm <strong>"Thêm Link Tệp"</strong> để đính kèm Slide thuyết trình và Video demo của nhóm!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {folderState.files.map((file) => (
                  <div key={file.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          Tiêu đề tệp / sản phẩm:
                        </label>
                        <input
                          type="text"
                          value={file.title}
                          onChange={(e) => updateDeliverableFile(file.id, 'title', e.target.value)}
                          placeholder="VD: Slide thuyết trình Canva"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          Định dạng:
                        </label>
                        <select
                          value={file.type}
                          onChange={(e) => updateDeliverableFile(file.id, 'type', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        >
                          <option value="slide">Slide thuyết trình</option>
                          <option value="video">Video demo sản phẩm</option>
                          <option value="prototype">Bản mẫu Prototype / UI</option>
                          <option value="doc">Tập dữ liệu / Báo cáo</option>
                          <option value="link">Link trang web / Chatbot</option>
                          <option value="code">Mã nguồn GitHub</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          Đường link (URL):
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="url"
                            value={file.url}
                            onChange={(e) => updateDeliverableFile(file.id, 'url', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                          />
                          {file.url && (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 shrink-0"
                              title="Mở link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <input
                        type="text"
                        value={file.description || ''}
                        onChange={(e) => updateDeliverableFile(file.id, 'description', e.target.value)}
                        placeholder="Mô tả tóm tắt nội dung tệp..."
                        className="w-3/4 px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded"
                      />
                      <button
                        onClick={() => removeDeliverableFile(file.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Work log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Nhật ký Tiến độ Thực hiện</span>
            </h3>
            <div className="space-y-2">
              {folderState.workLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.author}</span>
                      <span className="text-[10px] text-slate-400">· {log.date}</span>
                    </div>
                    <p className="text-slate-700">{log.content}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
                    {log.progressPercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
