import React, { useState } from 'react';
import { AuthUser, TEACHER_EMAIL } from '../types';
import { loginWithGoogle, loginTeacherQuick } from '../services/auth';
import { GoogleSignInButton } from './GoogleSignInButton';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  AlertCircle,
  FolderLock
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
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleTeacherLogin = () => {
    const user = loginTeacherQuick();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}
    onLoginSuccess(user);
    onClose();
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentEmail.trim()) {
      setError('Vui lòng nhập email Google của học sinh');
      return;
    }

    if (!studentEmail.includes('@')) {
      setError('Email không hợp lệ (Ví dụ: ten.hs@vinschool.edu.vn hoặc @gmail.com)');
      return;
    }

    const cleanEmail = studentEmail.trim().toLowerCase();
    
    // Check if entered email is teacher email
    if (cleanEmail === TEACHER_EMAIL.toLowerCase()) {
      handleTeacherLogin();
      return;
    }

    const user = loginWithGoogle(
      cleanEmail,
      studentName.trim() || cleanEmail.split('@')[0]
    );

    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {}

    onLoginSuccess(user);
    onClose();
  };

  const handleQuickStudentLogin = (email: string, name: string) => {
    const user = loginWithGoogle(email, name);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-sm">
              {/* Google G Logo */}
              <svg viewBox="0 0 24 24" className="w-6 h-6">
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
              <h2 className="text-base font-bold">Đăng nhập tài khoản Google</h2>
              <p className="text-xs text-blue-200">
                Chủ sở hữu Thư mục Tổng: {TEACHER_EMAIL}
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('teacher'); setError(''); }}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'teacher'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Tài khoản Giáo viên ({TEACHER_EMAIL})</span>
          </button>
          <button
            onClick={() => { setActiveTab('student'); setError(''); }}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'student'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Tài khoản Học sinh</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'teacher' ? (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Chủ sở hữu Thư mục Tổng (Khối 9):
                  </span>
                  <span className="text-[10px] bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded font-bold">
                    Toàn quyền
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-blue-200">
                  {TEACHER_EMAIL}
                </div>
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Tài khoản của bạn tự động sở hữu toàn bộ các Folder Drive của 21 lớp từ <strong>9A1 – 9A22</strong>. Sau 2 tuần học sinh làm bài, các thư mục này sẽ hoàn toàn thuộc quyền sở hữu của bạn và học sinh không còn chỉnh sửa được.
                </p>
              </div>

              {/* Exact Google Button */}
              <div className="flex justify-center pt-1">
                <GoogleSignInButton
                  onClick={handleTeacherLogin}
                  text="Sign in with Google"
                  subtext={TEACHER_EMAIL}
                  className="w-full justify-center"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <FolderLock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Học sinh có quyền chỉnh sửa tài liệu trong folder nhóm trong vòng <strong>2 tuần</strong> kể từ khi tạo. Sau thời hạn, thư mục sẽ tự động khóa lại cho Giáo viên chấm điểm.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Google của Học sinh (Vinschool / Gmail) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="VD: minhanh.nguyen@vinschool.edu.vn"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên Học sinh
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="VD: Nguyễn Minh Anh"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <GoogleSignInButton
                  onClick={() => {}}
                  text="Sign in with Google"
                  subtext="Đăng nhập tài khoản Học sinh"
                  className="w-full justify-center"
                />
              </div>

              {/* Quick sample student profiles */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Hoặc chọn nhanh tài khoản học sinh mẫu:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickStudentLogin('minhanh.nguyen@vinschool.edu.vn', 'Nguyễn Minh Anh (9A1)')}
                    className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-[11px] transition-colors"
                  >
                    <span className="font-bold text-slate-800 block">Nguyễn Minh Anh</span>
                    <span className="text-slate-500 text-[10px]">minhanh.nguyen@vinschool...</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickStudentLogin('quangkhai.pham@vinschool.edu.vn', 'Phạm Quang Khải (9A3)')}
                    className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-[11px] transition-colors"
                  >
                    <span className="font-bold text-slate-800 block">Phạm Quang Khải</span>
                    <span className="text-slate-500 text-[10px]">quangkhai.pham@vinschool...</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Bảo mật danh tính & tích hợp trực tiếp với Google Drive / Sheets.</span>
        </div>
      </div>
    </div>
  );
};
