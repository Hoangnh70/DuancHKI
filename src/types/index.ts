/**
 * Type definitions for K9 AI Project Management Hub
 */

export type ProjectType = 'individual' | 'pair';

export interface TeamMember {
  name: string;
  studentId: string;
  email?: string;
  role?: string;
}

export type TopicId = 'topic-1' | 'topic-2' | 'topic-3';

export interface ProjectTopic {
  id: TopicId;
  title: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  colorScheme: {
    primary: string;
    light: string;
    border: string;
    text: string;
  };
  targetUsers: string;
  aiTechnologies: string[];
  recommendedMTBIds: string[];
  deliverables: string[];
  phases: {
    phaseNumber: number;
    title: string;
    description: string;
    studentTasks: string[];
    suggestedOutputs: string[];
  }[];
}

export interface MTBItem {
  id: string; // e.g. "MTB 1.1.a"
  title: string;
  competencies: string[]; // e.g. ["Giao tiếp & tổng hợp thông tin", "Xác định các bên liên quan", ...]
  domain: '1.1' | '1.2' | '1.3' | '1.4' | '2.1';
  domainLabel: string;
  defaultCheckedTopic1: boolean;
  defaultCheckedTopic2: boolean;
  defaultCheckedTopic3: boolean;
}

export interface UserStory {
  id: string;
  asA: string; // Là ai (ví dụ: Học sinh lớp 9 ôn thi)
  iWant: string; // Muốn gì (ví dụ: Được giải thích bài toán từng bước)
  soThat: string; // Để làm gì (ví dụ: Tự hiểu bản chất bài học mà không cần chép lời giải)
  priority: 'Cao' | 'Trung bình' | 'Thấp';
}

export interface PromptStep {
  id: string;
  stepNumber: number;
  purpose: string;
  promptText: string;
  expectedOutput: string;
  optimizedNotes?: string;
}

export interface DeliverableFile {
  id: string;
  title: string;
  type: 'slide' | 'video' | 'prototype' | 'doc' | 'link' | 'code';
  url: string;
  description?: string;
  updatedAt: string;
}

export interface WorkLogEntry {
  id: string;
  date: string;
  author: string;
  content: string;
  progressPercent: number;
}

export interface DriveSubfolder {
  id: string;
  name: string;
  description: string;
  url: string;
  allowedTypes: string; // e.g. "Khảo sát, User Story, phỏng vấn"
}

export interface TeamFolder {
  folderId: string;
  folderName: string;
  driveFolderUrl: string;
  driveFolderId: string;
  ownerEmail: string; // "v.hoangnh70@vinschool.edu.vn"
  lockDate: string; // 14 days after creation
  isLocked: boolean; // True after 14 days or teacher lock
  classGoogleSheetUrl: string;
  subfolders: DriveSubfolder[];
  selectedMTBIds: string[];
  mtbNotes: Record<string, string>; // evidence / notes for each MTB
  userStories: UserStory[];
  promptChain: PromptStep[];
  agileRisks: { risk: string; mitigation: string }[];
  ethicsAnalysis: {
    privacyStrategy: string;
    intellectualProperty: string;
    dilemmaSolution: string;
    wellbeingStrategy: string;
  };
  files: DeliverableFile[];
  workLogs: WorkLogEntry[];
  summaryReport: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'graded';
  submittedAt?: string;
  teacherAssessment?: {
    score: number; // 0 - 10
    criteriaScores: Record<string, number>;
    comment: string;
    gradedAt: string;
    teacherName: string;
  };
}

export interface Team {
  id: string;
  teamCode: string; // 6-digit access code, e.g. "K9-74A2"
  teamName: string;
  className: string; // e.g. "9A1", "9A2"
  projectType: ProjectType;
  topicId: TopicId;
  members: TeamMember[];
  createdAt: string;
  folder: TeamFolder;
}

export type ActiveView = 
  | 'home' 
  | 'register' 
  | 'workspace' 
  | 'guides' 
  | 'rubric' 
  | 'teacher_dashboard';

export const TEACHER_EMAIL = 'v.hoangnh70@vinschool.edu.vn';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'teacher' | 'student';
  studentId?: string;
  className?: string;
}
