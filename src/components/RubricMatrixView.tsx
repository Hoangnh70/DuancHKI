import React, { useState, useMemo } from 'react';
import { ALL_MTB_ITEMS } from '../data/curriculum';
import { MTBItem } from '../types';
import { 
  Award, 
  Check, 
  Search, 
  RotateCcw, 
  ChevronRight,
  Sparkles,
  BookOpen,
  X,
  ListOrdered
} from 'lucide-react';

export const RubricMatrixView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMTBDetail, setActiveMTBDetail] = useState<MTBItem | null>(null);

  // Interactive simulator checkboxes
  const [activeChecks, setActiveChecks] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ALL_MTB_ITEMS.forEach(m => {
      init[m.id] = m.defaultCheckedTopic1;
    });
    return init;
  });

  const toggleCheck = (id: string) => {
    setActiveChecks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectPreset = (topicIndex: 1 | 2 | 3) => {
    const next: Record<string, boolean> = {};
    ALL_MTB_ITEMS.forEach(m => {
      if (topicIndex === 1) next[m.id] = m.defaultCheckedTopic1;
      else if (topicIndex === 2) next[m.id] = m.defaultCheckedTopic2;
      else if (topicIndex === 3) next[m.id] = m.defaultCheckedTopic3;
    });
    setActiveChecks(next);
  };

  const filteredItems = useMemo(() => {
    return ALL_MTB_ITEMS.filter(item => {
      const matchDomain = selectedDomain === 'all' || item.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.criterionTitle.toLowerCase().includes(q) ||
        item.steps.some(s => s.toLowerCase().includes(q)) ||
        item.competencies.some(c => c.toLowerCase().includes(q));
      return matchDomain && matchQuery;
    });
  }, [selectedDomain, searchQuery]);

  // Derived selected MTB and unique competencies
  const selectedMTBList = useMemo(() => {
    return ALL_MTB_ITEMS.filter(m => activeChecks[m.id]);
  }, [activeChecks]);

  const selectedCompetencies = useMemo(() => {
    const compSet = new Set<string>();
    selectedMTBList.forEach(m => {
      m.competencies.forEach(c => compSet.add(c));
    });
    return Array.from(compSet);
  }, [selectedMTBList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Khung Rubric Đánh Giá Chuẩn Học Kỳ I - Môn AI Khối 9</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ma Trận 19 Mục Tiêu Bài (MTB) & Hướng Dẫn Từng Bước
            </h1>
            <p className="text-sm text-slate-600">
              Cập nhật nguyên bản theo Rubric đánh giá dự án cuối kỳ I. Mỗi mục tiêu đều chỉ rõ <strong>Bước 1 làm gì, Bước 2 làm gì,...</strong> và tiêu chí 4 mức đánh giá (Mức 4 Vượt – Mức 3 Đạt – Mức 2 Đang hình thành – Mức 1 Chưa đạt).
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 uppercase px-2">
              Xem mẫu theo chủ đề:
            </span>
            <button
              onClick={() => handleSelectPreset(1)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              Trợ lý AI
            </button>
            <button
              onClick={() => handleSelectPreset(2)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors"
            >
              SK Tinh thần
            </button>
            <button
              onClick={() => handleSelectPreset(3)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
            >
              Dr.Plant AI
            </button>
            <button
              onClick={() => {
                const empty: Record<string, boolean> = {};
                ALL_MTB_ITEMS.forEach(m => (empty[m.id] = false));
                setActiveChecks(empty);
              }}
              title="Bỏ chọn tất cả"
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Domain tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (19 MTB)
            </button>
            <button
              onClick={() => setSelectedDomain('1.1')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.1' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.1 Khảo sát & Kế hoạch (4 MTB)
            </button>
            <button
              onClick={() => setSelectedDomain('1.2')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.2' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.2 Prompt & Công cụ (6 MTB)
            </button>
            <button
              onClick={() => setSelectedDomain('1.3')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.3' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.3 Đạo đức & Luật pháp (5 MTB)
            </button>
            <button
              onClick={() => setSelectedDomain('1.4')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.4' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.4 Tác động & Tư duy (4 MTB)
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mã MTB, bước làm, từ khóa..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Table with Step-by-Step Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-3 w-10 text-center">Tick</th>
                <th className="py-3 px-3 w-24">Mã MTB</th>
                <th className="py-3 px-4 min-w-[220px]">Tiêu chí & Mục tiêu bài</th>
                <th className="py-3 px-4 min-w-[320px]">Các bước thực hiện (Bước 1 làm gì, Bước 2...)</th>
                <th className="py-3 px-3 w-28 text-center bg-blue-50/70 text-blue-900">Trợ lý AI</th>
                <th className="py-3 px-3 w-28 text-center bg-teal-50/70 text-teal-900">SK Tinh thần</th>
                <th className="py-3 px-3 w-28 text-center bg-emerald-50/70 text-emerald-900">Dr.Plant AI</th>
                <th className="py-3 px-3 w-24 text-center">Rubric 4 Mức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isChecked = !!activeChecks[item.id];
                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isChecked ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(item.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                          {item.criterionTitle}
                        </span>
                        <p className="text-slate-800 leading-relaxed font-semibold text-xs">
                          {item.title}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1.5">
                        {item.steps.map((st, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-700">
                            <span className="font-bold text-blue-700 shrink-0 bg-blue-50 px-1 py-0.2 rounded border border-blue-200 text-[10px]">
                              B{sIdx + 1}
                            </span>
                            <span className="line-clamp-2">{st.replace(/^Bước \d+:\s*/, '')}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center bg-blue-50/30">
                      {item.defaultCheckedTopic1 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-[10px]">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center bg-teal-50/30">
                      {item.defaultCheckedTopic2 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-teal-600 text-white rounded-full text-[10px]">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center bg-emerald-50/30">
                      {item.defaultCheckedTopic3 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-600 text-white rounded-full text-[10px]">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setActiveMTBDetail(item)}
                        className="px-2.5 py-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors inline-flex items-center gap-1"
                      >
                        <span>Chi tiết</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Summary Section: Calculated from Selected MTBs */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kết quả tính toán động theo Rubric chính thức</span>
            </span>
            <h2 className="text-xl font-bold mt-1">
              Hồ sơ Mục tiêu & Năng lực Tích lũy ({selectedMTBList.length} / 19 MTB)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedMTBList.length >= 5 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {selectedMTBList.length >= 5 ? '✅ Đã đủ tối thiểu 5 MTB' : `⚠️ Chưa đủ (Cần thêm ${5 - selectedMTBList.length} MTB)`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selected MTBs */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-bold text-blue-300 flex items-center justify-between">
              <span>1. Mục tiêu bài đã chọn ({selectedMTBList.length}):</span>
            </h3>
            {selectedMTBList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa lựa chọn mục tiêu nào. Hãy tick chọn các mục tiêu ở bảng phía trên.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {selectedMTBList.map(m => (
                  <div key={m.id} className="text-xs text-slate-200 bg-white/5 p-2 rounded border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-400">{m.id}</span>
                      <span className="text-[10px] text-purple-300">{m.criterionTitle}</span>
                    </div>
                    <span className="text-slate-300 block line-clamp-1">{m.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Competencies */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center justify-between">
              <span>2. Năng lực hình thành ({selectedCompetencies.length}):</span>
            </h3>
            {selectedCompetencies.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa có năng lực nào được kích hoạt.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto pr-2">
                {selectedCompetencies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MTB Detail Modal with Full 4-Level Rubric & 4 Steps */}
      {activeMTBDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                    {activeMTBDetail.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-800 font-semibold text-xs">
                    {activeMTBDetail.criterionTitle}
                  </span>
                  <span className="text-xs text-slate-500">
                    {activeMTBDetail.domainLabel}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {activeMTBDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMTBDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step-by-Step Action Guide */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                <ListOrdered className="w-4 h-4 text-blue-700" />
                <span>Quy trình 4 Bước Thực hiện cho Học sinh:</span>
              </div>
              <div className="space-y-2">
                {activeMTBDetail.steps.map((st, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {st}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rubric 4 Levels */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Tiêu chí Đánh giá 4 Mức (Trích nguyên bản Phiếu Đánh giá Dự án):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Level 4: Vượt */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span>🌟</span> Mức 4 – Vượt
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">
                      Xuất sắc
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-950 leading-relaxed">
                    {activeMTBDetail.rubric.level4}
                  </p>
                </div>

                {/* Level 3: Đạt */}
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <span>✅</span> Mức 3 – Đạt
                    </span>
                    <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                      Chuẩn yêu cầu
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-950 leading-relaxed">
                    {activeMTBDetail.rubric.level3}
                  </p>
                </div>

                {/* Level 2: Đang hình thành */}
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <span>⚠️</span> Mức 2 – Đang hình thành
                    </span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                      Cần cải thiện
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-950 leading-relaxed">
                    {activeMTBDetail.rubric.level2}
                  </p>
                </div>

                {/* Level 1: Chưa đạt */}
                <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <span>❌</span> Mức 1 – Chưa đạt
                    </span>
                    <span className="text-[10px] font-bold bg-rose-200 text-rose-800 px-2 py-0.5 rounded">
                      Chưa đạt
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-950 leading-relaxed">
                    {activeMTBDetail.rubric.level1}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveMTBDetail(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
