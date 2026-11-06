import React, { useState } from 'react';
import { Team, TopicId } from '../types';
import { PROJECT_TOPICS, getTopicById } from '../data/curriculum';
import { 
  FolderPlus, 
  KeyRound, 
  Users, 
  ArrowRight, 
  Bot, 
  HeartPulse, 
  Leaf, 
  Search, 
  FolderOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award,
  BookOpen
} from 'lucide-react';

import { AuthUser } from '../types';
import { AVAILABLE_CLASSES } from '../data/curriculum';

interface StudentHomeViewProps {
  teams: Team[];
  currentUser: AuthUser | null;
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
  onOpenTeamFolder: (team: Team) => void;
  onNavigateToGuides: (topicId?: TopicId) => void;
  onNavigateToRubric: () => void;
}

export const StudentHomeView: React.FC<StudentHomeViewProps> = ({
  teams,
  currentUser,
  onOpenLoginModal,
  onOpenRegisterModal,
  onOpenTeamFolder,
  onNavigateToGuides,
  onNavigateToRubric
}) => {
  const [accessCodeInput, setAccessCodeInput] = useState<string>('');
  const [accessError, setAccessError] = useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  const handleAccessByCode = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError('');
    const code = accessCodeInput.trim().toUpperCase();
    if (!code) {
      setAccessError('Vui lòng nhập mã nhóm');
      return;
    }
    const found = teams.find(t => t.teamCode.toUpperCase() === code);
    if (found) {
      onOpenTeamFolder(found);
    } else {
      setAccessError(`Không tìm thấy nhóm với mã "${code}". Vui lòng kiểm tra lại.`);
    }
  };

  const filteredTeams = teams.filter(t => {
    if (selectedClassFilter === 'all') return true;
    return t.className === selectedClassFilter;
  });

  const availableClassesInList = Array.from(new Set(teams.map(t => t.className))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kỳ thi Đánh giá Năng lực Cuối kỳ I · Môn AI Khối 9</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Cổng Dự Án & Không Gian Làm Việc Trực Tuyến
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Học sinh đăng ký theo <strong>Cá nhân</strong> hoặc <strong>Nhóm đôi</strong>. 
            Mỗi nhóm sau khi đăng ký sẽ được <strong>tự động tạo một Thư mục làm việc (Folder)</strong> để cùng nhau xây dựng User Story, thiết kế Prompt Chain, phân tích đạo đức AI và nộp sản phẩm trực tiếp.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Đăng ký Nhóm mới ngay</span>
            </button>

            <button
              onClick={() => onNavigateToGuides()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold backdrop-blur-xs border border-white/15 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem hướng dẫn 3 Chủ đề</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Access Code Box */}
        <div className="mt-8 pt-8 border-t border-white/10 max-w-xl">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Đã có nhóm? Nhập mã nhóm để mở thẳng Thư mục làm việc:
          </span>
          <form onSubmit={handleAccessByCode} className="flex gap-2">
            <div className="relative flex-1">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={accessCodeInput}
                onChange={(e) => setAccessCodeInput(e.target.value)}
                placeholder="VD: K9-9A101 hoặc K9-9A1-7X9B"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-white/20 transition-all shrink-0"
            >
              Mở Thư mục
            </button>
          </form>
          {accessError && (
            <p className="text-xs text-rose-300 mt-2 font-medium">{accessError}</p>
          )}
        </div>
      </div>

      {/* 4 Steps Workflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
            01
          </div>
          <h4 className="text-xs font-bold text-slate-900">Đăng ký & Chọn đề tài</h4>
          <p className="text-[11px] text-slate-600">
            Chọn làm cá nhân hoặc nhóm đôi, nhập lớp và chọn 1 trong 3 chủ đề dự án K9.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">
            02
          </div>
          <h4 className="text-xs font-bold text-slate-900">Auto Cấp Thư mục</h4>
          <p className="text-[11px] text-slate-600">
            Hệ thống tự động tạo Folder riêng và ma trận 21 Mục tiêu bài (MTB) được gán sẵn.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            03
          </div>
          <h4 className="text-xs font-bold text-slate-900">Làm việc trực tiếp trên web</h4>
          <p className="text-[11px] text-slate-600">
            Điền User Stories, chuỗi Prompt Chain, phân tích đạo đức và tương tác với AI Mentor.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
            04
          </div>
          <h4 className="text-xs font-bold text-slate-900">Nộp bài & Nhận điểm</h4>
          <p className="text-[11px] text-slate-600">
            Đính kèm link Slide Canva/Drive, nhấn nộp bài để giáo viên chấm trực tiếp trên hệ thống.
          </p>
        </div>
      </div>

      {/* 3 Project Topics Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              3 Chủ đề Dự án Cuối kỳ I (Khối 9)
            </h2>
            <p className="text-xs text-slate-500">
              Mỗi nhóm chọn 1 chủ đề phù hợp với sở thích và thế mạnh của mình
            </p>
          </div>
          <button
            onClick={() => onNavigateToGuides()}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Xem chi tiết 5 giai đoạn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECT_TOPICS.map((topic) => {
            const IconComponent = topic.id === 'topic-1' ? Bot : topic.id === 'topic-2' ? HeartPulse : Leaf;
            return (
              <div
                key={topic.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: topic.colorScheme.primary }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {topic.recommendedMTBIds.length} MTB
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.description}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-700 block">Công nghệ chính:</span>
                    <p className="truncate text-blue-700 font-medium">
                      {topic.aiTechnologies.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateToGuides(topic.id)}
                    className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1"
                  >
                    <span>Hướng dẫn chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenRegisterModal}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Groups & Class Filter */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Danh sách Thư mục Nhóm Đang Thực Hiện
            </h2>
            <p className="text-xs text-slate-500">
              Bấm vào tên nhóm hoặc nút "Mở Thư mục" để truy cập không gian làm việc của nhóm
            </p>
          </div>

          {/* Filter controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Lọc theo Lớp:</span>
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            >
              <option value="all">Tất cả 21 Lớp (9A1 – 9A22)</option>
              {AVAILABLE_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  Lớp {cls} {teams.filter(t => t.className === cls).length > 0 ? `(${teams.filter(t => t.className === cls).length} nhóm)` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map((team) => {
            const topic = getTopicById(team.topicId);
            const isGraded = team.folder.status === 'graded';
            const isSubmitted = team.folder.status === 'submitted';

            return (
              <div
                key={team.id}
                onClick={() => onOpenTeamFolder(team)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {team.teamCode}
                    </span>
                    {isGraded ? (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {team.folder.teacherAssessment?.score}/10 điểm
                      </span>
                    ) : isSubmitted ? (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Đã nộp bài
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        Đang làm việc
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {team.teamName}
                    </h4>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-blue-700">Lớp {team.className}</span>
                      <span>·</span>
                      <span>{team.projectType === 'pair' ? 'Nhóm đôi' : 'Cá nhân'}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700">
                    <span 
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: topic?.colorScheme.light,
                        color: topic?.colorScheme.text
                      }}
                    >
                      {topic?.shortName}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="truncate">
                      <strong>Thành viên:</strong> {team.members.map(m => m.name).join(', ')}
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Thư mục: {team.folder.folderName}
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                  <span className="flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4" />
                    <span>Mở Thư mục Làm việc</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
