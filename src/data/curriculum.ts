import { MTBItem, ProjectTopic } from '../types';

export const AVAILABLE_CLASSES = [
  '9A1', '9A2', '9A3', '9A4', '9A5', '9A6', '9A7', '9A8', '9A9', '9A10',
  '9A11', '9A12', '9A14', '9A15', '9A16', '9A17', '9A18', '9A19', '9A20',
  '9A21', '9A22'
];

export const PROJECT_TOPICS: ProjectTopic[] = [
  {
    id: 'topic-1',
    title: 'Chủ đề 1: Trợ lý AI học tập',
    shortName: 'Trợ lý AI học tập',
    tagline: 'Gia sư ảo thông minh hỗ trợ giải đáp bài học và tự học hiệu quả',
    description: 'Một chatbot thông minh sử dụng AI để trả lời các câu hỏi liên quan đến bài học, giống như một trợ giảng ảo. Ví dụ, trợ lý AI có thể trả lời câu hỏi về Toán hoặc Văn bằng cách tìm thông tin trong tài liệu học tập.',
    iconName: 'Bot',
    colorScheme: {
      primary: '#2563eb',
      light: '#eff6ff',
      border: '#bfdbfe',
      text: '#1d4ed8'
    },
    targetUsers: 'Học sinh THCS đang cần giải thích kiến thức bài học, ôn thi và gợi ý phương pháp học tập cá nhân hóa.',
    aiTechnologies: [
      'Large Language Models (LLM)',
      'Prompt Chain Engineering',
      'Retrieval Augmented Generation (RAG)',
      'Học có giám sát (Supervised Learning)'
    ],
    recommendedMTBIds: [
      'MTB 1.1.a',
      'MTB 1.1.b',
      'MTB 1.1.c',
      'MTB 1.1.d',
      'MTB 1.2.a',
      'MTB 1.2.b',
      'MTB 1.2.d',
      'MTB 1.3.a',
      'MTB 1.3.d',
      'MTB 1.4.a',
      'MTB 1.4.c'
    ],
    deliverables: [
      'Bản tóm tắt nhu cầu người dùng (User Story) từ phỏng vấn học sinh/giáo viên',
      'Sơ đồ kiến trúc kỹ thuật & dòng dữ liệu của chatbot',
      'Bộ tài liệu Prompt Chain (ít nhất 3 bước câu lệnh tuần tự có tối ưu)',
      'Bản phân tích đạo đức: Liêm chính học thuật, chống chép bài vô tội vạ',
      'Sản phẩm demo (Chatbot prototype hoặc kịch bản thử nghiệm) & Slide báo cáo'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Khảo sát nhu cầu & Xây dựng User Story',
        description: 'Thực hiện phỏng vấn ít nhất 3 bạn học sinh hoặc 1 giáo viên bộ môn để hiểu nỗi đau (pain points) khi tự học ở nhà.',
        studentTasks: [
          'Soạn câu hỏi phỏng vấn về những lúc học sinh gặp khó khăn với bài tập',
          'Ghi nhận phản hồi và chuyển hóa thành cấu trúc: "Là học sinh lớp 9... Tôi muốn... Để có thể..."',
          'Sử dụng AI để phản biện lại các giả định ban đầu (MTB 1.1.d)'
        ],
        suggestedOutputs: ['Biên bản phỏng vấn', 'Bảng User Story có mức độ ưu tiên', 'Biên bản phản biện giả định cùng AI']
      },
      {
        phaseNumber: 2,
        title: 'Thiết kế Kiến trúc hệ thống & Quản lý Agile',
        description: 'Vẽ sơ đồ luồng dữ liệu của Trợ lý AI và lập kế hoạch làm việc theo sprint Agile.',
        studentTasks: [
          'Xác định phần cứng/nền tảng cần thiết (Web client, API Server, Token limits)',
          'Vẽ sơ đồ: Câu hỏi học sinh -> Prompt xử lý -> Kiểm tra tài liệu môn học -> Lời phản hồi sư phạm',
          'Liệt kê 3 rủi ro tiềm ẩn (ví dụ: AI bị ảo giác, quá hạn mức API) và phương án xử lý'
        ],
        suggestedOutputs: ['Sơ đồ kiến trúc hệ thống', 'Bảng phân công công việc Agile & Ma trận rủi ro']
      },
      {
        phaseNumber: 3,
        title: 'Thiết kế Chuỗi Prompt Chain & Thử nghiệm công cụ',
        description: 'Xây dựng chuỗi câu lệnh phức tạp hướng dẫn AI suy nghĩ từng bước (Chain-of-thought) để không đưa đáp án ngay.',
        studentTasks: [
          'Bước 1: Prompt phân loại môn học và mức độ bài toán',
          'Bước 2: Prompt đặt câu hỏi gợi mở cho học sinh tự suy nghĩ',
          'Bước 3: Prompt giải thích chi tiết phương pháp kèm ví dụ tương tự',
          'Tối ưu hóa câu lệnh để tránh hiện tượng AI trả lời sai công thức'
        ],
        suggestedOutputs: ['Bộ tài liệu Prompt Chain hoàn chỉnh', 'Bảng đối chiếu đầu ra trước và sau tối ưu']
      },
      {
        phaseNumber: 4,
        title: 'Đánh giá Đạo đức & Luật sở hữu trí tuệ',
        description: 'Phân tích các tình huống học sinh lạm dụng AI để gian lận và bản quyền tài liệu SGK.',
        studentTasks: [
          'Đưa ra giải pháp để chatbot khuyến khích học sinh tư duy thay vì làm hộ',
          'Kiểm tra tính bản quyền của tài liệu đưa vào huấn luyện hoặc prompt',
          'Đề xuất chiến lược bảo vệ thói quen tự học và sức khỏe tinh thần'
        ],
        suggestedOutputs: ['Bản báo cáo Liêm chính học thuật và Quyền sở hữu trí tuệ']
      },
      {
        phaseNumber: 5,
        title: 'Đóng gói sản phẩm & Thuyết trình',
        description: 'Tổng hợp thư mục dự án, video demo hoặc link thử nghiệm chatbot và slide báo cáo cuối kỳ.',
        studentTasks: [
          'Quay video ngắn 2-3 phút demo cách chatbot trợ giúp học sinh giải bài tập',
          'Hoàn thiện slide thuyết trình 8-10 trang theo tiêu chí đánh giá K9',
          'Nộp toàn bộ đường link vào Thư mục nhóm trên web'
        ],
        suggestedOutputs: ['Slide thuyết trình (Canva/Slides)', 'Video Demo', 'Link Prototype']
      }
    ]
  },
  {
    id: 'topic-2',
    title: 'Chủ đề 2: Nghiên cứu hệ thống AI cảnh báo sớm sức khỏe tinh thần',
    shortName: 'AI Sức khỏe tinh thần',
    tagline: 'Phân tích văn bản phát hiện sớm dấu hiệu căng thẳng và hỗ trợ tâm lý học đường',
    description: 'Nghiên cứu giải pháp xây dựng công cụ AI phân tích nội dung văn bản (ví dụ: bài viết, nhật ký, tin nhắn) để phát hiện sớm các dấu hiệu trầm cảm, lo âu ở học sinh.',
    iconName: 'HeartPulse',
    colorScheme: {
      primary: '#0d9488',
      light: '#f0fdfa',
      border: '#99f6e4',
      text: '#0f766e'
    },
    targetUsers: 'Chuyên viên tâm lý học đường, giáo viên chủ nhiệm và chính các bạn học sinh cần được lắng nghe, thấu cảm.',
    aiTechnologies: [
      'Xử lý ngôn ngữ tự nhiên (NLP)',
      'Phân tích cảm xúc văn bản (Sentiment Analysis)',
      'Học máy có giám sát (Supervised Learning - Text Classification)',
      'Big Data & Dữ liệu biến số rời rạc'
    ],
    recommendedMTBIds: [
      'MTB 1.1.a',
      'MTB 1.1.b',
      'MTB 1.1.c',
      'MTB 1.1.d',
      'MTB 1.2.c',
      'MTB 1.2.d',
      'MTB 1.3.a',
      'MTB 1.3.b',
      'MTB 1.3.c',
      'MTB 1.3.e',
      'MTB 1.4.a',
      'MTB 1.4.c'
    ],
    deliverables: [
      'Bản tổng hợp nhu cầu các bên (Học sinh, Chuyên viên tâm lý, Phụ huynh)',
      'Tập dữ liệu mẫu có nhãn về các mức độ cảm xúc (Biến số rời rạc: Bình thường, Căng thẳng nhẹ, Lo âu cao)',
      'Thiết kế kiến trúc hệ thống và quy tắc bảo vệ dữ liệu cá nhân',
      'Bài phân tích tình thế tiến thoái lưỡng nan về đạo đức (Bảo mật vs Cứu giúp khi nguy cấp)',
      'Bản đề xuất giải pháp cảnh báo sớm an toàn học đường'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Nghiên cứu bối cảnh & Phỏng vấn đối tượng',
        description: 'Tìm hiểu thực trạng áp lực học tập và các biểu hiện ngôn từ thường gặp khi học sinh stress.',
        studentTasks: [
          'Phỏng vấn gián tiếp hoặc khảo sát ẩn danh về tâm lý học đường',
          'Xác định rõ vai trò của AI: Là công cụ hỗ trợ sàng lọc sơ bộ, KHÔNG PHẢI bác sĩ tâm thần',
          'Sử dụng AI để phản biện lại các định kiến sai về bệnh tâm lý'
        ],
        suggestedOutputs: ['Bản báo cáo khảo sát tâm lý học đường', 'User Story cho học sinh và cán bộ tâm lý']
      },
      {
        phaseNumber: 2,
        title: 'Thu thập & Tổ chức dữ liệu biến số rời rạc',
        description: 'Thu thập và gán nhãn cho các mẫu câu văn bản theo thang đo cảm xúc (MTB 2.1.b).',
        studentTasks: [
          'Xây dựng bộ dữ liệu gồm ít nhất 30-50 câu ví dụ ẩn danh',
          'Phân loại theo biến rời rạc: [0: Tích cực, 1: Bình thường, 2: Lo âu, 3: Cần trợ giúp gấp]',
          'Vẽ biểu đồ phân bố tần suất các từ khóa cảnh báo (stress, kiệt sức, mất ngủ)'
        ],
        suggestedOutputs: ['Bảng dữ liệu Excel/CSV đã dán nhãn', 'Biểu đồ trực quan hóa dữ liệu rời rạc']
      },
      {
        phaseNumber: 3,
        title: 'Kiến trúc AI & Mô hình học có giám sát',
        description: 'Phân tích cách mô hình học có giám sát nhận diện từ khóa và ngữ cảnh cảm xúc (MTB 2.1.a).',
        studentTasks: [
          'Giải thích quy trình: Văn bản đầu vào -> Tiền xử lý tách từ -> Vector hóa -> Phân loại cảm xúc',
          'Xác định phần cứng và yêu cầu mã hóa đường truyền dữ liệu nhạy cảm'
        ],
        suggestedOutputs: ['Sơ đồ luồng thuật toán phân loại cảm xúc']
      },
      {
        phaseNumber: 4,
        title: 'Nghiên cứu Đạo đức & Luật bảo vệ quyền riêng tư',
        description: 'Giải quyết bài toán: Dữ liệu nhật ký/tin nhắn là quyền riêng tư tối thượng của trẻ em (MTB 1.3.c, 1.3.e).',
        studentTasks: [
          'Áp dụng quy định luật bảo vệ trẻ em trên môi trường mạng và quyền riêng tư quốc tế',
          'Đề xuất giải pháp giải quyết tình thế: Khi AI phát hiện bạn có ý định tiêu cực nguy hiểm thì thông báo cho ai và bảo mật thế nào?',
          'Xây dựng chiến lược chăm sóc wellbeing cho học sinh khi tiếp xúc với AI'
        ],
        suggestedOutputs: ['Bài luận xử lý tình thế đạo đức nan giải', 'Bộ quy tắc bảo mật dữ liệu học đường']
      },
      {
        phaseNumber: 5,
        title: 'Báo cáo giải pháp & Hoàn thiện hồ sơ',
        description: 'Đóng gói toàn bộ tài liệu nghiên cứu và thuyết trình giải pháp trước lớp.',
        studentTasks: [
          'Thiết kế giao diện mô phỏng (UI Prototype) thân thiện, ấm áp, không phán xét',
          'Slide thuyết trình bảo vệ đề tài trước hội đồng',
          'Cập nhật tiến độ vào folder nhóm trên hệ thống'
        ],
        suggestedOutputs: ['Slide báo cáo', 'Mockup giao diện ứng dụng', 'Hồ sơ nghiên cứu hoàn chỉnh']
      }
    ]
  },
  {
    id: 'topic-3',
    title: 'Chủ đề 3: Dr.Plant AI – Bác sĩ cây trồng cho nông nghiệp đô thị',
    shortName: 'Dr.Plant AI',
    tagline: 'Nhận diện bệnh cây trồng qua hình ảnh lá hỗ trợ vườn xanh ban công & trường học',
    description: 'Xây dựng một hệ thống AI hỗ trợ nhận diện tình trạng sức khỏe cây trồng qua hình ảnh lá (ví dụ: sâu bệnh, thiếu nước, thiếu dinh dưỡng...) nhằm hỗ trợ người dân trồng cây tại nhà, trường học, ban công, sân thượng,...',
    iconName: 'Leaf',
    colorScheme: {
      primary: '#16a34a',
      light: '#f0fdf4',
      border: '#bbf7d0',
      text: '#15803d'
    },
    targetUsers: 'Học sinh câu lạc bộ sinh học/môi trường, giáo viên stem, cư dân đô thị tự trồng rau sạch và hoa cảnh.',
    aiTechnologies: [
      'Thị giác máy tính (Computer Vision - CNN)',
      'Phân loại hình ảnh (Image Classification)',
      'Học máy có giám sát với dữ liệu ảnh (Supervised Learning)',
      'Mô hình AI mới nổi (Multimodal Vision LLM)'
    ],
    recommendedMTBIds: [
      'MTB 1.1.a',
      'MTB 1.1.b',
      'MTB 1.1.c',
      'MTB 1.1.d',
      'MTB 1.2.b',
      'MTB 1.2.f',
      'MTB 1.3.a',
      'MTB 1.3.b',
      'MTB 1.4.b',
      'MTB 1.4.c',
      'MTB 1.4.d'
    ],
    deliverables: [
      'User Story của người trồng cây tại đô thị và trường học',
      'Bộ dữ liệu ảnh lá cây phân loại theo các loại bệnh rời rạc (cháy lá, rệp sáp, vàng lá, khỏe mạnh)',
      'Sơ đồ kiến trúc phần cứng (Camera điện thoại -> Xử lý ảnh -> Mô hình Vision)',
      'Bản đánh giá tác động môi trường tích cực (giảm hóa chất, phát triển mảng xanh)',
      'Demo nhận diện hình ảnh qua mô hình thị giác và Slide báo cáo'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Khảo sát vườn trường & Nông nghiệp đô thị',
        description: 'Quan sát các loại cây trồng tại vườn trường hoặc nhà riêng, ghi nhận các loại bệnh lá phổ biến.',
        studentTasks: [
          'Phỏng vấn người chăm cây về các loại bệnh khó phát hiện bằng mắt thường',
          'Lập bảng User Story cho người mới tập trồng cây',
          'Dùng AI để phản biện và khoanh vùng loại cây khả thi (ví dụ: cà chua, rau cải, hoa hồng)'
        ],
        suggestedOutputs: ['Bảng khảo sát bệnh cây trồng', 'User Story chi tiết']
      },
      {
        phaseNumber: 2,
        title: 'Thu thập & Tổ chức dữ liệu ảnh lá cây',
        description: 'Chụp hoặc tổng hợp ảnh lá cây theo các trạng thái biến số rời rạc (MTB 2.1.b).',
        studentTasks: [
          'Chụp hoặc thu thập ít nhất 40-60 ảnh lá cây ở các góc độ và ánh sáng khác nhau',
          'Tổ chức thư mục dữ liệu: Lá khỏe mạnh, Bệnh nấm đốm, Bị úng nước, Thiếu dưỡng chất',
          'Vẽ biểu đồ số lượng mẫu ảnh của từng lớp'
        ],
        suggestedOutputs: ['Bộ dữ liệu ảnh có gắn nhãn khoa học', 'Biểu đồ phân bố dữ liệu huấn luyện']
      },
      {
        phaseNumber: 3,
        title: 'Thiết kế Kiến trúc Thị giác máy tính & Thử nghiệm AI',
        description: 'Khám phá mô hình Computer Vision hoặc Multimodal Vision AI (MTB 1.2.f, 2.1.a).',
        studentTasks: [
          'Phân tích yêu cầu camera, độ phân giải ảnh và tốc độ xử lý trên thiết bị di động',
          'Thử nghiệm khả năng nhận diện hình ảnh bằng công cụ AI thị giác (Teachable Machine / Gemini Vision)',
          'Đo lường các trường hợp ảnh bị mờ hoặc sai góc chụp'
        ],
        suggestedOutputs: ['Sơ đồ kiến trúc mô hình Computer Vision', 'Kết quả thử nghiệm mô hình thực tế']
      },
      {
        phaseNumber: 4,
        title: 'Tiêu chí đánh giá & Tác động môi trường',
        description: 'Đánh giá độ chính xác và vai trò của giải pháp trong phát triển bền vững (MTB 1.3.a, 1.4.b).',
        studentTasks: [
          'Xây dựng bộ tiêu chí: Tỷ lệ nhận diện đúng, thời gian phản hồi, độ hữu ích của hướng dẫn chữa bệnh',
          'Đề xuất vai trò cá nhân trong việc giảm thiểu sử dụng thuốc trừ sâu hóa học, bảo vệ môi trường đô thị',
          'Dự đoán xu hướng công nghệ Computer Vision trong tương lai (MTB 1.4.d)'
        ],
        suggestedOutputs: ['Bộ tiêu chí đánh giá mô hình AI', 'Báo cáo tác động môi trường và phát triển bền vững']
      },
      {
        phaseNumber: 5,
        title: 'Hoàn thiện Sản phẩm demo & Báo cáo cuối kỳ',
        description: 'Tổng hợp demo chẩn đoán lá cây và hoàn thiện hồ sơ dự án để giáo viên chấm điểm.',
        studentTasks: [
          'Thực hiện video ngắn chụp lá cây và nhận kết quả chẩn đoán kèm lời khuyên',
          'Chuẩn bị slide thuyết trình sinh động',
          'Nộp toàn bộ đường link minh chứng vào thư mục nhóm'
        ],
        suggestedOutputs: ['Video demo nhận diện', 'Slide thuyết trình dự án', 'Hồ sơ nộp bài đầy đủ']
      }
    ]
  }
];

export const ALL_MTB_ITEMS: MTBItem[] = [
  {
    id: 'MTB 1.1.a',
    title: 'Thực hiện được các cuộc phỏng vấn với các bên liên quan và tổng hợp dữ liệu để xây dựng một bản tóm tắt nhu cầu người dùng (user story) chi tiết.',
    criterionTitle: 'Thực hiện phỏng vấn & xây dựng user story',
    competencyDescription: 'Năng lực giao tiếp, thu thập và phân tích nhu cầu người dùng, thể hiện qua: Phỏng vấn (xác định các nhóm bên liên quan, đặt câu hỏi mở và đào sâu); Tổng hợp (phân loại câu trả lời theo nhóm nhu cầu, nhận ra điểm chung và mâu thuẫn); User story (đúng cấu trúc "Là… tôi muốn… để…", có tiêu chí chấp nhận và sắp xếp ưu tiên).',
    steps: [
      'Bước 1: Xác định đầy đủ các nhóm bên liên quan đến dự án (người dùng chính, người dùng phụ, người ra quyết định hoặc hỗ trợ).',
      'Bước 2: Thiết kế bộ câu hỏi mở và câu hỏi đào sâu ("Vì sao?", "Như thế nào?") để khai thác nhu cầu và khó khăn thực tế.',
      'Bước 3: Thực hiện phỏng vấn, ghi chép và phân loại các câu trả lời theo từng nhóm nhu cầu; chỉ ra các điểm chung và sự khác biệt giữa các bên.',
      'Bước 4: Chuyển dữ liệu thành User Story hoàn chỉnh theo cấu trúc: "Là [đối tượng]... Tôi muốn [tính năng]... Để có thể [mục đích]...", kèm tiêu chí chấp nhận và sắp xếp thứ tự ưu tiên.'
    ],
    competencies: [
      'Phỏng vấn sâu bên liên quan',
      'Phân tích & tổng hợp dữ liệu',
      'Xây dựng User Story chuẩn',
      'Tiêu chí chấp nhận (Acceptance Criteria)'
    ],
    rubric: {
      level4: 'Phỏng vấn đủ các nhóm bên liên quan (người dùng chính, phụ, người ra quyết định); bộ câu hỏi mở có đào sâu; Dữ liệu phân loại theo nhóm nhu cầu, chỉ ra nhu cầu chung và mâu thuẫn giữa các bên; User story đúng cấu trúc, có tiêu chí chấp nhận, sắp xếp mức ưu tiên kèm lý do và truy xuất được về dữ liệu phỏng vấn.',
      level3: 'Phỏng vấn được ít nhất 2 nhóm bên liên quan chính; câu hỏi bám sát vấn đề dự án; Ghi chép đầy đủ, nhóm được các nhu cầu chính; User story đúng cấu trúc, nêu đủ 3 thành phần phản ánh đúng dữ liệu đã thu.',
      level2: 'Chỉ phỏng vấn 1 nhóm đối tượng, hoặc câu hỏi chủ yếu đóng/chung chung; Chỉ liệt kê lại câu trả lời chưa phân loại; User story thiếu 1 trong 3 thành phần hoặc chưa gắn với dữ liệu phỏng vấn.',
      level1: 'Chưa thực hiện hoặc câu hỏi không liên quan dự án; Không có dữ liệu hoặc dữ liệu không sử dụng được; Chưa viết được user story.'
    },
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.b',
    title: 'Khảo sát và đánh giá được một số công cụ AI mới nổi dựa trên yêu cầu tài nguyên tính toán, khả năng triển khai và phạm vi ứng dụng để lựa chọn công cụ phù hợp với mục tiêu của dự án.',
    criterionTitle: 'Khảo sát đánh giá một số công cụ AI dựa vào các tiêu chí',
    competencyDescription: 'Năng lực tìm hiểu, đánh giá và lựa chọn công nghệ, thể hiện qua: Khảo sát thông tin từ nguồn đáng tin cậy và thử dùng thực tế; Áp dụng 3 tiêu chí (tài nguyên tính toán, khả năng triển khai, phạm vi ứng dụng) để so sánh bằng căn cứ cụ thể; Lựa chọn công cụ tối ưu và lập luận sự phù hợp.',
    steps: [
      'Bước 1: Tìm kiếm thông tin từ các nguồn uy tín về ít nhất 2–3 công cụ AI mới nổi phù hợp với hướng giải quyết của đề tài.',
      'Bước 2: Trải nghiệm và thử nghiệm thực tế từng công cụ với bài toán giả định của nhóm.',
      'Bước 3: Đánh giá và lập bảng so sánh ưu – nhược điểm dựa trên đủ 3 tiêu chí: (1) Tài nguyên tính toán, (2) Khả năng triển khai, (3) Phạm vi ứng dụng.',
      'Bước 4: Ra quyết định lựa chọn công cụ AI tối ưu nhất cho dự án, lập luận gắn với mục tiêu và giải thích lý do không chọn các công cụ còn lại.'
    ],
    competencies: [
      'Khảo sát công cụ AI mới nổi',
      'Đánh giá theo 3 tiêu chí kỹ thuật',
      'Trải nghiệm thử nghiệm thực tế',
      'Lập luận ra quyết định công nghệ'
    ],
    rubric: {
      level4: 'Tìm hiểu từ 3 công cụ AI mới nổi trở lên từ nguồn đáng tin cậy và có thử dùng thực tế; Đánh giá đủ 3 tiêu chí bằng thang điểm cụ thể có minh chứng, so sánh rõ ưu – nhược điểm; Chọn công cụ tối ưu, lập luận gắn trực tiếp mục tiêu dự án và giải thích vì sao không chọn các công cụ còn lại.',
      level3: 'Tìm hiểu được 2–3 công cụ AI mới nổi có ghi nguồn; Đánh giá đủ 3 tiêu chí cho từng công cụ, nêu được ưu – nhược điểm chính; Chọn được công cụ phù hợp và nêu được lý do liên hệ với mục tiêu dự án.',
      level2: 'Chỉ tìm hiểu 1–2 công cụ hoặc thông tin chưa rõ nguồn; Bỏ sót 1–2 tiêu chí hoặc nhận xét cảm tính ("tốt", "dễ dùng") không có căn cứ; Có chọn công cụ nhưng lý do chưa liên hệ mục tiêu dự án.',
      level1: 'Chưa khảo sát hoặc công cụ được chọn không phải AI/không liên quan; Đánh giá sai lệch; Không lựa chọn được công cụ hoặc lựa chọn không có lý do.'
    },
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.c',
    title: 'Thiết kế và quản lý được một quy trình làm việc theo phương pháp Agile, bao gồm việc nhận diện và lên kế hoạch xử lý các rủi ro tiềm ẩn trong dự án.',
    criterionTitle: 'Thiết kế quy trình Agile & quản lý rủi ro',
    competencyDescription: 'Năng lực lập kế hoạch và quản lý dự án theo phương pháp Agile, thể hiện qua: Thiết kế bảng công việc (Trello/...) có backlog, chia sprint theo mốc thời gian, cột trạng thái, phân công người phụ trách và rà soát sau mỗi sprint; Nhận diện rủi ro thuộc nhiều nhóm; Xây dựng kế hoạch phòng ngừa và phương án xử lý rủi ro.',
    steps: [
      'Bước 1: Thiết lập bảng công việc theo phương pháp Agile (Product Backlog, chia thành các Sprint theo từng tuần rõ ràng).',
      'Bước 2: Phân chia cột trạng thái (Cần làm – Đang làm – Hoàn thành) và phân công cụ thể người phụ trách cho từng thẻ việc.',
      'Bước 3: Nhận diện ít nhất 3–4 rủi ro tiềm ẩn thuộc các nhóm (kỹ thuật, con người, thời gian, nguồn lực), đánh giá xác suất và mức độ ảnh hưởng.',
      'Bước 4: Xây dựng phương án phòng ngừa, giải pháp dự phòng cho mỗi rủi ro; tổ chức buổi họp rà soát (Sprint Review) để cập nhật tiến độ thực tế.'
    ],
    competencies: [
      'Quản lý dự án Agile/Scrum',
      'Thiết kế Sprint & Backlog',
      'Nhận diện đa nhóm rủi ro',
      'Kế hoạch ứng phó & rà soát định kỳ'
    ],
    rubric: {
      level4: 'Bảng công việc thể hiện đủ các yếu tố Agile: backlog, chia sprint có mốc thời gian, cột trạng thái (Cần làm – Đang làm – Hoàn thành), phân công rõ người phụ trách, có buổi rà soát và điều chỉnh sau mỗi sprint; Nhận diện từ 4 rủi ro trở lên đủ các nhóm; Mỗi rủi ro có biện pháp phòng ngừa, phương án dự phòng và người chịu trách nhiệm, có minh chứng cập nhật khi rủi ro xảy ra.',
      level3: 'Bảng công việc có backlog, chia sprint, cột trạng thái và phân công người phụ trách, được cập nhật trong quá trình làm; Nhận diện được 2–3 rủi ro chính liên quan trực tiếp đến dự án; Mỗi rủi ro có ít nhất 1 biện pháp xử lý cụ thể.',
      level2: 'Có danh sách công việc nhưng thiếu yếu tố Agile (không chia sprint, không cập nhật trạng thái, phân công chưa rõ); Chỉ nêu 1 rủi ro hoặc rủi ro chung chung; Biện pháp xử lý chung chung ("cố gắng hơn") hoặc chưa có.',
      level1: 'Không có bảng công việc hoặc chỉ là danh sách việc rời rạc không thứ tự, thời hạn; Không nhận diện được rủi ro; Không có kế hoạch xử lý.'
    },
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.d',
    title: 'Sử dụng được AI để tự phản biện về các giả định ban đầu của mình trong giai đoạn lập kế hoạch.',
    criterionTitle: 'Sử dụng AI để tự phản biện giả định',
    competencyDescription: 'Năng lực tư duy phản biện và tự đánh giá với sự hỗ trợ của AI, thể hiện qua: Nhận ra và phát biểu rõ các giả định cốt lõi trong kế hoạch; Viết câu lệnh yêu cầu AI đóng vai người phản biện chỉ ra điểm yếu và bằng chứng trái chiều; Tự cân nhắc phản hồi của AI và điều chỉnh kế hoạch so sánh trước – sau.',
    steps: [
      'Bước 1: Liệt kê rõ từ 2 giả định cốt lõi trong kế hoạch ban đầu của nhóm (về nhu cầu người dùng, tính khả thi giải pháp, hoặc nguồn lực thực hiện).',
      'Bước 2: Soạn prompt yêu cầu AI đóng vai chuyên gia phản biện phản biện sắc bén, chỉ ra điểm yếu, bằng chứng trái chiều và các rủi ro tiềm ẩn.',
      'Bước 3: Đặt tiếp các câu hỏi đào sâu để AI giải thích rõ nguyên nhân và bằng chứng phản biện.',
      'Bước 4: Nhóm thảo luận, tự đánh giá phản hồi (chấp nhận hoặc bác bỏ có lý do) và thực hiện điều chỉnh kế hoạch, lập bảng so sánh trước và sau phản biện.'
    ],
    competencies: [
      'Xác định giả định cốt lõi',
      'Thiết kế prompt phản biện đào sâu',
      'Tư duy đánh giá độc lập',
      'Điều chỉnh kế hoạch trước – sau'
    ],
    rubric: {
      level4: 'Nêu rõ từ 2 giả định cốt lõi của kế hoạch (về người dùng, giải pháp, nguồn lực); Prompt yêu cầu AI đóng vai người phản biện, chỉ ra điểm yếu, bằng chứng trái chiều và rủi ro, có prompt hỏi tiếp để đào sâu; Nhóm tự đánh giá lại phản hồi của AI (chấp nhận/bác bỏ có lý do), điều chỉnh kế hoạch cụ thể và so sánh được kế hoạch trước – sau.',
      level3: 'Nêu rõ được 1 giả định cốt lõi của kế hoạch; Prompt yêu cầu AI phản biện/chỉ ra điểm yếu của giả định; Ghi nhận phản hồi của AI và điều chỉnh được ít nhất 1 điểm trong kế hoạch, nêu rõ điều chỉnh gì.',
      level2: 'Giả định còn mơ hồ hoặc không phải giả định cốt lõi; Prompt chỉ hỏi thông tin/xin xác nhận ("Ý tưởng này có hay không?") chứ chưa yêu cầu phản biện; Có ghi lại phản hồi nhưng chưa điều chỉnh kế hoạch hoặc chép nguyên ý kiến AI mà không tự cân nhắc.',
      level1: 'Không xác định được giả định; Không sử dụng AI hoặc không có minh chứng prompt; Không có điều chỉnh.'
    },
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.a',
    title: 'Thiết kế được một chuỗi các câu lệnh (prompt chain) phức tạp để dẫn dắt AI thực hiện một nhiệm vụ nhiều bước, đồng thời tối ưu hóa các câu lệnh đó để giảm thiểu lỗi kỹ thuật.',
    criterionTitle: 'Thiết kế prompt chain phức tạp',
    competencyDescription: 'Năng lực thiết kế và tối ưu câu lệnh cho AI (prompt engineering), thể hiện qua: Chia nhiệm vụ phức tạp thành chuỗi các bước logic tuần tự; Chỉ định định dạng đầu ra để kết quả bước trước làm đầu vào bước sau; Tối ưu hóa prompt qua nhiều vòng thử nghiệm, ghi nhật ký gỡ lỗi; Vận hành chuỗi ổn định giảm lỗi.',
    steps: [
      'Bước 1: Phân rã nhiệm vụ phức tạp thành một chuỗi 3–4 bước logic tuần tự có vai trò và mục tiêu rõ ràng.',
      'Bước 2: Viết câu lệnh cho từng bước, quy định định dạng đầu ra chuẩn (bảng/JSON/danh sách) để truyền liền mạch làm đầu vào cho bước tiếp theo.',
      'Bước 3: Vận hành chạy thử nghiệm chuỗi câu lệnh, phát hiện các lỗi phát sinh (mất ngữ cảnh, sai định dạng, câu trả lời mơ hồ).',
      'Bước 4: Thực hiện tối ưu hóa prompt qua ít nhất 2 vòng thử nghiệm, ghi nhật ký chi tiết: Lỗi gặp phải – Cách sửa câu lệnh – Kết quả cải tiến.'
    ],
    competencies: [
      'Kỹ thuật Prompt Chain đa bước',
      'Chuẩn hóa định dạng Input/Output',
      'Gỡ lỗi & tối ưu ngữ cảnh AI',
      'Nhật ký cải tiến Prompt Engineering'
    ],
    rubric: {
      level4: 'Cấu trúc chuỗi từ 4 bước trở lên, mỗi bước có vai trò rõ ràng; đầu ra bước trước được định dạng và truyền làm đầu vào bước sau (có chỉ định định dạng như bảng/JSON/danh sách); Có ít nhất 2 vòng cải tiến prompt, ghi lại lỗi gặp phải – cách sửa – kết quả sau sửa; Chuỗi chạy ổn định, kết quả cuối đáp ứng đầy đủ nhiệm vụ, lỗi giảm rõ rệt so với phiên bản đầu.',
      level3: 'Cấu trúc chuỗi đủ 3 bước, thứ tự hợp lý; các bước có liên kết với nhau (bước sau sử dụng kết quả bước trước); Có ít nhất 1 vòng cải tiến prompt, chỉ ra lỗi và cách sửa; Chuỗi hoàn thành nhiệm vụ, còn lỗi nhỏ không ảnh hưởng kết quả chính.',
      level2: 'Cấu trúc chuỗi chỉ có 1–2 bước hoặc các bước rời rạc không truyền kết quả; Có sửa prompt nhưng không ghi lại lỗi/lý do sửa hoặc sửa không cải thiện kết quả; Hoàn thành một phần nhiệm vụ, còn lỗi mất ngữ cảnh, sai định dạng.',
      level1: 'Chỉ có 1 câu lệnh đơn lẻ hoặc không thiết kế được chuỗi; Không có tối ưu hóa; AI không hoàn thành được nhiệm vụ.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.b',
    title: 'Sử dụng được một chuỗi các công cụ AI chuyên biệt một cách tuần tự để hoàn thành một nhiệm vụ phức tạp.',
    criterionTitle: 'Sử dụng chuỗi công cụ AI tuần tự',
    competencyDescription: 'Năng lực phối hợp nhiều công cụ AI để giải quyết nhiệm vụ phức tạp, thể hiện qua: Phân tích nhiệm vụ và chọn công cụ AI chuyên biệt phù hợp cho từng bước; Xây dựng sơ đồ quy trình tuần tự kết nối đầu ra công cụ trước với đầu vào công cụ sau; Hoàn thành sản phẩm cuối và đề xuất cải tiến quy trình.',
    steps: [
      'Bước 1: Phân tích nhiệm vụ tổng thể thành các giai đoạn chuyên biệt và chọn công cụ AI phù hợp nhất cho từng khâu (ví dụ: ChatGPT -> DALL-E/Midjourney -> ElevenLabs -> CapCut).',
      'Bước 2: Vẽ sơ đồ luồng quy trình công việc tuần tự thể hiện rõ sự kết nối đầu ra – đầu vào giữa các công cụ.',
      'Bước 3: Thực hiện quy trình theo thứ tự: lấy kết quả công cụ trước, kiểm tra tính chính xác và chỉnh sửa trước khi nạp vào công cụ tiếp theo.',
      'Bước 4: Hoàn thiện sản phẩm cuối cùng, so sánh chất lượng với phương pháp truyền thống và đưa ra nhận xét tối ưu quy trình.'
    ],
    competencies: [
      'Phối hợp đa công cụ AI',
      'Thiết kế sơ đồ quy trình tuần tự',
      'Xử lý & kiểm thử dữ liệu trung gian',
      'Đánh giá hiệu quả phối hợp công nghệ'
    ],
    rubric: {
      level4: 'Sử dụng từ 3 công cụ AI chuyên biệt trở lên, giải thích được vì sao chọn từng công cụ cho từng bước; Sơ đồ quy trình rõ ràng, đầu ra của công cụ trước được xử lý/chỉnh sửa trước khi đưa vào công cụ sau; Sản phẩm cuối hoàn chỉnh chất lượng cao hơn so với dùng một công cụ; có nhận xét hiệu quả và đề xuất cải tiến quy trình.',
      level3: 'Sử dụng 2–3 công cụ AI chuyên biệt phù hợp với từng bước; Mô tả được trình tự sử dụng, đầu ra công cụ trước được dùng cho công cụ sau; Hoàn thành nhiệm vụ với sản phẩm cuối hoàn chỉnh.',
      level2: 'Chỉ dùng 1 công cụ hoặc dùng nhiều công cụ nhưng không phù hợp từng bước; Các công cụ dùng độc lập không có mối liên kết đầu ra – đầu vào; Hoàn thành một phần nhiệm vụ.',
      level1: 'Không sử dụng công cụ AI; Không có quy trình tuần tự; Không hoàn thành nhiệm vụ.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.c',
    title: 'Sử dụng được công cụ AI để tạo ra một sản phẩm video có nội dung gây ảnh hưởng đến một nhóm đối tượng cụ thể.',
    criterionTitle: 'Tạo video bằng AI với nội dung gây ảnh hưởng',
    competencyDescription: 'Năng lực sáng tạo nội dung số và truyền thông có mục đích với AI, thể hiện qua: Phân tích đối tượng và xác định thông điệp chính; Xây dựng kịch bản video chặt chẽ và dùng AI tạo hình ảnh, âm thanh, phụ đề; Thu thập phản hồi thực tế và điều chỉnh video.',
    steps: [
      'Bước 1: Xác định rõ nhóm đối tượng người xem mục tiêu (độ tuổi, tâm lý, vấn đề quan tâm) và lựa chọn một thông điệp cốt lõi giàu sức thuyết phục.',
      'Bước 2: Soạn thảo kịch bản video hoàn chỉnh theo bố cục 4 phần: Mở đầu thu hút – Thân bài phát triển vấn đề – Kết luận đúc kết – Kêu gọi hành động (Call To Action).',
      'Bước 3: Sử dụng các công cụ AI để sinh hình ảnh, giọng đọc lồng tiếng, hiệu ứng và phụ đề; thực hiện biên tập hậu kỳ và sửa lỗi phát âm/hình ảnh do AI tạo ra.',
      'Bước 4: Trình chiếu thử nghiệm hoặc lấy khảo sát phản hồi từ người xem thực tế, từ đó tinh chỉnh video để tối đa hóa mức độ ảnh hưởng.'
    ],
    competencies: [
      'Phân tích đối tượng truyền thông',
      'Kịch bản video truyền cảm hứng 4 phần',
      'Sản xuất video AI đa phương thức',
      'Đo lường tác động & phản hồi người xem'
    ],
    rubric: {
      level4: 'Xác định rõ đối tượng (độ tuổi, đặc điểm, mối quan tâm) và một thông điệp chính; lựa chọn cách kể chuyện, hình ảnh, âm thanh phù hợp; Kịch bản có mở đầu – thân – kết và lời kêu gọi hành động; hình ảnh, âm thanh, phụ đề đồng bộ, có chỉnh sửa không giữ nguyên lỗi của AI; Thu thập phản hồi thực tế từ đối tượng (khảo sát, bình luận) và điều chỉnh video dựa trên phản hồi.',
      level3: 'Xác định được đối tượng và thông điệp chính; nội dung phù hợp với đối tượng; Video hoàn chỉnh có bố cục rõ ràng, hình ảnh và âm thanh khớp nội dung; Nêu được tác động mong muốn lên đối tượng (thay đổi nhận thức/hành động gì).',
      level2: 'Đối tượng chung chung ("mọi người") hoặc thông điệp chưa rõ; Video ngắn, rời rạc, còn lỗi rõ của AI (hình méo, giọng đọc sai, phụ đề lệch); Chưa xác định được tác động mong muốn.',
      level1: 'Không xác định đối tượng; nội dung không phù hợp; Không tạo được video hoặc video không xem được; Không có tác động.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.d',
    title: 'Vận dụng được những ý tưởng mới để đồng kiến tạo với AI một giải pháp có tính nguyên bản về mặt áp dụng.',
    criterionTitle: 'Đồng sáng tạo ý tưởng mới với AI',
    competencyDescription: 'Năng lực tư duy sáng tạo và đồng kiến tạo giải pháp với AI, thể hiện qua: Đề xuất ý tưởng mới và so sánh với giải pháp hiện có; Trao đổi nhiều vòng với AI để chọn lọc, phát triển ý tưởng thay vì sao chép; Khẳng định dấu ấn cá nhân và tùy biến giải pháp cho bối cảnh thực tế.',
    steps: [
      'Bước 1: Tìm kiếm, khảo sát và so sánh với ít nhất 2 giải pháp hiện có trên thị trường để tìm ra điểm hạn chế hoặc góc tiếp cận mới.',
      'Bước 2: Tương tác nhiều vòng câu lệnh với AI, chủ động đặt gợi ý, phản biện và mở rộng các phương án thay vì sao chép nguyên văn câu trả lời.',
      'Bước 3: Lập bảng phân định rõ ràng: phần nào do chính nhóm tự đề xuất, phần nào do AI gợi ý hỗ trợ.',
      'Bước 4: Điều chỉnh giải pháp để đảm bảo tính nguyên bản và gắn kết trực tiếp với bối cảnh thực tế của học đường hoặc cộng đồng xung quanh.'
    ],
    competencies: [
      'Khảo sát so sánh giải pháp hiện có',
      'Đồng kiến tạo nhiều vòng với AI',
      'Dấu ấn cá nhân & tư duy độc lập',
      'Tính nguyên bản trong ứng dụng thực tế'
    ],
    rubric: {
      level4: 'Đưa ra ý tưởng mới, có cách áp dụng khác biệt rõ so với các giải pháp hiện có (đã tìm hiểu và so sánh với ít nhất 2 giải pháp tương tự); Có nhiều vòng trao đổi với AI, người học chủ động định hướng, chọn lọc, kết hợp và phát triển ý tưởng (không chép nguyên văn AI); Chỉ rõ phần nào do người học đề xuất, phần nào do AI gợi ý; giải pháp phù hợp bối cảnh thực tế địa phương/nhà trường.',
      level3: 'Ý tưởng mới, có ít nhất một điểm áp dụng khác biệt so với giải pháp hiện có; Có minh chứng trao đổi với AI và chỉnh sửa ý tưởng từ gợi ý của AI; Nêu được đóng góp của bản thân trong giải pháp.',
      level2: 'Ý tưởng gần giống giải pháp có sẵn, ít điểm mới; Chủ yếu dùng ý tưởng AI đưa ra, chỉnh sửa rất ít; Chưa phân biệt được đóng góp của bản thân và của AI.',
      level1: 'Sao chép hoàn toàn giải pháp có sẵn hoặc của AI; Không có minh chứng tương tác với AI; Không có dấu ấn cá nhân.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.e',
    title: 'Phân tích và đánh giá được ranh giới linh hoạt giữa vai trò của con người và vai trò của AI trong một dự án đồng sáng tạo.',
    criterionTitle: 'Phân tích ranh giới người – AI',
    competencyDescription: 'Năng lực phân tích và đánh giá mối quan hệ hợp tác người – AI, thể hiện qua: Phân định vai trò người và AI ở từng giai đoạn dự án; Nhận ra thời điểm ranh giới vai trò dịch chuyển linh hoạt và giải thích lý do; Đánh giá hiệu quả phối hợp và đề xuất cách phân vai tốt hơn.',
    steps: [
      'Bước 1: Liệt kê chi tiết và phân định vai trò giữa con người và AI trong từng giai đoạn dự án (lên ý tưởng, triển khai kỹ thuật, kiểm tra kết quả, ra quyết định).',
      'Bước 2: Nhận diện những thời điểm mà ranh giới vai trò dịch chuyển (khi nào AI dẫn dắt tạo bản thảo sơ bộ, khi nào con người nắm quyền kiểm soát đạo đức và quyết định cuối).',
      'Bước 3: Lấy ví dụ minh chứng cụ thể từ chính quá trình làm việc của nhóm để giải thích lý do con người phải chịu trách nhiệm sau cùng.',
      'Bước 4: Đánh giá những ưu điểm và hạn chế trong sự phối hợp người – AI, từ đó đề xuất cách phân công vai trò tối ưu hơn cho các dự án sau.'
    ],
    competencies: [
      'Phân định vai trò người và máy',
      'Ranh giới linh hoạt trong đồng sáng tạo',
      'Trách nhiệm ra quyết định của con người',
      'Đánh giá hiệu quả hợp tác người – AI'
    ],
    rubric: {
      level4: 'Phân định cụ thể vai trò của người và AI ở từng giai đoạn dự án (ý tưởng, thực hiện, kiểm tra, ra quyết định); Chỉ ra được những thời điểm vai trò thay đổi và lý do (AI dẫn dắt khi tạo bản nháp, con người dẫn dắt khi quyết định/đánh giá đạo đức) có ví dụ từ chính dự án; Đánh giá hiệu quả sự phối hợp (điểm được/chưa được) và đề xuất cách phân vai tốt hơn cho dự án sau.',
      level3: 'Nêu rõ vai trò của người và AI trong dự án; Chỉ ra được ít nhất 1 tình huống ranh giới vai trò thay đổi, có ví dụ từ dự án; Nhận xét được ưu điểm/hạn chế của sự phối hợp.',
      level2: 'Chỉ liệt kê việc người làm và việc AI làm; Coi vai trò là cố định chưa thấy sự thay đổi; ví dụ chung chung không từ dự án; Chưa có nhận xét.',
      level1: 'Không phân biệt được vai trò hoặc nhận định sai (ví dụ: AI quyết định mọi việc); Không đề cập ranh giới; Không có đánh giá.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.f',
    title: 'Khám phá và thử nghiệm được các tính năng của một mô hình công nghệ AI mới nổi.',
    criterionTitle: 'Khám phá & thử nghiệm công nghệ AI mới nổi',
    competencyDescription: 'Năng lực khám phá, thử nghiệm và tự học công nghệ mới, thể hiện qua: Tự tìm hiểu tài liệu chính thức của mô hình AI mới nổi; Thiết kế thử nghiệm có kế hoạch ở nhiều tình huống (kể cả tình huống khó); Đánh giá điểm mạnh, hạn chế và đề xuất khả năng ứng dụng.',
    steps: [
      'Bước 1: Tra cứu tài liệu kỹ thuật hoặc thông cáo chính thức của mô hình AI mới nổi, lập danh sách các tính năng công nghệ chủ chốt.',
      'Bước 2: Lập kế hoạch thử nghiệm bài bản (mục đích kiểm chứng – phương pháp tiến hành – kết quả kỳ vọng) cho ít nhất 2–4 tính năng.',
      'Bước 3: Thực hiện thử nghiệm trên nhiều tình huống dữ liệu khác nhau, đặc biệt là các tình huống khó, dữ liệu nhiễu hoặc trường hợp ngoại lệ.',
      'Bước 4: Lưu trữ ảnh chụp minh chứng đầu vào/đầu ra, tổng kết điểm mạnh – điểm yếu và đề xuất giải pháp ứng dụng vào sản phẩm dự án.'
    ],
    competencies: [
      'Tự học công nghệ AI mới',
      'Thiết kế kế hoạch kiểm thử đa tình huống',
      'Thử nghiệm tình huống khó & ngoại lệ',
      'Minh chứng thực nghiệm & đề xuất ứng dụng'
    ],
    rubric: {
      level4: 'Tìm hiểu tài liệu/giới thiệu chính thức của mô hình, lập danh sách các tính năng chính; Thiết kế thử nghiệm có kế hoạch (mục đích – cách làm – kết quả mong đợi) cho từ 4 tính năng trở lên, có thử ở các tình huống khác nhau kể cả tình huống khó; Ghi chép kết quả có minh chứng (ảnh chụp, đầu ra), rút ra điểm mạnh, hạn chế và đề xuất ứng dụng vào dự án.',
      level3: 'Xác định được các tính năng chính của mô hình; Thử nghiệm có trình tự cho 2–3 tính năng chính, ghi lại kết quả; Nêu được điểm mạnh và hạn chế của mô hình.',
      level2: 'Chỉ biết đến 1–2 tính năng cơ bản; Thử ngẫu nhiên không có kế hoạch, không ghi chép kết quả; Nhận xét cảm tính chưa có căn cứ.',
      level1: 'Không tìm hiểu mô hình hoặc chọn mô hình không phải công nghệ AI mới nổi; Không thực hiện thử nghiệm; Không có đánh giá.'
    },
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.a',
    title: 'Xây dựng được một bộ tiêu chí đánh giá riêng biệt, phù hợp với một loại AI cụ thể và mục tiêu của dự án.',
    criterionTitle: 'Xây dựng bộ tiêu chí đánh giá AI',
    competencyDescription: 'Năng lực xây dựng công cụ đánh giá cho hệ thống AI, thể hiện qua: Hiểu đặc thù của loại AI để xác định tiêu chí phù hợp; Xây dựng bộ tiêu chí bao quát kỹ thuật, trải nghiệm người dùng và đạo đức/an toàn; Mô tả mỗi tiêu chí bằng thang điểm cụ thể có trọng số và cách kiểm tra.',
    steps: [
      'Bước 1: Phân tích đặc thù của loại AI trong dự án (Chatbot hỗ trợ học tập, Hệ thống phân loại cảm xúc, hay Mô hình thị giác máy tính nhận diện bệnh lá).',
      'Bước 2: Xây dựng danh mục các tiêu chí đánh giá bao quát đủ 3 khía cạnh: (1) Kỹ thuật, (2) Trải nghiệm người dùng, (3) Đạo đức & An toàn.',
      'Bước 3: Mô tả thang điểm hoặc mức độ cụ thể cho từng tiêu chí để có thể chấm điểm định lượng (không để tiêu chí mơ hồ kiểu "tốt" hay "hay").',
      'Bước 4: Phân bổ trọng số tỷ lệ phần trăm cho từng tiêu chí và quy định phương thức kiểm tra thực tế.'
    ],
    competencies: [
      'Thiết kế công cụ đánh giá AI',
      'Bộ tiêu chí 3 trụ cột (Kỹ thuật - UX - Đạo đức)',
      'Thang đo định lượng khách quan',
      'Phân bổ trọng số kiểm thử'
    ],
    rubric: {
      level4: 'Bộ tiêu chí gắn với đặc thù của loại AI (ví dụ: AI tạo ảnh – độ sắc nét, đúng mô tả; chatbot – độ chính xác, an toàn) và bao quát toàn bộ mục tiêu dự án; Từ 5 tiêu chí trở lên bao gồm cả kỹ thuật, trải nghiệm người dùng và đạo đức/an toàn; Mỗi tiêu chí có mô tả mức độ hoặc thang điểm cụ thể, có trọng số và cách kiểm tra rõ ràng.',
      level3: 'Tiêu chí liên quan đến loại AI và mục tiêu chính của dự án; Có 3–4 tiêu chí bao gồm cả kỹ thuật và người dùng; Mỗi tiêu chí có mô tả rõ ràng, có thể dùng để đánh giá.',
      level2: 'Tiêu chí chung chung có thể dùng cho mọi loại AI, chưa gắn với mục tiêu dự án; Chỉ có 1–2 tiêu chí hoặc thiếu nhóm tiêu chí quan trọng; Tiêu chí khó đo ("tốt", "hay"), không có mức độ.',
      level1: 'Tiêu chí không liên quan đến loại AI/dự án; Không xây dựng được tiêu chí; Không có khả năng đo lường.'
    },
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.b',
    title: 'Đánh giá phản biện được một thiết kế AI dựa trên các tiêu chí đã xây dựng, nhu cầu người dùng và tác động tiềm năng trong tương lai.',
    criterionTitle: 'Đánh giá phản biện thiết kế AI',
    competencyDescription: 'Năng lực đánh giá phản biện và dự báo tác động của thiết kế AI, thể hiện qua: Sử dụng bộ tiêu chí đã xây dựng để đánh giá có minh chứng; Đối chiếu thiết kế với các user story; Dự đoán tác động tích cực – tiêu cực, ngắn hạn – dài hạn và đề xuất cải tiến.',
    steps: [
      'Bước 1: Sử dụng bộ tiêu chí (đã xây dựng tại MTB 1.3.a) để chấm điểm và đánh giá chi tiết thiết kế AI của nhóm, mỗi điểm số kèm minh chứng rõ ràng.',
      'Bước 2: Lập bảng đối chiếu từng tính năng của sản phẩm với từng User Story của người dùng đã thu thập ban đầu để xác định mức độ đáp ứng.',
      'Bước 3: Dự đoán các tác động tiềm năng trong tương lai: cả tác động tích cực và tiêu cực, trong ngắn hạn và dài hạn đến nhiều nhóm đối tượng.',
      'Bước 4: Đề xuất các giải pháp nâng cấp cụ thể để hoàn thiện thiết kế sản phẩm trong phiên bản tiếp theo.'
    ],
    competencies: [
      'Đánh giá phản biện có minh chứng',
      'Đối chiếu chuẩn User Story',
      'Dự báo tác động đa chiều tương lai',
      'Đề xuất cải tiến thiết kế khả thi'
    ],
    rubric: {
      level4: 'Đánh giá thiết kế theo tất cả tiêu chí đã xây dựng, mỗi nhận định có minh chứng cụ thể; Đối chiếu thiết kế với từng user story chỉ ra nhu cầu đã đáp ứng/chưa đáp ứng; Dự đoán cả tác động tích cực và tiêu cực, ngắn hạn và dài hạn với nhiều nhóm đối tượng; Đề xuất cải tiến cụ thể cho thiết kế.',
      level3: 'Đánh giá theo các tiêu chí chính đã xây dựng có lập luận; Liên hệ được thiết kế với các nhu cầu chính của người dùng; Dự đoán được ít nhất 1 tác động tích cực và 1 tác động tiêu cực có lý giải.',
      level2: 'Chỉ đánh giá một vài tiêu chí, nhận xét chưa có minh chứng; Chưa liên hệ với nhu cầu người dùng; Chỉ nêu một chiều (chỉ tích cực hoặc chỉ tiêu cực) hoặc chung chung.',
      level1: 'Chỉ mô tả thiết kế không đánh giá; Không đề cập nhu cầu người dùng; Không có dự báo tác động tương lai.'
    },
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.c',
    title: 'Áp dụng được các quy định của luật pháp quốc tế về quyền riêng tư để phản biện một hệ thống AI.',
    criterionTitle: 'Áp dụng luật quyền riêng tư quốc tế',
    competencyDescription: 'Năng lực hiểu biết pháp luật và phản biện hệ thống AI về quyền riêng tư, thể hiện qua: Nêu đúng các nguyên tắc, điều khoản cơ bản của luật quốc tế (GDPR: sự đồng ý, tối thiểu hóa dữ liệu, quyền được xóa dữ liệu); Phân tích hệ thống thu thập dữ liệu gì, dùng ra sao; Đưa ra biện pháp khắc phục cụ thể.',
    steps: [
      'Bước 1: Tìm hiểu các nguyên tắc cốt lõi của luật quốc tế về quyền riêng tư (tiêu chuẩn GDPR: sự đồng ý tường minh, tối thiểu hóa dữ liệu thu thập, quyền được xóa dữ liệu).',
      'Bước 2: Rà soát toàn bộ luồng dữ liệu của hệ thống nhóm xây dựng: xác định cụ thể hệ thống thu thập thông tin gì từ người dùng và dữ liệu được gửi đi đâu.',
      'Bước 3: Đối chiếu từng dòng dữ liệu với các điều khoản luật quyền riêng tư để chỉ ra các điểm đã tuân thủ và các rủi ro vi phạm tiềm ẩn.',
      'Bước 4: Đề xuất các biện pháp kỹ thuật và chính sách khắc phục cụ thể (hộp thoại xin phép, chức năng xóa lịch sử trò chuyện, ẩn danh hóa dữ liệu).'
    ],
    competencies: [
      'Luật quyền riêng tư quốc tế (GDPR)',
      'Kiểm toán dữ liệu người dùng',
      'Đối chiếu tuân thủ pháp lý',
      'Giải pháp kỹ thuật bảo vệ dữ liệu'
    ],
    rubric: {
      level4: 'Nêu đúng các nguyên tắc và điều khoản cụ thể của luật quyền riêng tư quốc tế (GDPR – sự đồng ý, tối thiểu hóa dữ liệu, quyền được xóa dữ liệu…); Chỉ ra cụ thể hệ thống thu thập dữ liệu gì, dùng vào đâu; đối chiếu từng điểm với điều khoản tương ứng để xác định phần tuân thủ/vi phạm; Đưa ra biện pháp khắc phục cụ thể cho từng vi phạm.',
      level3: 'Nêu đúng các nguyên tắc chính của luật quyền riêng tư quốc tế; Áp dụng nguyên tắc để chỉ ra ít nhất 2 điểm tuân thủ hoặc vi phạm của hệ thống; Có đề xuất cải thiện chung.',
      level2: 'Chỉ biết khái niệm quyền riêng tư chung, chưa nêu được luật/nguyên tắc cụ thể; Nhận xét chung chung ("có thể lộ dữ liệu") mà không đối chiếu với quy định; Chưa có đề xuất.',
      level1: 'Không nêu được quy định nào hoặc nêu sai; Không phân tích hệ thống AI; Không có đề xuất.'
    },
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.3.d',
    title: 'Áp dụng được các quy định về luật sở hữu trí tuệ khi sử dụng một hệ thống AI.',
    criterionTitle: 'Áp dụng luật sở hữu trí tuệ',
    competencyDescription: 'Năng lực tuân thủ pháp luật về sở hữu trí tuệ khi sử dụng AI, thể hiện qua: Hiểu quy định về quyền tác giả, giấy phép sử dụng (Creative Commons, điều khoản công cụ AI) với dữ liệu đầu vào và sản phẩm đầu ra; Kiểm tra nguồn gốc, trích dẫn đầy đủ; Xây dựng quy tắc tuân thủ SHTT.',
    steps: [
      'Bước 1: Tìm hiểu các quy định về quyền tác giả, giấy phép chia sẻ cộng đồng (Creative Commons: CC-BY, CC-NC) và điều khoản dịch vụ (Terms of Service) của các nền tảng AI.',
      'Bước 2: Kiểm tra nguồn gốc của tất cả các tài nguyên sử dụng trong dự án (dữ liệu văn bản, hình ảnh minh họa, tài liệu huấn luyện).',
      'Bước 3: Thực hiện trích dẫn nguồn gốc đầy đủ theo chuẩn học thuật và ghi nhận rõ ràng các nội dung do công cụ AI sinh ra.',
      'Bước 4: Đề xuất bộ quy tắc ứng xử liêm chính và các biện pháp giúp nhóm tuân thủ triệt để luật sở hữu trí tuệ.'
    ],
    competencies: [
      'Luật sở hữu trí tuệ & Bản quyền',
      'Giấy phép Creative Commons & ToS',
      'Trích dẫn nguồn học thuật chuẩn',
      'Minh bạch sản phẩm do AI tạo'
    ],
    rubric: {
      level4: 'Nêu đúng quy định về quyền tác giả, giấy phép sử dụng (Creative Commons, điều khoản sử dụng công cụ AI) đối với cả dữ liệu đầu vào và sản phẩm đầu ra; Kiểm tra nguồn gốc mọi tài nguyên dùng trong dự án, trích dẫn đầy đủ, ghi rõ phần nội dung do AI tạo; Đưa ra quy tắc/biện pháp cụ thể để nhóm tuân thủ SHTT khi dùng AI.',
      level3: 'Nêu đúng các quy định cơ bản về bản quyền khi dùng AI; Trích dẫn nguồn tài nguyên chính và ghi nhận việc sử dụng AI trong sản phẩm; Có lưu ý về việc tuân thủ.',
      level2: 'Biết khái niệm bản quyền chung chung chưa liên hệ với AI; Trích dẫn thiếu, chưa ghi nhận phần nội dung do AI tạo; Chưa có đề xuất.',
      level1: 'Không nêu được quy định nào; Sử dụng tài nguyên không rõ nguồn, không trích dẫn; Không có đề xuất.'
    },
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.3.e',
    title: 'Phân tích và đề xuất hướng giải quyết cho một tình thế tiến thoái lưỡng nan về đạo đức khi sử dụng một hệ thống AI.',
    criterionTitle: 'Phân tích tình huống đạo đức AI',
    competencyDescription: 'Năng lực phân tích và giải quyết vấn đề đạo đức trong sử dụng AI, thể hiện qua: Nhận diện vấn đề đạo đức và các giá trị mâu thuẫn (tiện lợi – riêng tư, hiệu quả – công bằng); Xem xét tình huống từ góc nhìn của nhiều bên liên quan và hậu quả; Đề xuất hướng giải quyết khả thi ưu tiên nguyên tắc đạo đức.',
    steps: [
      'Bước 1: Nhận diện một tình thế tiến thoái lưỡng nan về mặt đạo đức nảy sinh từ đề tài dự án (ví dụ: sự tiện lợi vs quyền riêng tư, can thiệp giúp đỡ vs bảo mật thông tin).',
      'Bước 2: Phân tích 2 giá trị đạo đức đang đối đầu và mâu thuẫn trực tiếp với nhau.',
      'Bước 3: Đặt tình huống dưới góc nhìn của từ 3 bên liên quan khác nhau để dự đoán hậu quả của từng phương án lựa chọn.',
      'Bước 4: Đưa ra phương án giải quyết tối ưu, lập luận rõ ràng về giá trị đạo đức được ưu tiên và đề xuất các biện pháp giảm thiểu tổn hại cho bên chịu ảnh hưởng.'
    ],
    competencies: [
      'Nhận diện xung đột đạo đức AI',
      'Phân tích góc nhìn đa bên liên quan',
      'Lập luận giá trị ưu tiên',
      'Giải pháp giảm thiểu tổn hại'
    ],
    rubric: {
      level4: 'Nêu rõ vấn đề đạo đức và các giá trị đang mâu thuẫn (tiện lợi – quyền riêng tư, hiệu quả – công bằng); Phân tích từ góc nhìn của từ 3 bên liên quan trở lên; xem xét hậu quả của từng phương án; Đưa ra hướng giải quyết khả thi, giải thích nguyên tắc/giá trị được ưu tiên và cách hạn chế tác động tiêu cực cho bên bị ảnh hưởng.',
      level3: 'Nêu được vấn đề đạo đức và hai giá trị mâu thuẫn chính; Phân tích từ góc nhìn của ít nhất 2 bên liên quan; Đưa ra hướng giải quyết có lý do rõ ràng.',
      level2: 'Nêu được vấn đề nhưng chưa thấy sự mâu thuẫn giữa các giá trị; Chỉ nhìn từ một phía; Giải pháp chung chung hoặc chưa khả thi, thiếu lý do.',
      level1: 'Không nhận ra vấn đề đạo đức; Không phân tích; Không có đề xuất hoặc giải pháp vi phạm nguyên tắc đạo đức.'
    },
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.4.a',
    title: 'Đánh giá và xây dựng chiến lược cá nhân để quản lý các tác động của việc sử dụng sai AI lên sức khỏe tinh thần (wellbeing).',
    criterionTitle: 'Quản lý tác động AI lên wellbeing',
    competencyDescription: 'Năng lực tự nhận thức và tự quản lý sức khỏe tinh thần khi sử dụng AI, thể hiện qua: Tự theo dõi thói quen dùng AI và nhận diện trung thực dấu hiệu sử dụng sai (phụ thuộc, lười suy nghĩ, căng thẳng); Xây dựng chiến lược cá nhân cụ thể; Áp dụng và tự đánh giá kết quả điều chỉnh.',
    steps: [
      'Bước 1: Lập nhật ký tự theo dõi thói quen sử dụng AI trong ít nhất 5–7 ngày (thời gian dùng, mục đích dùng, tần suất nhờ AI làm bài tập hộ).',
      'Bước 2: Nhận diện trung thực các dấu hiệu sử dụng sai hoặc phụ thuộc quá mức (ngại tư duy độc lập, lo lắng khi không có AI, tự ti vì so sánh bản thân).',
      'Bước 3: Xây dựng bản chiến lược cá nhân hành động cụ thể: quy định khung giờ dùng AI, thời gian tự suy nghĩ độc lập trước khi mở AI, bổ sung các hoạt động ngoại khóa.',
      'Bước 4: Áp dụng chiến lược vào cuộc sống hàng ngày, ghi chép minh chứng quá trình thực hiện và viết tự đánh giá kết quả đạt được.'
    ],
    competencies: [
      'Nhật ký thói quen công nghệ',
      'Tự nhận thức phụ thuộc AI',
      'Chiến lược cân bằng số (Digital Wellbeing)',
      'Thực thi & tự đánh giá điều chỉnh'
    ],
    rubric: {
      level4: 'Tự theo dõi thói quen dùng AI (thời gian, mục đích) có số liệu; nhận diện trung thực các dấu hiệu sử dụng sai (phụ thuộc, giảm tự suy nghĩ, căng thẳng, so sánh bản thân…); Xây dựng chiến lược cá nhân cụ thể (mục tiêu, giới hạn thời gian, hoạt động thay thế, người hỗ trợ); Có minh chứng đã áp dụng trong một khoảng thời gian, tự đánh giá kết quả và điều chỉnh chiến lược.',
      level3: 'Nhận diện được ít nhất 2 tác động của việc sử dụng sai AI đến bản thân; Xây dựng được chiến lược với ít nhất 2 biện pháp cụ thể, có thể thực hiện; Có kế hoạch áp dụng.',
      level2: 'Chỉ nêu tác động chung của AI với mọi người, chưa liên hệ bản thân; Biện pháp chung chung ("dùng ít lại"), khó thực hiện; Chưa có kế hoạch.',
      level1: 'Không nhận diện được tác động; Không xây dựng được chiến lược; Không có hành động.'
    },
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.4.b',
    title: 'Cân nhắc và đề xuất được vai trò của bản thân trong việc giảm thiểu tác động môi trường của AI ở quy mô khu vực.',
    criterionTitle: 'Vai trò trong giảm tác động môi trường của AI',
    competencyDescription: 'Năng lực trách nhiệm công dân và ý thức phát triển bền vững trong kỷ nguyên AI, thể hiện qua: Giải thích tác động môi trường của AI (điện năng, nước làm mát, rác thải điện tử) bằng số liệu có nguồn; Đề xuất vai trò cá nhân ở các cấp; Tính khả thi và lan tỏa hành động xanh.',
    steps: [
      'Bước 1: Thu thập số liệu có trích dẫn nguồn uy tín về tác động sinh thái của mô hình AI (điện năng tiêu thụ của trung tâm dữ liệu, lượng nước làm mát, rác thải linh kiện điện tử).',
      'Bước 2: Phân tích và liên hệ trực tiếp tác động này với vấn đề sử dụng tài nguyên và năng lượng tại quy mô địa phương/khu vực.',
      'Bước 3: Đề xuất kế hoạch hành động giảm thiểu ở nhiều cấp độ: cấp cá nhân (prompt ngắn gọn, tối ưu token, tắt máy tính khi không dùng), cấp trường học và gia đình.',
      'Bước 4: Lập kế hoạch truyền thông lan tỏa thông điệp "Xanh hóa việc dùng AI" đến bạn bè trong trường và đo lường kết quả ban đầu.'
    ],
    competencies: [
      'Hiểu biết tác động môi trường của AI',
      'Phân tích số liệu sinh thái có dẫn nguồn',
      'Đề xuất hành động xanh đa cấp độ',
      'Truyền thông lan tỏa bền vững'
    ],
    rubric: {
      level4: 'Giải thích được các tác động môi trường của AI (điện năng, nước làm mát, rác thải điện tử) có số liệu dẫn nguồn và liên hệ với khu vực; Đề xuất vai trò cá nhân cụ thể ở nhiều cấp (bản thân, gia đình/nhà trường, cộng đồng khu vực), có kế hoạch hành động và cách đo lường kết quả; Đề xuất phù hợp khả năng của học sinh và có hoạt động lan tỏa đến người khác.',
      level3: 'Nêu được ít nhất 2 tác động môi trường của AI; Đề xuất được vai trò cá nhân rõ ràng với hành động cụ thể, liên hệ quy mô khu vực; Hành động phù hợp khả năng của học sinh.',
      level2: 'Chỉ nêu chung chung "AI gây hại môi trường", chưa chỉ ra tác động cụ thể; Vai trò chung chung ("bảo vệ môi trường"), chưa có hành động cụ thể hoặc chưa liên hệ quy mô khu vực; Đề xuất khó thực hiện hoặc vượt quá khả năng học sinh.',
      level1: 'Không nêu được tác động môi trường của AI; Không đề xuất được vai trò hoặc đề xuất không liên quan đến AI/môi trường; Không có kế hoạch.'
    },
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.4.c',
    title: 'Nhận diện và phân tích được sự thay đổi trong tư duy cá nhân sau một giai đoạn tương tác với AI.',
    criterionTitle: 'Phân tích thay đổi tư duy cá nhân',
    competencyDescription: 'Năng lực tư duy phản tư (tự nhìn lại bản thân), thể hiện qua: So sánh bản thân trước – sau giai đoạn tương tác với AI về cách suy nghĩ, cách học, giải quyết vấn đề; Giải thích nguyên nhân thay đổi bằng minh chứng cụ thể; Đánh giá tích cực/tiêu cực và đặt hướng phát triển tiếp theo.',
    steps: [
      'Bước 1: Tự nhìn nhận và ghi lại trạng thái tư duy của bản thân ở thời điểm trước khi bước vào dự án (cách tìm kiếm thông tin, cách giải quyết bài toán, định kiến về AI).',
      'Bước 2: Ghi chép lại các tình huống cụ thể trong dự án đã tác động mạnh làm thay đổi góc nhìn của bản thân đối với công nghệ và cách tự học.',
      'Bước 3: Lập bảng so sánh chi tiết "Trước và Sau" trên nhiều khía cạnh: cách suy nghĩ logic, phương pháp học tập, kỹ năng cộng tác, thái độ với AI.',
      'Bước 4: Đánh giá những điểm chuyển biến tích cực lẫn tiêu cực, phân tích nguyên nhân và vạch ra định hướng phát triển năng lực cá nhân trong tương lai.'
    ],
    competencies: [
      'Tư duy phản tư (Self-reflection)',
      'So sánh chuyển biến tư duy Trước – Sau',
      'Phân tích nguyên nhân có minh chứng',
      'Xây dựng lộ trình phát triển cá nhân'
    ],
    rubric: {
      level4: 'So sánh rõ ràng trước – sau tương tác với AI trên nhiều mặt (cách suy nghĩ, cách học, cách giải quyết vấn đề, thái độ với AI); Giải thích nguyên nhân thay đổi, có minh chứng cụ thể (nhật ký học tập, sản phẩm, ví dụ thực tế); Đánh giá thay đổi nào tích cực/tiêu cực và đề ra hướng phát triển bản thân tiếp theo.',
      level3: 'Nêu được ít nhất 2 thay đổi trong tư duy cá nhân sau giai đoạn tương tác với AI; Giải thích được nguyên nhân thay đổi, có ví dụ minh họa; Nhận xét được thay đổi đó là tích cực hay tiêu cực.',
      level2: 'Chỉ nêu 1 thay đổi chung chung ("em hiểu AI hơn"); Chỉ mô tả, chưa giải thích nguyên nhân, không có ví dụ; Chưa có hướng phát triển.',
      level1: 'Không nhận ra thay đổi; Không có minh chứng; Không có phản tư.'
    },
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.4.d',
    title: 'Dự đoán được các xu hướng phát triển của công nghệ AI (ví dụ: computer vision) dựa trên các mô hình hiện có và các bài báo công nghệ.',
    criterionTitle: 'Dự đoán xu hướng công nghệ AI',
    competencyDescription: 'Năng lực nghiên cứu thông tin công nghệ và dự báo xu hướng, thể hiện qua: Tìm kiếm, chọn lọc bài báo công nghệ, báo cáo nghiên cứu từ nguồn đáng tin cậy và trích dẫn đầy đủ; Phân tích, so sánh sự phát triển của các mô hình để chỉ ra quy luật/xu hướng; Đưa ra dự đoán cụ thể có lập luận chặt chẽ từ dữ liệu.',
    steps: [
      'Bước 1: Tìm kiếm, thẩm định và chọn lọc ít nhất 2–3 bài báo công nghệ, báo cáo nghiên cứu hoặc tài liệu mô hình AI từ nguồn uy tín và cập nhật.',
      'Bước 2: Phân tích, tổng hợp và so sánh sự biến chuyển của các thế hệ mô hình AI hiện có để nhận diện quy luật hoặc xu hướng cốt lõi.',
      'Bước 3: Đưa ra dự đoán cụ thể về xu hướng công nghệ trong tương lai (mốc thời gian 2–5 năm, lĩnh vực ứng dụng trọng điểm) dựa trên số liệu phân tích.',
      'Bước 4: Trình bày bài phân tích với lập luận chặt chẽ từ dữ liệu, làm rõ cả cơ hội đột phá lẫn thách thức về an toàn, đạo đức hoặc việc làm.'
    ],
    competencies: [
      'Nghiên cứu báo cáo công nghệ uy tín',
      'Phân tích quy luật phát triển mô hình AI',
      'Dự đoán xu hướng dựa trên dữ liệu',
      'Đánh giá cơ hội & thách thức tương lai'
    ],
    rubric: {
      level4: 'Tham khảo từ 3 nguồn trở lên (bài báo công nghệ, báo cáo, mô hình AI hiện có), nguồn đáng tin cậy và cập nhật, trích dẫn đầy đủ; Tổng hợp, so sánh được sự phát triển của các mô hình hiện có, chỉ ra quy luật/xu hướng từ dữ liệu; Đưa ra dự đoán cụ thể (mốc thời gian, lĩnh vực ứng dụng), lập luận chặt chẽ từ dữ liệu; nêu cả cơ hội và thách thức.',
      level3: 'Tham khảo 2–3 nguồn đáng tin cậy, có trích dẫn; Mô tả và phân tích được đặc điểm các mô hình hiện có; Dự đoán hợp lý, có liên hệ với dữ liệu đã phân tích.',
      level2: 'Chỉ 1 nguồn hoặc nguồn chưa đáng tin cậy, không trích dẫn; Chỉ liệt kê thông tin, chưa phân tích; Dự đoán chung chung ("AI sẽ phát triển mạnh"), chưa dựa trên dữ liệu.',
      level1: 'Không có nguồn tham khảo; Phân tích sai lệch; Không đưa ra dự đoán hoặc dự đoán không có căn cứ.'
    },
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  }
];

export function getMTBById(id: string): MTBItem | undefined {
  return ALL_MTB_ITEMS.find(m => m.id === id);
}

export function getTopicById(id: string): ProjectTopic | undefined {
  return PROJECT_TOPICS.find(t => t.id === id);
}
