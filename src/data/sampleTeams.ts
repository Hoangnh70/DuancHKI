import { Team, TEACHER_EMAIL } from '../types';
import { 
  generateDriveSubfolders, 
  generateClassGoogleSheetUrl,
  MASTER_FOLDER_ID,
  MASTER_FOLDER_URL
} from '../services/googleDriveWorkspace';

export const INITIAL_SAMPLE_TEAMS: Team[] = [
  {
    id: 'team-k9-9a1-01',
    teamCode: 'K9-9A101',
    teamName: 'SmartTutor K9',
    className: '9A1',
    projectType: 'pair',
    topicId: 'topic-1',
    members: [
      {
        name: 'Nguyễn Minh Anh',
        studentId: 'HS2026-0901',
        email: 'minhanh.nguyen@vinschool.edu.vn',
        role: 'Trưởng nhóm - Prompt Engineer'
      },
      {
        name: 'Trần Gia Bảo',
        studentId: 'HS2026-0902',
        email: 'giabao.tran@vinschool.edu.vn',
        role: 'Kiến trúc hệ thống & Tài liệu'
      }
    ],
    createdAt: '2026-10-18T08:30:00.000Z',
    folder: {
      folderId: 'f-smarttutor',
      folderName: 'SmartTutor_K9_Workspace',
      driveFolderId: MASTER_FOLDER_ID,
      driveFolderUrl: MASTER_FOLDER_URL,
      ownerEmail: TEACHER_EMAIL,
      lockDate: '2026-11-01T08:30:00.000Z', // Past 14 days
      isLocked: true, // Locked after 14 days
      classGoogleSheetUrl: generateClassGoogleSheetUrl('9A1'),
      subfolders: generateDriveSubfolders('SmartTutor K9', '9A1', 'team-k9-9a1-01'),
      selectedMTBIds: [
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
      mtbNotes: {
        'MTB 1.1.a': 'Đã phỏng vấn 5 bạn học sinh lớp 9A1 và cô giáo môn Toán về khó khăn khi làm bài hình học.',
        'MTB 1.1.b': 'Hệ thống dùng mô hình Gemini 1.5 Flash thông qua API, không yêu cầu GPU cục bộ.',
        'MTB 1.1.c': 'Đã chia 3 sprint làm việc, ghi nhận rủi ro AI trả lời quá dài hoặc đưa thẳng đáp án mà không giải thích.',
        'MTB 1.1.d': 'Đã dùng AI phản biện giả định "học sinh chỉ cần giải bài", AI chỉ ra nhu cầu thực tế là "học sinh cần hiểu phương pháp giải".'
      },
      userStories: [
        {
          id: 'us-1',
          asA: 'Học sinh lớp 9 đang ôn thi môn Toán',
          iWant: 'Trợ lý AI hướng dẫn từng bước tư duy thay vì đưa ngay đáp án số',
          soThat: 'Tôi tự nắm vững bản chất công thức và tự tin khi vào phòng thi',
          priority: 'Cao'
        },
        {
          id: 'us-2',
          asA: 'Giáo viên bộ môn Toán - Tin',
          iWant: 'Chatbot kiểm soát được nội dung và tuân thủ liêm chính học thuật',
          soThat: 'Học sinh không dùng chatbot để gian lận bài tập về nhà',
          priority: 'Cao'
        }
      ],
      promptChain: [
        {
          id: 'p-1',
          stepNumber: 1,
          purpose: 'Phân tích môn học và xác định chủ đề kiến thức',
          promptText: 'Đọc câu hỏi sau của học sinh: "[CÂU_HỎI]". Hãy xác định: (1) Môn học, (2) Khái niệm trọng tâm, (3) Mức độ khó (Cơ bản / Nâng cao). Không đưa ra câu trả lời cuối cùng.',
          expectedOutput: 'Phân loại môn, kiến thức trọng tâm và mức độ.',
          optimizedNotes: 'Thêm ràng buộc cấm đưa đáp án ở bước 1 để chuẩn bị kịch bản sư phạm.'
        },
        {
          id: 'p-2',
          stepNumber: 2,
          purpose: 'Đặt câu hỏi gợi mở theo phương pháp Socratic',
          promptText: 'Dựa trên kiến thức trọng tâm đã xác định, hãy đặt 2 câu hỏi gợi ý để học sinh tự nhớ lại định lý hoặc quy tắc liên quan.',
          expectedOutput: '2 câu hỏi gợi ý kích thích tư duy học sinh.',
          optimizedNotes: 'Yêu cầu giọng điệu thân thiện, khích lệ, dùng đại từ "mình" và "bạn".'
        }
      ],
      agileRisks: [
        {
          risk: 'Học sinh yêu cầu đáp án trắc nghiệm nhanh để nộp bài',
          mitigation: 'Thiết lập system instruction từ chối đưa trực tiếp kết quả A/B/C/D mà chuyển sang giải thích phương pháp giải.'
        },
        {
          risk: 'Chatbot bị hallucination trích dẫn sai định lý trong sách giáo khoa',
          mitigation: 'Cung cấp văn bản trích xuất trực tiếp từ SGK K9 vào context (RAG).'
        }
      ],
      ethicsAnalysis: {
        privacyStrategy: 'Không lưu trữ thông tin nhận dạng cá nhân (PII), tên thật hay địa chỉ của học sinh.',
        intellectualProperty: 'Sử dụng ví dụ tự biên soạn và trích dẫn nguồn chuẩn theo sách giáo khoa đã được cấp phép.',
        dilemmaSolution: 'Khi học sinh thúc ép AI giải giùm bài kiểm tra, hệ thống phản hồi từ chối lịch sự và chuyển sang đặt câu hỏi ôn tập.',
        wellbeingStrategy: 'Nhắc nhở học sinh nghỉ ngơi 5 phút sau mỗi 45 phút học cùng AI để bảo vệ mắt và trí não.'
      },
      files: [
        {
          id: 'f-1',
          title: 'Slide Báo cáo Đề tài Trợ lý AI K9',
          type: 'slide',
          url: 'https://canva.com/design/smarttutor-k9-demo',
          description: 'Slide 12 trang thuyết minh toàn bộ giải pháp và user story',
          updatedAt: '2026-10-25'
        },
        {
          id: 'f-2',
          title: 'Video Demo Thử nghiệm Chatbot giải Toán',
          type: 'video',
          url: 'https://drive.google.com/file/d/demo-smarttutor/view',
          description: 'Video 3 phút quay lại màn hình học sinh tương tác với chatbot',
          updatedAt: '2026-10-26'
        }
      ],
      workLogs: [
        {
          id: 'log-1',
          date: '2026-10-18',
          author: 'Nguyễn Minh Anh',
          content: 'Đăng ký đề tài, khởi tạo Google Drive Folder và lập kế hoạch Sprint 1.',
          progressPercent: 20
        },
        {
          id: 'log-2',
          date: '2026-10-22',
          author: 'Trần Gia Bảo',
          content: 'Hoàn thiện 5 cuộc phỏng vấn học sinh và tổng hợp bảng User Story.',
          progressPercent: 50
        },
        {
          id: 'log-3',
          date: '2026-10-26',
          author: 'Nguyễn Minh Anh',
          content: 'Thử nghiệm xong chuỗi prompt chain 3 bước và quay video demo.',
          progressPercent: 85
        }
      ],
      summaryReport: 'Dự án SmartTutor K9 hướng tới việc trao quyền cho học sinh lớp 9 tự học thông qua phương pháp sư phạm gợi mở (Socratic tutoring), giải quyết vấn đề phụ thuộc vào đáp án có sẵn.',
      status: 'submitted',
      submittedAt: '2026-10-27T10:15:00.000Z',
      teacherAssessment: {
        score: 9.5,
        criteriaScores: {
          'MTB 1.1.a': 9.5,
          'MTB 1.1.b': 9.0,
          'MTB 1.1.c': 9.5,
          'MTB 1.1.d': 10.0,
          'MTB 1.2.a': 9.5
        },
        comment: 'Nhóm làm việc rất chỉn chu! User story xuất sắc, prompt chain có tính sư phạm cao, giải quyết triệt để vấn đề gian lận học thuật.',
        gradedAt: '2026-10-28T14:20:00.000Z',
        teacherName: 'Thầy Hoàng (v.hoangnh70@vinschool.edu.vn)'
      }
    }
  },
  {
    id: 'team-k9-9a2-01',
    teamCode: 'K9-9A201',
    teamName: 'MindCare Hub',
    className: '9A2',
    projectType: 'pair',
    topicId: 'topic-2',
    members: [
      {
        name: 'Lê Hoàng Yến Nhi',
        studentId: 'HS2026-0925',
        email: 'yennhi.le@vinschool.edu.vn',
        role: 'Trưởng nhóm - Nhà nghiên cứu dữ liệu'
      },
      {
        name: 'Vũ Đức Khang',
        studentId: 'HS2026-0926',
        email: 'duckhang.vu@vinschool.edu.vn',
        role: 'Phân tích đạo đức & Bảo mật'
      }
    ],
    createdAt: '2026-10-26T09:15:00.000Z',
    folder: {
      folderId: 'f-mindcare',
      folderName: 'MindCare_K9_Workspace',
      driveFolderId: MASTER_FOLDER_ID,
      driveFolderUrl: MASTER_FOLDER_URL,
      ownerEmail: TEACHER_EMAIL,
      lockDate: '2026-11-09T09:15:00.000Z', // Still within 14 days
      isLocked: false,
      classGoogleSheetUrl: generateClassGoogleSheetUrl('9A2'),
      subfolders: generateDriveSubfolders('MindCare Hub', '9A2', 'team-k9-9a2-01'),
      selectedMTBIds: [
        'MTB 1.1.a',
        'MTB 1.1.b',
        'MTB 1.1.c',
        'MTB 1.1.d',
        'MTB 1.3.a',
        'MTB 1.3.c',
        'MTB 1.3.e',
        'MTB 1.4.a',
        'MTB 2.1.a',
        'MTB 2.1.b'
      ],
      mtbNotes: {
        'MTB 1.1.a': 'Phỏng vấn chuyên gia tâm lý học đường về các biểu hiện stress ở tuổi dậy thì.',
        'MTB 1.3.c': 'Nghiên cứu kỹ luật bảo vệ quyền riêng tư của trẻ em (COPPA và Luật Trẻ em 2016).',
        'MTB 1.3.e': 'Đề xuất cơ chế cảnh báo 2 cấp độ: cấp 1 chỉ lưu ý học sinh, cấp 2 mới kích hoạt hỗ trợ giáo viên khi có từ khóa nguy cơ cao.',
        'MTB 2.1.b': 'Tập hợp bộ dữ liệu 60 câu trích đoạn văn bản được gán nhãn [0: Tích cực, 1: Bình thường, 2: Lo âu, 3: Nguy cơ cao].'
      },
      userStories: [
        {
          id: 'us-m1',
          asA: 'Học sinh đang chịu áp lực điểm số và thi cử',
          iWant: 'Có một không gian viết nhật ký an toàn, AI nhận diện khi tôi quá tải để gợi ý bài tập thở',
          soThat: 'Tôi giải tỏa căng thẳng kịp thời trước khi kiệt sức',
          priority: 'Cao'
        },
        {
          id: 'us-m2',
          asA: 'Cán bộ tư vấn tâm lý trường học',
          iWant: 'Thống kê xu hướng tâm trạng ẩn danh của toàn khối',
          soThat: 'Nhà trường tổ chức các buổi workshop kỹ năng giải tỏa áp lực đúng thời điểm thi',
          priority: 'Trung bình'
        }
      ],
      promptChain: [
        {
          id: 'pm-1',
          stepNumber: 1,
          purpose: 'Phân tích cảm xúc và trích xuất chỉ số lo âu từ văn bản ẩn danh',
          promptText: 'Phân tích đoạn nhật ký sau và đánh giá mức độ căng thẳng theo thang điểm 1-5 kèm 3 từ khóa cảm xúc cốt lõi.',
          expectedOutput: 'Chỉ số cảm xúc và nhãn phân loại.',
          optimizedNotes: 'Loại bỏ hoàn toàn các thông tin cá nhân trước khi phân tích.'
        }
      ],
      agileRisks: [
        {
          risk: 'Vi phạm quyền riêng tư khi đọc nhật ký của học sinh',
          mitigation: 'Dữ liệu chỉ được phân tích tại thiết bị hoặc mã hóa 2 chiều, học sinh có toàn quyền xóa nhật ký bất cứ lúc nào.'
        }
      ],
      ethicsAnalysis: {
        privacyStrategy: 'Tuân thủ nghiêm ngặt Luật Bảo vệ dữ liệu cá nhân, mã hóa đầu cuối.',
        intellectualProperty: 'Bộ từ điển cảm xúc dựa trên nghiên cứu tâm lý học đường mở.',
        dilemmaSolution: 'Tình huống phát hiện nguy cơ tự hại: Hệ thống hiện ngay hotline bảo vệ trẻ em 111 và gợi ý kết nối với chuyên viên tâm lý thân thiết.',
        wellbeingStrategy: 'Khuyến khích tương tác ngoài đời thực thay vì gắn chặt với màn hình ảo.'
      },
      files: [
        {
          id: 'f-m1',
          title: 'Bộ dữ liệu nhãn cảm xúc K9 (CSV)',
          type: 'doc',
          url: 'https://docs.google.com/spreadsheets/d/mindcare-dataset',
          description: '60 mẫu câu ẩn danh có gán nhãn cảm xúc biến số rời rạc',
          updatedAt: '2026-10-24'
        },
        {
          id: 'f-m2',
          title: 'Bản thiết kế giao diện Figma - MindCare App',
          type: 'prototype',
          url: 'https://figma.com/file/mindcare-k9-ui',
          description: 'Mô hình giao diện viết nhật ký và cảnh báo thấu cảm',
          updatedAt: '2026-10-26'
        }
      ],
      workLogs: [
        {
          id: 'lm-1',
          date: '2026-10-26',
          author: 'Lê Hoàng Yến Nhi',
          content: 'Đăng ký nhóm và khởi tạo Thư mục Drive thuộc sở hữu Thầy Hoàng.',
          progressPercent: 30
        },
        {
          id: 'lm-2',
          date: '2026-10-29',
          author: 'Vũ Đức Khang',
          content: 'Hoàn thành bộ dữ liệu 60 mẫu câu và dán nhãn biến số rời rạc.',
          progressPercent: 70
        }
      ],
      summaryReport: 'Hệ thống MindCare K9 ứng dụng NLP để sàng lọc sớm các dấu hiệu quá tải tinh thần ở lứa tuổi học sinh, đặt an toàn và quyền riêng tư cá nhân lên hàng đầu.',
      status: 'in_progress',
      submittedAt: undefined
    }
  },
  {
    id: 'team-k9-9a3-01',
    teamCode: 'K9-9A301',
    teamName: 'Dr.Plant GreenTech',
    className: '9A3',
    projectType: 'individual',
    topicId: 'topic-3',
    members: [
      {
        name: 'Phạm Quang Khải',
        studentId: 'HS2026-0940',
        email: 'quangkhai.pham@vinschool.edu.vn',
        role: 'Nhà phát triển độc lập (Cá nhân)'
      }
    ],
    createdAt: '2026-10-28T14:00:00.000Z',
    folder: {
      folderId: 'f-drplant',
      folderName: 'DrPlant_K9_Workspace',
      driveFolderId: MASTER_FOLDER_ID,
      driveFolderUrl: MASTER_FOLDER_URL,
      ownerEmail: TEACHER_EMAIL,
      lockDate: '2026-11-11T14:00:00.000Z', // Still within 14 days
      isLocked: false,
      classGoogleSheetUrl: generateClassGoogleSheetUrl('9A3'),
      subfolders: generateDriveSubfolders('Dr.Plant GreenTech', '9A3', 'team-k9-9a3-01'),
      selectedMTBIds: [
        'MTB 1.1.a',
        'MTB 1.1.b',
        'MTB 1.1.c',
        'MTB 1.1.d',
        'MTB 1.2.f',
        'MTB 1.3.a',
        'MTB 1.3.b',
        'MTB 1.4.b',
        'MTB 1.4.d',
        'MTB 2.1.a',
        'MTB 2.1.b'
      ],
      mtbNotes: {
        'MTB 1.1.a': 'Khảo sát câu lạc bộ Vườn sinh học khối 9 về 4 loại rau hay bị sâu bệnh nhất ở sân thượng.',
        'MTB 1.4.b': 'Đánh giá tác động: Giúp giảm 60% lượng thuốc hóa học xịt bừa bãi nhờ phát hiện chính xác nguyên nhân nấm lá.',
        'MTB 2.1.b': 'Đã chụp 48 tấm ảnh lá cà chua và hoa hồng tại ban công trường học, phân làm 4 nhóm.'
      },
      userStories: [
        {
          id: 'us-p1',
          asA: 'Học sinh chăm sóc cây tại ban công lớp học',
          iWant: 'Chụp ảnh chiếc lá bị vàng và nhận ngay gợi ý tưới nước hay tỉa lá',
          soThat: 'Cây không bị chết úng và vườn lớp luôn xanh tốt',
          priority: 'Cao'
        }
      ],
      promptChain: [],
      agileRisks: [
        {
          risk: 'Camera chụp bị mờ hoặc ngược sáng dẫn tới AI đoán sai bệnh lá',
          mitigation: 'Thêm hướng dẫn chụp ảnh chuẩn: lá đủ sáng, cách 10-15cm và chụp cả mặt trước lẫn mặt sau lá.'
        }
      ],
      ethicsAnalysis: {
        privacyStrategy: 'Dữ liệu ảnh lá cây không chứa mặt người và không thu thập thông tin GPS vị trí nhà riêng.',
        intellectualProperty: 'Sử dụng ảnh tự chụp và trích dẫn hướng dẫn trị sâu bệnh từ Viện Khoa học Nông nghiệp.',
        dilemmaSolution: 'Tránh gợi ý các loại thuốc bảo vệ thực vật hóa học độc hại trong môi trường sống gia đình.',
        wellbeingStrategy: 'Khuyến khích học sinh lao động làm vườn, tiếp xúc với thiên nhiên để nâng cao sức khỏe.'
      },
      files: [
        {
          id: 'f-p1',
          title: 'Tập dữ liệu ảnh lá cây K9 (Drive)',
          type: 'doc',
          url: 'https://drive.google.com/drive/folders/drplant-dataset',
          description: '48 bức ảnh lá cây dán nhãn theo 4 loại bệnh rời rạc',
          updatedAt: '2026-10-25'
        }
      ],
      workLogs: [
        {
          id: 'lp-1',
          date: '2026-10-28',
          author: 'Phạm Quang Khải',
          content: 'Khởi tạo đề tài cá nhân Dr.Plant AI và kích hoạt Drive Folder trong Thư mục Tổng Khối 9.',
          progressPercent: 40
        }
      ],
      summaryReport: 'Hệ thống hỗ trợ nhận diện sớm bệnh lá cây trồng đô thị bằng mô hình thị giác máy tính, thúc đẩy nông nghiệp hữu cơ và lối sống xanh.',
      status: 'in_progress',
      submittedAt: undefined
    }
  }
];
