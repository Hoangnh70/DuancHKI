import React, { useState, useEffect } from 'react';
import { ProjectType, TopicId, Team, AuthUser, TEACHER_EMAIL } from '../types';
import { AVAILABLE_CLASSES, PROJECT_TOPICS } from '../data/curriculum';
import { createNewTeam } from '../services/storage';
import { MASTER_FOLDER_NAME, MASTER_FOLDER_URL } from '../services/googleDriveWorkspace';
import confetti from 'canvas-confetti';
import { 
  X, 
  Users, 
  User, 
  FolderPlus, 
  CheckCircle2, 
  Bot, 
  HeartPulse, 
  Leaf,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  Folder
} from 'lucide-react';

interface StudentRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated: (team: Team) => void;
  currentUser?: AuthUser | null;
}

export const StudentRegisterModal: React.FC<StudentRegisterModalProps> = ({
  isOpen,
  onClose,
  onTeamCreated,
  currentUser
}) => {
  const [projectType, setProjectType] = useState<ProjectType>('pair');
  const [className, setClassName] = useState<string>('9A1');
  const [teamName, setTeamName] = useState<string>('');
  const [topicId, setTopicId] = useState<TopicId>('topic-1');
  
  // Member 1
  const [member1Name, setMember1Name] = useState<string>(currentUser?.name || '');
  const [member1Email, setMember1Email] = useState<string>(currentUser?.email || '');
  const [member1Id, setMember1Id] = useState<string>('');

  // Member 2
  const [member2Name, setMember2Name] = useState<string>('');
  const [member2Email, setMember2Email] = useState<string>('');
  const [member2Id, setMember2Id] = useState<string>('');

  const [error, setError] = useState<string>('');

  // 3-second auto-redirect state after registration
  const [createdTeam, setCreatedTeam] = useState<Team | null>(null);
  const [countdown, setCountdown] = useState<number>(3);

  // Auto-fill member 1 from logged in Google account
  useEffect(() => {
    if (currentUser?.email) {
      if (!member1Email) setMember1Email(currentUser.email);
      if (!member1Name && currentUser.name) setMember1Name(currentUser.name);
    }
  }, [currentUser]);

  // Handle 3s countdown redirect
  useEffect(() => {
    if (!createdTeam) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown reached 0 -> auto open team workspace!
      onTeamCreated(createdTeam);
      onClose();
    }
  }, [createdTeam, countdown, onTeamCreated, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!teamName.trim()) {
      setError('Vui lòng nhập tên nhóm hoặc tên dự án');
      return;
    }

    if (!member1Name.trim() || !member1Email.trim()) {
      setError('Vui lòng nhập đầy đủ Họ tên và Email Google của học sinh 1');
      return;
    }

    if (projectType === 'pair' && (!member2Name.trim() || !member2Email.trim())) {
      setError('Bạn đã chọn Nhóm đôi, vui lòng nhập đầy đủ Họ tên và Email Google của học sinh 2');
      return;
    }

    const members = [
      {
        name: member1Name.trim(),
        email: member1Email.trim().toLowerCase(),
        studentId: member1Id.trim() || `HS9-${Math.floor(1000 + Math.random() * 9000)}`,
        role: 'Trưởng nhóm / Kỹ thuật'
      }
    ];

    if (projectType === 'pair') {
      members.push({
        name: member2Name.trim(),
        email: member2Email.trim().toLowerCase(),
        studentId: member2Id.trim() || `HS9-${Math.floor(1000 + Math.random() * 9000)}`,
        role: 'Thành viên / Phân tích nội dung'
      });
    }

    const newTeam = createNewTeam({
      teamName: teamName.trim(),
      className,
      projectType,
      topicId,
      members
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // Trigger the 3-second countdown screen
    setCreatedTeam(newTeam);
    setCountdown(3);
  };

  const handleImmediateNavigate = () => {
    if (createdTeam) {
      onTeamCreated(createdTeam);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <FolderPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Đăng ký Nhóm Dự án AI - Khối 9</h2>
              <p className="text-xs text-blue-100">
                Tự động tạo Folder trong Thư mục Tổng (sở hữu bởi {TEACHER_EMAIL})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Second Countdown Screen after Registration */}
        {createdTeam ? (
          <div className="p-8 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <div className="text-3xl font-extrabold text-blue-600">
                {countdown}s
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-slate-900">
                Đăng ký Thành Công & Đã Tạo Folder!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hệ thống đã tự động tạo Thư mục Google Drive riêng cho nhóm <strong>{createdTeam.teamName}</strong> (Lớp <strong>{createdTeam.className}</strong>) nằm trong Thư mục Tổng Khối 9 thuộc sở hữu của Thầy Hoàng.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-blue-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Quyền sở hữu Thư mục:
                </span>
                <span className="font-mono text-[11px] text-slate-700 bg-white px-2 py-0.5 rounded border">
                  {createdTeam.folder.ownerEmail}
                </span>
              </div>
              <div className="text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span>Thời hạn học sinh được chỉnh sửa:</span>
                <span className="font-bold text-amber-700">14 ngày (2 tuần)</span>
              </div>
              <div className="text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span>Đã ghi danh vào Google Sheet Lớp:</span>
                <span className="font-semibold text-emerald-700">Lớp {createdTeam.className}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={createdTeam.folder.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Folder className="w-4 h-4" />
                <span>Mở Folder Drive (Thư mục Tổng)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <button
                onClick={handleImmediateNavigate}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Vào Không Gian Làm Việc ({countdown}s)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form Body */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Ownership & 2-Week Policy Banner */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-blue-900 leading-relaxed">
                <p className="font-bold">
                  Quy định Thư mục Google Drive & Thời hạn 2 tuần:
                </p>
                <p className="text-[11px] text-blue-800">
                  Folder của nhóm sẽ được tạo tự động bên trong Thư mục Tổng (Khối 9) thuộc quyền sở hữu của Giáo viên (<strong>{TEACHER_EMAIL}</strong>). Học sinh có quyền biên tập trong vòng <strong>2 tuần (14 ngày)</strong>. Sau 2 tuần, thư mục sẽ tự động khóa và chỉ có giáo viên mới chỉnh sửa/chấm điểm được.
                </p>
              </div>
            </div>

            {/* Form Factor & Class Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Hình thức thực hiện
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProjectType('individual')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      projectType === 'individual'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Cá nhân</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType('pair')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      projectType === 'pair'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Nhóm đôi (2 bạn)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Chọn Lớp (21 Lớp từ 9A1 - 9A22)
                </label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {AVAILABLE_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      Lớp {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Team Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tên Nhóm / Tên Dự Án <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="VD: SmartTutor K9, MindCare 9A1, GreenLeaf AI..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Project Topic Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Chọn 1 trong 3 Chủ đề Dự án Cuối kỳ I <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROJECT_TOPICS.map((topic) => {
                  const isSelected = topicId === topic.id;
                  const IconComponent = topic.id === 'topic-1' ? Bot : topic.id === 'topic-2' ? HeartPulse : Leaf;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => setTopicId(topic.id)}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div 
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: topic.colorScheme.primary }}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {topic.shortName}
                        </h4>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-500">
                        {topic.recommendedMTBIds.length} mục tiêu bài
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Members Section with Name & Email */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Thông tin Thành viên & Email Google
              </h4>

              {/* Member 1 */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Học sinh 1 {projectType === 'pair' ? '(Trưởng nhóm)' : ''}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                      Họ và tên học sinh 1 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={member1Name}
                      onChange={(e) => setMember1Name(e.target.value)}
                      placeholder="VD: Nguyễn Minh Anh"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                      Email Google học sinh 1 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={member1Email}
                      onChange={(e) => setMember1Email(e.target.value)}
                      placeholder="VD: minhanh.nguyen@vinschool.edu.vn"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Member 2 (if pair) */}
              {projectType === 'pair' && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    Học sinh 2 (Thành viên đôi)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                        Họ và tên học sinh 2 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={member2Name}
                        onChange={(e) => setMember2Name(e.target.value)}
                        placeholder="VD: Trần Gia Bảo"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                        Email Google học sinh 2 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={member2Email}
                        onChange={(e) => setMember2Email(e.target.value)}
                        placeholder="VD: giabao.tran@vinschool.edu.vn"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Sau khi bấm, tự động hiện link làm việc sau 3s
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Đăng ký & Tự động tạo Folder Drive</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
