import React, { useState, useRef, useEffect } from 'react';
import { ActiveView, AuthUser } from '../types';
import { 
  FolderGit2, 
  BookOpen, 
  Award, 
  Plus, 
  Sparkles,
  ShieldCheck,
  LogOut,
  ChevronDown,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { MASTER_FOLDER_URL } from '../services/googleDriveWorkspace';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  openRegisterModal: () => void;
  openLoginModal: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  activeTeamName?: string;
  totalTeamsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  openRegisterModal,
  openLoginModal,
  currentUser,
  onLogout,
  activeTeamName,
  totalTeamsCount
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isTeacher = currentUser?.role === 'teacher';

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTeacherTabClick = () => {
    if (isTeacher) {
      setActiveView('teacher_dashboard');
    } else {
      openLoginModal();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
            title="Về trang chủ AI Project Hub K9"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight whitespace-nowrap">
                  AI Hub K9
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide">
                  9A1 - 9A22
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap leading-none hidden sm:block">
                Dự án Cuối kỳ I · Vinschool
              </span>
            </div>
          </div>

          {/* Center Navigation - Segmented Control Style */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
            {/* Nhóm làm việc */}
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'home' || activeView === 'workspace'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Thư mục Nhóm</span>
              {activeTeamName && (
                <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md font-medium truncate max-w-[100px]">
                  {activeTeamName}
                </span>
              )}
            </button>

            {/* 3 Chủ đề */}
            <button
              onClick={() => setActiveView('guides')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'guides'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>3 Chủ đề Dự án</span>
            </button>

            {/* Ma trận Rubric */}
            <button
              onClick={() => setActiveView('rubric')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'rubric'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Tiêu chí Rubric</span>
            </button>

            {/* Góc Giáo viên */}
            <button
              onClick={handleTeacherTabClick}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'teacher_dashboard'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : isTeacher
                    ? 'text-amber-900 hover:bg-amber-100/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              title={isTeacher ? 'Trang quản trị của Giáo viên' : 'Đăng nhập tài khoản Giáo viên'}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${activeView === 'teacher_dashboard' ? 'text-white' : isTeacher ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Góc Giáo viên</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeView === 'teacher_dashboard'
                  ? 'bg-white text-amber-800'
                  : 'bg-amber-200/90 text-amber-900'
              }`}>
                {totalTeamsCount}
              </span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* User Profile / Google Sign-in */}
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover bg-slate-100 border border-slate-200"
                  />
                  <div className="text-left text-xs hidden sm:block max-w-[110px]">
                    <span className="font-bold text-slate-800 block truncate leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-none truncate">
                      {isTeacher ? 'Giáo viên' : 'Học sinh'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    isTeacher ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                  }`}>
                    {isTeacher ? 'GV' : 'HS'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="p-2.5 border-b border-slate-100 bg-slate-50/60 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-bold text-slate-900 truncate block">
                          {currentUser.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono block truncate">
                        {currentUser.email}
                      </span>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isTeacher ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}>
                        {isTeacher ? 'Tài khoản Giáo viên (Độc quyền)' : 'Tài khoản Học sinh'}
                      </span>
                    </div>

                    {isTeacher && (
                      <>
                        <button
                          onClick={() => {
                            setActiveView('teacher_dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-amber-900 font-semibold flex items-center gap-2 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>Mở Bảng Quản lý Giáo viên</span>
                        </button>
                        <a
                          href={MASTER_FOLDER_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-left p-2 rounded-xl hover:bg-blue-50 text-blue-700 font-semibold flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-blue-600" />
                            <span>Mở Thư mục Tổng (Drive)</span>
                          </span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </>
                    )}

                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2 transition-colors border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất Google</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="hidden sm:inline">Đăng nhập</span>
                <span className="sm:hidden">Google</span>
              </button>
            )}

            {/* Quick Register CTA Button */}
            <button
              onClick={openRegisterModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-xs hover:shadow transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Đăng ký Nhóm</span>
              <span className="sm:hidden">Đăng ký</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Segmented Sub-Navbar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 text-xs no-scrollbar">
          <button
            onClick={() => setActiveView('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeView === 'home' || activeView === 'workspace' 
                ? 'bg-blue-50 text-blue-700 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Thư mục Nhóm</span>
          </button>
          <button
            onClick={() => setActiveView('guides')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeView === 'guides' 
                ? 'bg-blue-50 text-blue-700 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3 Chủ đề Dự án</span>
          </button>
          <button
            onClick={() => setActiveView('rubric')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeView === 'rubric' 
                ? 'bg-blue-50 text-blue-700 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Tiêu chí Rubric</span>
          </button>
          <button
            onClick={handleTeacherTabClick}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeView === 'teacher_dashboard' 
                ? 'bg-amber-100 text-amber-900 font-bold' 
                : isTeacher 
                  ? 'text-amber-800 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Góc Giáo viên ({totalTeamsCount})</span>
          </button>
        </div>

      </div>
    </header>
  );
};
