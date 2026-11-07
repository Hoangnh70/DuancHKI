import React, { useState } from 'react';
import { AuthUser, TEACHER_EMAIL } from '../types';
import { loginWithGoogle, loginTeacherQuick, getCurrentUser, logout } from '../services/auth';
import { GoogleSignInButton } from './GoogleSignInButton';
import { MASTER_FOLDER_URL } from '../services/googleDriveWorkspace';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  AlertCircle,
  FolderLock,
  CheckCircle2,
  ExternalLink,
  UserCheck,
  ArrowRight
} from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
  const [emailInput, setEmailInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleTeacherLogin = () => {
    setError('');
    const user = loginTeacherQuick();
    setSuccessMessage(`Đã đăng nhập thành công với tài khoản Giáo viên (${TEACHER_EMAIL})!`);
    
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
      setSuccessMessage('');
    }, 450);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailInput.trim()) {
      setError('Vui lòng nhập email Google của bạn (Vinschool hoặc cá nhân).');
      return;
    }

    if (!emailInput.includes('@')) {
      setError('Email không hợp lệ. Ví dụ: hoang.nh@vinschool.edu.vn hoặc ten@gmail.com');
      return;
    }

    const cleanEmail = emailInput.trim().toLowerCase();
    const isTeacher = cleanEmail === TEACHER_EMAIL.toLowerCase();

    const user = loginWithGoogle(
      cleanEmail,
      nameInput.trim() || (isTeacher ? 'Thầy Hoàng (GV Tin học - AI)' : cleanEmail.split('@')[0])
    );

    setSuccessMessage(
      isTeacher
        ? `Đã đăng nhập thành công: Giáo viên (${cleanEmail})`
        : `Đã đăng nhập thành công: Học sinh (${cleanEmail})`
    );

    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
      setSuccessMessage('');
    }, 450);
  };

  const handleQuickStudentLogin = (email: string, name: string) => {
    setError('');
    const user = loginWithGoogle(email, name);
    setSuccessMessage(`Đã đăng nhập tài khoản học sinh: ${name}`);
    
    try {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
      setSuccessMessage('');
    }, 350);
  };

  const cleanTypedEmail = emailInput.trim().toLowerCase();
  const isTypingTeacher = cleanTypedEmail === TEACHER_EMAIL.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md">
              {/* Google G Official 4-Color Logo */}
              <svg viewBox="0 0 24 24" className="w-7 h-7">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">Đăng nhập tài khoản Google</h2>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/30 px-1.5 py-0.2 rounded font-medium">
                  Google Workspace
                </span>
              </div>
              <p className="text-xs text-blue-200 truncate max-w-[280px] sm:max-w-xs">
                Chủ sở hữu Thư mục Tổng: {TEACHER_EMAIL}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current logged in status banner (if any) */}
        {currentUser && (
          <div className="px-6 py-2.5 bg-blue-50/90 border-b border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-slate-600">
                Đang đăng nhập: <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                onLoginSuccess(null as any);
              }}
              className="text-rose-600 hover:text-rose-800 font-semibold underline text-[11px]"
            >
              Đăng xuất
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('teacher'); setError(''); setSuccessMessage(''); }}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'teacher'
                ? 'border-blue-600 text-blue-900 bg-white font-bold shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Tài khoản Giáo viên ({TEACHER_EMAIL})</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setError(''); setSuccessMessage(''); }}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'student'
                ? 'border-blue-600 text-blue-900 bg-white font-bold shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Tài khoản Học sinh / Khác</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {activeTab === 'teacher' ? (
            /* TEACHER LOGIN TAB */
            <div className="space-y-5">
              
              {/* Teacher Google Profile Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-blue-50/50 to-indigo-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Chủ sở hữu Thư mục Tổng (Khối 9):
                  </span>
                  <span className="text-[10px] bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded-full font-bold">
                    Toàn quyền Quản trị
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(TEACHER_EMAIL)}`}
                    alt="Teacher Avatar"
                    className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      Thầy Hoàng (GV Tin học - AI)
                    </h4>
                    <p className="font-mono text-xs text-blue-700 font-semibold truncate">
                      {TEACHER_EMAIL}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Tự động kết nối và sở hữu toàn bộ Folder của 21 lớp từ <strong>9A1 – 9A22</strong>.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Sau <strong>2 tuần</strong>, toàn bộ quyền chỉnh sửa của học sinh sẽ tự động khóa lại cho Giáo viên.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Xuất bảng Google Sheets tổng hợp thông tin nhóm, link folder và rubric tương ứng.</span>
                  </div>
                </div>
              </div>

              {/* Exact Google Button (Primary Action) */}
              <div className="pt-1 flex flex-col items-center gap-2">
                <GoogleSignInButton
                  onClick={handleTeacherLogin}
                  text="Sign in with Google"
                  subtext={TEACHER_EMAIL}
                  className="w-full justify-center shadow-lg hover:shadow-xl py-2"
                />
                <span className="text-[11px] text-slate-500">
                  Bấm để đăng nhập trực tiếp với vai trò Giáo viên phụ trách
                </span>
              </div>

              {/* Master folder quick external link */}
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">Thư mục Tổng trên Google Drive:</span>
                <a
                  href={MASTER_FOLDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>Mở Drive Khối 9</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* STUDENT LOGIN TAB */
            <form onSubmit={handleCustomLogin} className="space-y-4">
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                <FolderLock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Học sinh có quyền chỉnh sửa tài liệu trong folder nhóm trong vòng <strong>2 tuần</strong> kể từ khi tạo nhóm. Sau thời hạn, thư mục tự động chuyển quyền sở hữu độc quyền cho Giáo viên.
                </span>
              </div>

              {/* Google Email Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Email Google (Vinschool hoặc Gmail) <span className="text-rose-500">*</span>
                  </label>
                  {isTypingTeacher && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                      Tài khoản Giáo viên
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="VD: minhanh.nguyen@vinschool.edu.vn"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Nếu nhập <code>{TEACHER_EMAIL}</code>, hệ thống sẽ tự động cấp quyền Giáo viên.
                </p>
              </div>

              {/* Student Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên Học sinh
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="VD: Nguyễn Minh Anh (9A1)"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Submit Google Button */}
              <div className="pt-2">
                <GoogleSignInButton
                  type="submit"
                  text="Sign in with Google"
                  subtext={cleanTypedEmail ? cleanTypedEmail : "Đăng nhập tài khoản Học sinh"}
                  className="w-full justify-center shadow-lg hover:shadow-xl py-2"
                />
              </div>

              {/* Quick sample student profiles for instant testing */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Hoặc chọn nhanh tài khoản học sinh mẫu để kiểm tra:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickStudentLogin('minhanh.nguyen@vinschool.edu.vn', 'Nguyễn Minh Anh (9A1)')}
                    className="p-2.5 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 group-hover:text-blue-700 block truncate">
                        Nguyễn Minh Anh
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </div>
                    <span className="text-slate-500 text-[10px] block truncate">
                      minhanh.nguyen@vinschool.edu.vn
                    </span>
                    <span className="text-[9px] text-blue-600 font-semibold">Lớp 9A1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickStudentLogin('quangkhai.pham@vinschool.edu.vn', 'Phạm Quang Khải (9A3)')}
                    className="p-2.5 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 group-hover:text-blue-700 block truncate">
                        Phạm Quang Khải
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </div>
                    <span className="text-slate-500 text-[10px] block truncate">
                      quangkhai.pham@vinschool.edu.vn
                    </span>
                    <span className="text-[9px] text-blue-600 font-semibold">Lớp 9A3</span>
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Tích hợp trực tiếp Google Drive & Google Sheets</span>
          </div>
          <span className="text-slate-400 font-mono text-[10px]">Vinschool AI Hub</span>
        </div>

      </div>
    </div>
  );
};
