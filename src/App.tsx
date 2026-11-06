import React, { useState, useEffect } from 'react';
import { ActiveView, Team, TopicId, AuthUser } from './types';
import { getTeams, subscribeToTeams } from './services/storage';
import { getCurrentUser, subscribeToAuth, logout } from './services/auth';
import { Navbar } from './components/Navbar';
import { StudentHomeView } from './components/StudentHomeView';
import { StudentRegisterModal } from './components/StudentRegisterModal';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { ProjectGuidesView } from './components/ProjectGuidesView';
import { RubricMatrixView } from './components/RubricMatrixView';
import { TeamFolderView } from './components/TeamFolderView';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  const [teams, setTeams] = useState<Team[]>(() => getTeams());
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Sync teams with storage events
  useEffect(() => {
    const unsubscribe = subscribeToTeams((updated) => {
      setTeams(updated);
    });
    return unsubscribe;
  }, []);

  // Sync auth with storage events
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const activeTeam = teams.find(t => t.id === activeTeamId) || null;

  const handleOpenTeamFolder = (team: Team) => {
    setActiveTeamId(team.id);
    setActiveView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeamCreated = (newTeam: Team) => {
    setTeams(getTeams());
    setActiveTeamId(newTeam.id);
    setActiveView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateTeam = (updatedTeam: Team) => {
    setTeams(getTeams());
  };

  const handleNavigateToGuides = (topicId?: TopicId) => {
    setActiveView('guides');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRubric = () => {
    setActiveView('rubric');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    if (activeView === 'teacher_dashboard') {
      setActiveView('home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header with Google Login */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openRegisterModal={() => setIsRegisterOpen(true)}
        openLoginModal={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTeamName={activeTeam?.teamName}
        totalTeamsCount={teams.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeView === 'home' && (
          <StudentHomeView
            teams={teams}
            currentUser={currentUser}
            onOpenLoginModal={() => setIsLoginOpen(true)}
            onOpenRegisterModal={() => setIsRegisterOpen(true)}
            onOpenTeamFolder={handleOpenTeamFolder}
            onNavigateToGuides={handleNavigateToGuides}
            onNavigateToRubric={handleNavigateToRubric}
          />
        )}

        {activeView === 'workspace' && activeTeam && (
          <TeamFolderView
            team={activeTeam}
            currentUser={currentUser}
            onUpdateTeam={handleUpdateTeam}
            onBackToHome={() => setActiveView('home')}
          />
        )}

        {activeView === 'workspace' && !activeTeam && (
          <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
            <p className="text-sm text-slate-600">
              Chưa có thư mục nhóm nào được chọn. Vui lòng chọn một nhóm từ trang chủ hoặc đăng ký nhóm mới.
            </p>
            <button
              onClick={() => setActiveView('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
            >
              Về trang chủ
            </button>
          </div>
        )}

        {activeView === 'guides' && (
          <ProjectGuidesView
            onSelectTopicToRegister={(topicId) => {
              setIsRegisterOpen(true);
            }}
          />
        )}

        {activeView === 'rubric' && (
          <RubricMatrixView />
        )}

        {activeView === 'teacher_dashboard' && (
          <TeacherDashboard
            teams={teams}
            currentUser={currentUser}
            onOpenLoginModal={() => setIsLoginOpen(true)}
            onOpenTeamFolder={handleOpenTeamFolder}
            onOpenRegisterModal={() => setIsRegisterOpen(true)}
            onRefreshTeams={() => setTeams(getTeams())}
          />
        )}
      </main>

      {/* Student Registration Modal */}
      <StudentRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onTeamCreated={handleTeamCreated}
        currentUser={currentUser}
      />

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'teacher') {
            setActiveView('teacher_dashboard');
          }
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">AI Project Hub K9</span>
            <span>·</span>
            <span>Kỳ thi Đánh giá Năng lực Cuối kỳ I - Môn Trí tuệ Nhân tạo</span>
            <span>·</span>
            <span className="text-blue-700 font-semibold">21 Lớp (9A1 - 9A22)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span>Giáo viên phụ trách: v.hoangnh70@vinschool.edu.vn</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
