import React, { useState } from 'react';
import { PROJECT_TOPICS, ALL_MTB_ITEMS } from '../data/curriculum';
import { TopicId } from '../types';
import { 
  Bot, 
  HeartPulse, 
  Leaf, 
  CheckCircle, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Users, 
  FileText, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProjectGuidesViewProps {
  onSelectTopicToRegister?: (topicId: TopicId) => void;
}

export const ProjectGuidesView: React.FC<ProjectGuidesViewProps> = ({
  onSelectTopicToRegister
}) => {
  const [activeTopicId, setActiveTopicId] = useState<TopicId>('topic-1');
  const currentTopic = PROJECT_TOPICS.find(t => t.id === activeTopicId) || PROJECT_TOPICS[0];

  const getTopicIcon = (id: TopicId) => {
    switch (id) {
      case 'topic-1': return <Bot className="w-5 h-5" />;
      case 'topic-2': return <HeartPulse className="w-5 h-5" />;
      case 'topic-3': return <Leaf className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Intro */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Kỳ thi Đánh giá Cuối kỳ I - Môn Trí tuệ Nhân tạo (K9)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hướng dẫn Chi tiết 3 Chủ đề Dự án
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Học sinh được lựa chọn thực hiện theo hình thức <strong>Cá nhân</strong> hoặc <strong>Nhóm đôi</strong>.
            Dưới đây là cẩm nang từng bước hướng dẫn những việc học sinh cần làm, các sản phẩm bàn giao cần nộp, và ma trận năng lực cần đạt.
          </p>
        </div>

        {/* 3 Topic Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {PROJECT_TOPICS.map((topic) => {
            const isSelected = activeTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: topic.colorScheme.primary }}
                    >
                      {getTopicIcon(topic.id)}
                    </div>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Đang xem
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {topic.shortName}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {topic.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>Xem hướng dẫn</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Topic Detailed Guide */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Topic Header Banner */}
        <div 
          className="p-6 sm:p-8 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentTopic.colorScheme.primary} 0%, #1e1b4b 100%)`
          }}
        >
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-md bg-white/20 text-xs font-semibold backdrop-blur-xs">
              {currentTopic.title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentTopic.tagline}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              {currentTopic.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span><strong>Đối tượng thụ hưởng:</strong> {currentTopic.targetUsers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* AI Tech Stack & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-sm">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Công nghệ & Kiến thức AI áp dụng</span>
              </div>
              <ul className="space-y-2">
                {currentTopic.aiTechnologies.map((tech, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables Checklist */}
            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Sản phẩm bàn giao cần nộp vào Thư mục nhóm</span>
              </div>
              <ul className="space-y-2">
                {currentTopic.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-emerald-900">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5-Phase Roadmap: What Students Need to Do */}
          {/* 5 Phases Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Lộ trình 5 Bước Triển Khai: Học sinh cần làm gì?
                </h3>
                <p className="text-xs text-slate-500">
                  Thực hiện tuần tự theo 5 bước rõ ràng để hoàn thành trọn vẹn sản phẩm và đạt điểm tối đa theo Rubric
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {currentTopic.phases.map((phase) => (
                <div 
                  key={phase.phaseNumber}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white transition-all shadow-2xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {phase.phaseNumber}
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Bước {phase.phaseNumber}: {phase.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {phase.description}
                        </p>
                      </div>

                      {/* Tasks list */}
                      <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Các việc cụ thể học sinh cần làm trong Bước {phase.phaseNumber}:
                        </span>
                        {phase.studentTasks.map((task, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded text-[10px] shrink-0">
                              {phase.phaseNumber}.{idx + 1}
                            </span>
                            <span className="leading-relaxed">{task}</span>
                          </div>
                        ))}
                      </div>

                      {/* Output expected */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="font-semibold text-slate-500">Sản phẩm đầu ra cần có:</span>
                        {phase.suggestedOutputs.map((out, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200"
                          >
                            {out}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended MTB from School Rubric */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Các Mục tiêu bài (MTB) trọng tâm của đề tài này:
              </h4>
              <p className="text-xs text-slate-500">
                Khi đăng ký đề tài này, các mục tiêu bài sau sẽ tự động được đưa vào danh mục theo dõi của nhóm:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTopic.recommendedMTBIds.map((mtbId) => {
                const mtb = ALL_MTB_ITEMS.find(m => m.id === mtbId);
                if (!mtb) return null;
                return (
                  <div key={mtbId} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-700">{mtb.id}</span>
                      <span className="text-[10px] text-slate-500">{mtb.domainLabel}</span>
                    </div>
                    <p className="text-slate-800 font-medium line-clamp-2">
                      {mtb.title}
                    </p>
                    <div className="text-[10px] text-slate-500 truncate pt-1">
                      Năng lực: {mtb.competencies.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to action */}
          {onSelectTopicToRegister && (
            <div className="pt-4 flex items-center justify-between bg-blue-50/80 p-5 rounded-xl border border-blue-200">
              <div>
                <h4 className="text-sm font-bold text-blue-900">
                  Sẵn sàng bắt đầu với {currentTopic.shortName}?
                </h4>
                <p className="text-xs text-blue-700">
                  Đăng ký nhóm ngay để hệ thống tự động khởi tạo Thư mục và biểu mẫu bài tập cho bạn.
                </p>
              </div>
              <button
                onClick={() => onSelectTopicToRegister(currentTopic.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
              >
                <span>Đăng ký Đề tài này</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
