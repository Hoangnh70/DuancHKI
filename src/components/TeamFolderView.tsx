import React, { useState } from 'react';
import { Team, DeliverableFile, AuthUser, TEACHER_EMAIL } from '../types';
import { ALL_MTB_ITEMS, getTopicById } from '../data/curriculum';
import { saveTeam, toggleTeamLock } from '../services/storage';
import { checkLockStatus, MASTER_FOLDER_URL } from '../services/googleDriveWorkspace';
import confetti from 'canvas-confetti';
import { 
  Folder, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft,
  Lock,
  Unlock,
  FileSpreadsheet,
  Check,
  Sparkles,
  ArrowRight,
  Video,
  Presentation,
  Link as LinkIcon,
  Send,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ListOrdered
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
  // Step navigation: 1 = Chọn MTB, 2 = Google Drive, 3 = Nộp bài
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedMTBId, setExpandedMTBId] = useState<string | null>(null);

  // Local state for team folder
  const [folderState, setFolderState] = useState(team.folder);

  // Quick deliverable links state (Slide, Video, Other)
  const initialSlide = folderState.files.find(f => f.type === 'slide')?.url || '';
  const initialVideo = folderState.files.find(f => f.type === 'video')?.url || '';
  const initialOther = folderState.files.find(f => f.type !== 'slide' && f.type !== 'video')?.url || '';

  const [slideUrl, setSlideUrl] = useState<string>(initialSlide);
  const [videoUrl, setVideoUrl] = useState<string>(initialVideo);
  const [otherUrl, setOtherUrl] = useState<string>(initialOther);

  const topic = getTopicById(team.topicId);
  const isTeacher = currentUser?.role === 'teacher';
  const lockStatus = checkLockStatus(team.createdAt, folderState.isLocked);
  const isReadOnly = lockStatus.isLocked && !isTeacher;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save changes to storage
  const handleSave = (updatedFolder = folderState, notify = false) => {
    if (isReadOnly) {
      showToast('Thư mục đã hết hạn 2 tuần và bị khóa chỉnh sửa đối với học sinh.');
      return;
    }
    const updatedTeam: Team = {
      ...team,
      folder: updatedFolder
    };
    saveTeam(updatedTeam);
    onUpdateTeam(updatedTeam);
    if (notify) {
      showToast('Đã lưu thay đổi thành công!');
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

  // Toggle selection of an MTB item
  const toggleMTB = (id: string) => {
    if (isReadOnly) {
      showToast('Thư mục đã bị khóa chỉnh sửa.');
      return;
    }
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

  // Quick select recommended 5 MTBs for the team's topic
  const handleQuickSelect5 = () => {
    if (isReadOnly) return;
    const recommended = topic?.recommendedMTBIds.slice(0, 5) || [
      'MTB 1.1.a',
      'MTB 1.1.b',
      'MTB 1.2.a',
      'MTB 1.3.a',
      'MTB 2.1.a'
    ];
    const updated = {
      ...folderState,
      selectedMTBIds: recommended
    };
    setFolderState(updated);
    handleSave(updated, true);
  };

  // Submit project to teacher
  const handleSubmitProject = () => {
    if (isReadOnly) {
      showToast('Thư mục đã bị khóa chỉnh sửa.');
      return;
    }
    if (folderState.selectedMTBIds.length < 5) {
      showToast(`Nhóm cần chọn tối thiểu 5 MTB (Hiện tại mới chọn ${folderState.selectedMTBIds.length}/5 MTB).`);
      setCurrentStep(1);
      return;
    }

    // Build files list from inputs
    const updatedFiles: DeliverableFile[] = [];
    if (slideUrl.trim()) {
      updatedFiles.push({
        id: 'f-slide',
        title: 'Slide Báo Cáo Dự Án',
        type: 'slide',
        url: slideUrl.trim(),
        description: 'Slide thuyết minh dự án',
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
    if (videoUrl.trim()) {
      updatedFiles.push({
        id: 'f-video',
        title: 'Video Thuyết Minh / Demo',
        type: 'video',
        url: videoUrl.trim(),
        description: 'Video giới thiệu và thử nghiệm sản phẩm',
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
    if (otherUrl.trim()) {
      updatedFiles.push({
        id: 'f-other',
        title: 'Mô hình / Sản phẩm / File Word',
        type: 'prototype',
        url: otherUrl.trim(),
        description: 'Tài liệu bổ trợ hoặc link sản phẩm',
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }

    const updated = {
      ...folderState,
      files: updatedFiles,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString()
    };
    setFolderState(updated);
    handleSave(updated, false);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast('🎉 Chúc mừng nhóm đã nộp bài thành công cho Thầy Hoàng!');
  };

  const selectedCount = folderState.selectedMTBIds.length;
  const isMTBEnough = selectedCount >= 5;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách nhóm</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Direct Drive Button */}
          <a
            href={folderState.driveFolderUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Mở Drive (Khối 9)</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>

          {/* Direct Class Sheet Button */}
          <a
            href={folderState.classGoogleSheetUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sheet Lớp {team.className}</span>
          </a>

          {/* Teacher Lock Toggle */}
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
              <span>{folderState.isLocked ? 'Mở lại sửa' : 'Khóa sớm'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Team Summary Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {team.teamName}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Lớp {team.className}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {team.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân'}
            </span>
            {folderState.status === 'submitted' ? (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3" /> Đã nộp bài
              </span>
            ) : (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Đang làm dự án
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Chủ đề: <strong className="text-blue-700">{topic?.title}</strong>
          </p>
          <p className="text-[11px] text-slate-500">
            Học sinh: <strong>{team.members.map(m => m.name).join(' · ')}</strong>
          </p>
        </div>

        {/* 2-Week Lock Countdown Banner */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 shrink-0 max-w-sm">
          <div className="flex items-center gap-1.5 font-bold">
            {lockStatus.isLocked ? (
              <span className="text-rose-700 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> ĐÃ KHÓA (CHỈ ĐỌC)
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> HỌC SINH ĐANG ĐƯỢC PHÉP SỬA
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            {lockStatus.message}
          </p>
        </div>
      </div>

      {/* Teacher Grade & Comments if evaluated */}
      {folderState.teacherAssessment && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Kết quả đánh giá từ Giáo viên ({folderState.teacherAssessment.teacherName})
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

      {/* 3 SEQUENTIAL STEPS NAVIGATION BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
        
        {/* Step 1 Button */}
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`p-3 rounded-xl text-left transition-all flex items-center gap-3 ${
            currentStep === 1
              ? 'bg-white shadow-xs border border-blue-200 text-blue-900 font-bold'
              : 'text-slate-600 hover:bg-white/60'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
            isMTBEnough ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-600 text-white'
          }`}>
            {isMTBEnough ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
          </div>
          <div className="leading-tight">
            <span className="text-xs font-bold block">Bước 1: Chọn MTB</span>
            <span className={`text-[10px] font-medium ${isMTBEnough ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isMTBEnough ? `Đạt ${selectedCount} MTB` : `Đã chọn: ${selectedCount}/5 MTB`}
            </span>
          </div>
        </button>

        {/* Step 2 Button */}
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className={`p-3 rounded-xl text-left transition-all flex items-center gap-3 ${
            currentStep === 2
              ? 'bg-white shadow-xs border border-blue-200 text-blue-900 font-bold'
              : 'text-slate-600 hover:bg-white/60'
          }`}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
            2
          </div>
          <div className="leading-tight">
            <span className="text-xs font-bold block">Bước 2: Google Drive</span>
            <span className="text-[10px] text-slate-500 font-medium">
              Tải tài liệu & minh chứng
            </span>
          </div>
        </button>

        {/* Step 3 Button */}
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className={`p-3 rounded-xl text-left transition-all flex items-center gap-3 ${
            currentStep === 3
              ? 'bg-white shadow-xs border border-blue-200 text-blue-900 font-bold'
              : 'text-slate-600 hover:bg-white/60'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
            folderState.status === 'submitted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-600 text-white'
          }`}>
            {folderState.status === 'submitted' ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
          </div>
          <div className="leading-tight">
            <span className="text-xs font-bold block">Bước 3: Nộp Bài</span>
            <span className="text-[10px] text-slate-500 font-medium">
              {folderState.status === 'submitted' ? 'Đã nộp bài cho GV' : 'Dán link slide & video'}
            </span>
          </div>
        </button>

      </div>

      {/* STEP 1: CHỌN MỤC TIÊU BÀI (MTB) - TỐI THIỂU 5 */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          {/* Header & Minimum 5 Requirement Banner */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                  <span>Chọn các Mục Tiêu Bài (MTB) để thực hiện</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Nhóm cần chọn <strong>tối thiểu 5 MTB</strong> phù hợp với chủ đề dự án <strong>"{topic?.shortName}"</strong>
                </p>
              </div>

              {/* Quick Select 5 Recommended Button */}
              <button
                type="button"
                onClick={handleQuickSelect5}
                disabled={isReadOnly}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Gợi ý 5 MTB cốt lõi</span>
              </button>
            </div>

            {/* Progress Bar & Status */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isMTBEnough 
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  {isMTBEnough ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                  {isMTBEnough
                    ? `Đã chọn đủ điều kiện: ${selectedCount} MTB (Tối thiểu yêu cầu 5 MTB)`
                    : `Cần chọn thêm ít nhất ${5 - selectedCount} MTB nữa (Hiện tại: ${selectedCount}/5)`}
                </span>
                <span>{Math.min(100, Math.round((selectedCount / 5) * 100))}%</span>
              </div>
              <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isMTBEnough ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (selectedCount / 5) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* List of 19 MTBs rendered as clean clickable cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Danh sách 19 Mục tiêu bài học (Tick chọn tối thiểu 5 MTB):
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Bấm vào thẻ để xem rõ 4 bước cần làm & tiêu chí Rubric
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ALL_MTB_ITEMS.map((mtb) => {
                const isSelected = folderState.selectedMTBIds.includes(mtb.id);
                const isRecommended = topic?.recommendedMTBIds.includes(mtb.id);
                const isExpanded = expandedMTBId === mtb.id;

                return (
                  <div
                    key={mtb.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-400 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 select-none">
                      {/* Big Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMTB(mtb.id);
                        }}
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-blue-200/70 text-blue-900' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {mtb.id}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded">
                            {mtb.criterionTitle}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {mtb.domainLabel}
                          </span>
                          {isRecommended && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                              Khuyên dùng cho đề tài
                            </span>
                          )}
                        </div>

                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>
                          {mtb.title}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {mtb.competencies.map((c, i) => (
                              <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                                {c}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedMTBId(isExpanded ? null : mtb.id);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-800 py-0.5 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors ml-auto"
                          >
                            <span>{isExpanded ? 'Thu gọn' : 'Xem 4 bước làm & Rubric Mức 4'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Step-by-Step & Rubric */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-3 pl-8 animate-in fade-in duration-150">
                        {/* 4 Steps */}
                        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                          <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <ListOrdered className="w-3.5 h-3.5 text-blue-700" />
                            <span>Quy trình 4 Bước thực hiện mục tiêu này:</span>
                          </div>
                          <div className="space-y-1.5">
                            {mtb.steps.map((st, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-800">
                                <span className="font-bold text-blue-700 shrink-0 bg-white px-1.5 py-0.2 rounded border border-blue-200 text-[10px]">
                                  Bước {sIdx + 1}
                                </span>
                                <span className="leading-relaxed">{st.replace(/^Bước \d+:\s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rubric Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                            <span className="text-[11px] font-bold text-emerald-900 block">
                              🌟 Mức 4 – Vượt (Điểm 9–10)
                            </span>
                            <p className="text-[11px] text-emerald-950 leading-relaxed">
                              {mtb.rubric.level4}
                            </p>
                          </div>
                          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <span className="text-[11px] font-bold text-slate-800 block">
                              ✅ Mức 3 – Đạt (Chuẩn điểm 7–8)
                            </span>
                            <p className="text-[11px] text-slate-700 leading-relaxed">
                              {mtb.rubric.level3}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action: Proceed to Step 2 */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {isMTBEnough ? '✅ Đã đủ số lượng MTB tối thiểu.' : '⚠️ Cần chọn thêm để đủ 5 MTB.'}
            </span>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Chuyển sang Bước 2: Google Drive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: GOOGLE DRIVE VÀ TẢI TÀI LIỆU */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Mở Thư Mục Google Drive & Tải Tài Liệu Lên</span>
            </h2>
            <p className="text-xs text-slate-500">
              Nhóm lưu trữ các file khảo sát, sơ đồ kiến trúc, slide và video vào thư mục Google Drive chung thuộc quyền sở hữu của Thầy Hoàng.
            </p>
          </div>

          {/* Detailed 4-Step Instructions for Google Drive */}
          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
              <ListOrdered className="w-4 h-4 text-blue-700" />
              <span>Quy trình 4 Bước thao tác trên Google Drive:</span>
            </div>
            <div className="space-y-2 text-xs text-slate-800">
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <span>Bấm nút <strong>"Mở Trực Tiếp Folder Google Drive"</strong> bên dưới để truy cập Thư mục Tổng Khối 9.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <span>Tìm và mở đúng thư mục lớp của nhóm: <strong className="text-blue-700 font-bold">[Khối 9] Lớp {team.className}</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <span>Tạo thư mục riêng cho nhóm với tên: <strong className="font-mono text-slate-900 font-bold">[{team.teamCode}] {team.teamName}</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">4</span>
                <span>Tạo 5 thư mục con bên dưới để tải lên các tài liệu khảo sát, chuỗi prompt, slide và video demo.</span>
              </div>
            </div>
          </div>

          {/* Main Direct Folder CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4285F4] text-white flex items-center justify-center mx-auto shadow-md">
              <Folder className="w-7 h-7" />
            </div>

            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900">
                Thư Mục Google Drive Lớp {team.className}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nằm bên trong <strong>Thư Mục Tổng Khối 9</strong> (Sở hữu bởi: <span className="font-mono text-slate-800">{folderState.ownerEmail}</span>).
              </p>
            </div>

            <div className="pt-2">
              <a
                href={folderState.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Folder className="w-4 h-4" />
                <span>Mở Trực Tiếp Folder Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>{lockStatus.message}</span>
            </div>
          </div>

          {/* 5 Subfolders checklist guidance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              5 Thư mục con tài liệu cần có trong Google Drive:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(folderState.subfolders || []).map((sub, i) => (
                <div key={sub.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 hover:border-blue-300 transition-colors">
                  <span className="font-mono text-xs font-bold text-slate-900 block">
                    📁 {sub.name}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors"
            >
              Quay lại Bước 1
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Chuyển sang Bước 3: Nộp Bài</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: DÁN LINK SẢN PHẨM & NỘP BÀI */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Dán Link Báo Cáo & Nộp Bài Cho Giáo Viên</span>
            </h2>
            <p className="text-xs text-slate-500">
              Dán các đường link sản phẩm hoàn thiện để Thầy Hoàng kiểm tra và đánh giá điểm theo ma trận MTB.
            </p>
          </div>

          {/* Detailed 4-Step Instructions for Submission */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <ListOrdered className="w-4 h-4 text-emerald-700" />
              <span>Quy trình 4 Bước Nộp Sản Phẩm:</span>
            </div>
            <div className="space-y-2 text-xs text-slate-800">
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <span>Lấy link Slide thuyết trình (Google Slides hoặc Canva), đảm bảo bật quyền xem <em>"Bất kỳ ai có đường liên kết đều có thể xem"</em>.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <span>Lấy link Video thuyết minh hoặc demo sản phẩm (tải lên YouTube ở chế độ Không công khai hoặc Google Drive).</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <span>Dán link tài liệu bổ trợ/mô hình/file Word (nếu có).</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">4</span>
                <span>Bấm nút <strong>"Nộp bài & Hoàn thành dự án"</strong>. Hệ thống sẽ kiểm tra tối thiểu 5 MTB và gửi bài đến giáo viên!</span>
              </div>
            </div>
          </div>

          {/* Condition verification check */}
          {!isMTBEnough && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-800">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Nhóm chưa chọn đủ 5 MTB ở Bước 1 (Hiện tại: {selectedCount}/5 MTB).</span>
              </span>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="font-bold underline text-rose-900 hover:text-rose-700"
              >
                Về Bước 1 chọn thêm
              </button>
            </div>
          )}

          {/* 3 Simple Link Inputs */}
          <div className="space-y-4">
            {/* Slide Link */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-2">
                <Presentation className="w-4 h-4 text-blue-600" />
                <span>Link Slide Báo Cáo (Canva / Google Slides / Drive):</span>
              </label>
              <input
                type="url"
                value={slideUrl}
                onChange={(e) => setSlideUrl(e.target.value)}
                disabled={isReadOnly}
                placeholder="https://canva.com/design/... hoặc https://docs.google.com/presentation/..."
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            {/* Video Demo Link */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-600" />
                <span>Link Video Thuyết Minh / Demo Sản Phẩm (YouTube / Drive):</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={isReadOnly}
                placeholder="https://youtube.com/watch?v=... hoặc https://drive.google.com/file/..."
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            {/* Other Link */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-emerald-600" />
                <span>Link Mô Hình / Chatbot Ứng Dụng / File Word (Tùy chọn):</span>
              </label>
              <input
                type="url"
                value={otherUrl}
                onChange={(e) => setOtherUrl(e.target.value)}
                disabled={isReadOnly}
                placeholder="https://... (Link website, Figma, Colab hoặc link tệp khác)"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Submission Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors"
            >
              Quay lại Bước 2
            </button>

            <button
              type="button"
              onClick={handleSubmitProject}
              disabled={isReadOnly || !isMTBEnough}
              className={`w-full sm:w-auto px-8 py-3 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                isMTBEnough && !isReadOnly
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-blue-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Nộp Bài Cho Giáo Viên</span>
            </button>
          </div>

        </div>
      )}

      {/* In-app Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};
