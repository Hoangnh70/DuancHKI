import React, { useState, useMemo } from 'react';
import { ALL_MTB_ITEMS, PROJECT_TOPICS } from '../data/curriculum';
import { Award, Check, Filter, Search, Info, RotateCcw, Download } from 'lucide-react';

export const RubricMatrixView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive simulator checkboxes
  const [activeChecks, setActiveChecks] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ALL_MTB_ITEMS.forEach(m => {
      // Default to Topic 1 checked state as initial example
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
      const matchQuery = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.competencies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
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
              <span>Khung Năng lực Chuẩn - Khối 9 Cuối kỳ I</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ma trận Mục tiêu Bài (MTB) & Năng lực
            </h1>
            <p className="text-sm text-slate-600">
              Trích xuất trực tiếp từ Phiếu kiểm tra cuối kỳ I môn AI. Bạn có thể tick chọn mô phỏng để tự động tính toán tổng số mục tiêu và năng lực đạt được.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 uppercase px-2">
              Xem mẫu theo chủ đề:
            </span>
            <button
              onClick={() => handleSelectPreset(1)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              Trợ lý AI
            </button>
            <button
              onClick={() => handleSelectPreset(2)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors"
            >
              Sức khỏe tinh thần
            </button>
            <button
              onClick={() => handleSelectPreset(3)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
            >
              Dr.Plant AI
            </button>
            <button
              onClick={() => {
                const empty: Record<string, boolean> = {};
                ALL_MTB_ITEMS.forEach(m => (empty[m.id] = false));
                setActiveChecks(empty);
              }}
              title="Đặt lại"
              className="p-1 text-slate-400 hover:text-slate-600"
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
                selectedDomain === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (21 MTB)
            </button>
            <button
              onClick={() => setSelectedDomain('1.1')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.1' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.1 Khảo sát & Kế hoạch
            </button>
            <button
              onClick={() => setSelectedDomain('1.2')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.2' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.2 Prompt & Công cụ
            </button>
            <button
              onClick={() => setSelectedDomain('1.3')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.3' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.3 Đạo đức & Luật pháp
            </button>
            <button
              onClick={() => setSelectedDomain('1.4')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '1.4' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.4 Tác động & Tư duy
            </button>
            <button
              onClick={() => setSelectedDomain('2.1')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDomain === '2.1' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2.1 Dữ liệu & Học máy
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mã MTB hoặc từ khóa..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-4 w-12 text-center">Tick</th>
                <th className="py-3 px-4 w-28">Mã MTB</th>
                <th className="py-3 px-4 min-w-[280px]">Mục tiêu bài kiểm tra</th>
                <th className="py-3 px-4 min-w-[240px]">Mô tả năng lực tương ứng</th>
                <th className="py-3 px-3 w-28 text-center bg-blue-50/70 text-blue-900">
                  Trợ lý AI
                </th>
                <th className="py-3 px-3 w-28 text-center bg-teal-50/70 text-teal-900">
                  SK Tinh thần
                </th>
                <th className="py-3 px-3 w-28 text-center bg-emerald-50/70 text-emerald-900">
                  Dr.Plant AI
                </th>
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
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(item.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-700 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 text-slate-800 leading-relaxed font-medium">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 leading-relaxed">
                      <div className="flex flex-wrap gap-1">
                        {item.competencies.map((c, i) => (
                          <span 
                            key={i} 
                            className="inline-block bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]"
                          >
                            {c}
                          </span>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Summary Section: Exactly like the Excel formula in the school document */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Kết quả tính toán động (Sau khi đã tick chọn)
            </span>
            <h2 className="text-xl font-bold mt-1">
              Hồ sơ Mục tiêu & Năng lực được Tích lũy
            </h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-blue-400">
              {selectedMTBList.length}
            </span>
            <span className="text-xs text-slate-300 block">/ 21 Mục tiêu</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selected MTBs */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-300">
                1. Mục tiêu bài đã chọn ({selectedMTBList.length}):
              </h3>
            </div>
            {selectedMTBList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa lựa chọn mục tiêu nào. Hãy tick chọn các mục tiêu ở bảng phía trên.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {selectedMTBList.map(m => (
                  <div key={m.id} className="text-xs text-slate-200 bg-white/5 p-2 rounded border border-white/5">
                    <span className="font-bold text-blue-400 block">{m.id}:</span>
                    <span className="text-slate-300">{m.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Competencies */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-300">
                2. Năng lực hình thành ({selectedCompetencies.length}):
              </h3>
            </div>
            {selectedCompetencies.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa có năng lực nào được kích hoạt.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto pr-2">
                {selectedCompetencies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded text-xs"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
