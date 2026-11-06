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
      'MTB 1.3.a',
      'MTB 1.3.d',
      'MTB 1.4.a',
      'MTB 2.1.a'
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
      'MTB 1.3.a',
      'MTB 1.3.c',
      'MTB 1.3.e',
      'MTB 1.4.a',
      'MTB 1.4.c',
      'MTB 2.1.a',
      'MTB 2.1.b'
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
      'MTB 1.4.d',
      'MTB 2.1.a',
      'MTB 2.1.b'
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
    competencies: [
      'Giao tiếp & tổng hợp thông tin',
      'Xác định các bên liên quan',
      'Phân tích nhu cầu người dùng',
      'Xây dựng user story'
    ],
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.b',
    title: 'Phân tích được các yêu cầu về phần cứng và kiến trúc hệ thống cho một mô hình học có giám sát.',
    competencies: [
      'Phân tích kỹ thuật hệ thống',
      'Kiến trúc phần cứng & mô hình AI'
    ],
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.c',
    title: 'Thiết kế và quản lý được một quy trình làm việc theo phương pháp Agile, bao gồm việc nhận diện và lên kế hoạch xử lý các rủi ro tiềm ẩn trong dự án.',
    competencies: [
      'Lập kế hoạch',
      'Quản lý dự án theo Agile',
      'Xác định rủi ro',
      'Thiết kế quy trình làm việc'
    ],
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.1.d',
    title: 'Sử dụng được AI để tự phản biện về các giả định ban đầu của mình trong giai đoạn lập kế hoạch.',
    competencies: [
      'Sử dụng AI để phản biện & tự đánh giá',
      'Tư duy phản biện'
    ],
    domain: '1.1',
    domainLabel: '1.1 Lập kế hoạch & Khảo sát nhu cầu',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.a',
    title: 'Thiết kế được một chuỗi các câu lệnh (prompt chain) phức tạp để dẫn dắt AI thực hiện một nhiệm vụ nhiều bước, đồng thời tối ưu hóa các câu lệnh đó để giảm thiểu lỗi kỹ thuật.',
    competencies: [
      'Thiết kế prompt chain phức tạp',
      'Tối ưu hóa câu lệnh AI',
      'Kỹ năng kỹ thuật AI nâng cao'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.b',
    title: 'Sử dụng được một chuỗi các công cụ AI chuyên biệt một cách tuần tự để hoàn thành một nhiệm vụ phức tạp.',
    competencies: [
      'Sử dụng công cụ AI tuần tự',
      'Kỹ năng thực thi nhiệm vụ phức tạp với AI'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.c',
    title: 'Sử dụng được công cụ AI để tạo ra một sản phẩm video có nội dung gây ảnh hưởng đến một nhóm đối tượng cụ thể.',
    competencies: [
      'Sáng tạo nội dung với AI',
      'Ứng dụng AI cho tác động truyền thông'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.d',
    title: 'Vận dụng được những ý tưởng mới để đồng kiến tạo với AI một giải pháp có tính nguyên bản về mặt áp dụng.',
    competencies: [
      'Đồng sáng tạo & phát triển ý tưởng mới với AI',
      'Tư duy sáng tạo'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.2.e',
    title: 'Phân tích và đánh giá được ranh giới linh hoạt giữa vai trò của con người và vai trò của AI trong một dự án đồng sáng tạo.',
    competencies: [
      'Phân tích vai trò con người với AI',
      'Đánh giá tương tác con người – AI'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.2.f',
    title: 'Khám phá và thử nghiệm được các tính năng của một mô hình công nghệ AI mới nổi.',
    competencies: [
      'Khám phá và thử nghiệm công nghệ AI mới',
      'Tư duy thử nghiệm – khám phá'
    ],
    domain: '1.2',
    domainLabel: '1.2 Kỹ thuật Prompt & Tương tác công cụ AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.a',
    title: 'Xây dựng được một bộ tiêu chí đánh giá riêng biệt, phù hợp với một loại AI cụ thể và mục tiêu của dự án.',
    competencies: [
      'Xây dựng được bộ tiêu chí đánh giá cho một mô hình AI cụ thể'
    ],
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.b',
    title: 'Đánh giá phản biện được một thiết kế AI dựa trên các tiêu chí đã xây dựng, nhu cầu người dùng và tác động tiềm năng trong tương lai.',
    competencies: [
      'Đánh giá phản biện thiết kế AI',
      'Phân tích nhu cầu người dùng',
      'Dự đoán tác động tiềm năng'
    ],
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.3.c',
    title: 'Áp dụng được các quy định của luật pháp quốc tế về quyền riêng tư để phản biện một hệ thống AI.',
    competencies: [
      'Áp dụng luật quyền riêng tư quốc tế',
      'Phản biện hệ thống AI'
    ],
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.3.d',
    title: 'Áp dụng được các quy định về luật sở hữu trí tuệ khi sử dụng một hệ thống AI.',
    competencies: [
      'Áp dụng luật sở hữu trí tuệ',
      'Đảm bảo tuân thủ pháp luật khi dùng AI'
    ],
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.3.e',
    title: 'Phân tích và đề xuất hướng giải quyết cho một tình thế tiến thoái lưỡng nan về đạo đức khi sử dụng một hệ thống AI.',
    competencies: [
      'Phân tích tình huống đạo đức và đề xuất giải pháp'
    ],
    domain: '1.3',
    domainLabel: '1.3 Tiêu chí đánh giá, Đạo đức & Luật pháp AI',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.4.a',
    title: 'Đánh giá và xây dựng chiến lược cá nhân để quản lý các tác động của việc sử dụng sai AI lên sức khỏe tinh thần (wellbeing).',
    competencies: [
      'Đánh giá tác động AI lên sức khỏe tinh thần',
      'Quản lý wellbeing cá nhân'
    ],
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: false
  },
  {
    id: 'MTB 1.4.b',
    title: 'Cân nhắc và đề xuất được vai trò của bản thân trong việc giảm thiểu tác động môi trường của AI ở quy mô khu vực.',
    competencies: [
      'Đề xuất vai trò cá nhân trong giảm thiểu tác động môi trường',
      'Ý thức bền vững'
    ],
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.4.c',
    title: 'Nhận diện và phân tích được sự thay đổi trong tư duy cá nhân sau một giai đoạn tương tác với AI.',
    competencies: [
      'Nhận diện & phân tích thay đổi tư duy cá nhân',
      'Tư duy phản xạ – tự nhận thức'
    ],
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 1.4.d',
    title: 'Dự đoán được các xu hướng phát triển của công nghệ AI (ví dụ: computer vision) dựa trên các mô hình hiện có và các bài báo công nghệ.',
    competencies: [
      'Dự đoán xu hướng công nghệ AI',
      'Phân tích dữ liệu công nghệ & báo cáo nghiên cứu'
    ],
    domain: '1.4',
    domainLabel: '1.4 Tác động xã hội, Môi trường & Tư duy cá nhân',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: false,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 2.1.a',
    title: 'Giải thích được cách Big Data được sử dụng để huấn luyện một mô hình học có giám sát.',
    competencies: [
      'Trình bày được ví dụ về Big data và giải thích được mối liên hệ giữa Big data và mô hình học có giám sát',
      'Đặc điểm của mô hình học có giám sát'
    ],
    domain: '2.1',
    domainLabel: '2.1 Dữ liệu lớn & Học máy có giám sát',
    defaultCheckedTopic1: true,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  },
  {
    id: 'MTB 2.1.b',
    title: 'Thu thập và tổ chức được một bộ dữ liệu chứa các biến số rời rạc.',
    competencies: [
      'Thu thập dữ liệu với biến số rời rạc',
      'Tổ chức dữ liệu và mô phỏng xu hướng bằng biểu đồ'
    ],
    domain: '2.1',
    domainLabel: '2.1 Dữ liệu lớn & Học máy có giám sát',
    defaultCheckedTopic1: false,
    defaultCheckedTopic2: true,
    defaultCheckedTopic3: true
  }
];

export function getMTBById(id: string): MTBItem | undefined {
  return ALL_MTB_ITEMS.find(m => m.id === id);
}

export function getTopicById(id: string): ProjectTopic | undefined {
  return PROJECT_TOPICS.find(t => t.id === id);
}
