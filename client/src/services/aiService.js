/**
 * ============================================================================
 * BOOKBRIDGE AI SERVICE (CLIENT)
 * Gọi endpoint backend /api/ai/chat (sử dụng GEMINI_API_KEY từ server/.env)
 * ============================================================================
 */

/**
 * Xử lý chuỗi trả về từ AI để trích xuất text và khối JSON đề xuất thẻ sách
 */
function parseAiResponse(rawText, allBooks = []) {
  let text = rawText || '';
  let meta = {
    insightTags: 'Phân tích ngữ cảnh: Đàm đạo văn chương • Tinh hoa thư tịch',
    recommendedBookIds: [],
    quote: '',
    matchReason: ''
  };

  const jsonRegex = /:::RECOMMENDATIONS_JSON:::([\s\S]*?):::END_JSON:::/;
  const match = text.match(jsonRegex);

  if (match) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed.insightTags) meta.insightTags = parsed.insightTags;
      if (Array.isArray(parsed.recommendedBookIds)) meta.recommendedBookIds = parsed.recommendedBookIds;
      if (parsed.quote) meta.quote = parsed.quote;
      if (parsed.matchReason) meta.matchReason = parsed.matchReason;
    } catch (e) {
      console.warn('Lỗi phân tích JSON từ AI:', e);
    }
    text = text.replace(jsonRegex, '').trim();
  }

  // Lấy danh sách book object thực tế từ database theo recommendedBookIds
  const matchedBooks = meta.recommendedBookIds
    .map(id => allBooks.find(b => String(b._id || b.id) === String(id)))
    .filter(Boolean);

  return {
    text,
    insightTags: meta.insightTags,
    quote: meta.quote,
    matchReason: meta.matchReason,
    books: matchedBooks
  };
}

/**
 * Engine giám tuyển dự phòng (fallback khi server chưa bật hoặc gặp sự cố mạng)
 */
function fallbackCuratorialResponse(query, allBooks = [], allAuthors = []) {
  const q = (query || '').toLowerCase().trim();

  // 1. Hoàng Tử Bé (bk-03)
  if (
    q.includes('triết học ngắn') ||
    q.includes('giàu chất thơ') ||
    q.includes('tình bạn và nỗi cô đơn') ||
    q.includes('người xa lạ') ||
    q.includes('hoàng tử bé') ||
    q.includes('le petit prince') ||
    q.includes('saint-exupéry') ||
    q.includes('saint exupery')
  ) {
    const prince = allBooks.find(b => (b._id || b.id) === 'bk-03') || allBooks[2];
    return {
      insightTags: 'Phân tích ngữ cảnh: Hiện sinh học • Ngụ ngôn triết lý • Thi vị hóa nỗi cô đơn • Kết nối đồng loại',
      text: `Một sự đối chiếu vô cùng tinh tế. Nếu bạn tìm kiếm một tác phẩm ngắn gọn nhưng chạm đến tầng sâu thẳm của sự hiện sinh và các mối quan hệ con người, tôi xin trân trọng đề xuất kiệt tác triết học - thi ca đẹp nhất của thế kỷ 20: **“Le Petit Prince” (Hoàng Tử Bé)** của Antoine de Saint-Exupéry.\n\nTác phẩm đối thoại dịu dàng với nỗi cô đơn vũ trụ, mang đến câu trả lời thông qua khái niệm *“cảm hóa” (apprivoiser)* — biến sự tồn tại giữa muôn triệu vì sao trở nên có ý nghĩa thiêng liêng và không thể thay thế.`,
      quote: `“On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.”\n(Người ta chỉ nhìn thấy rõ ràng bằng trái tim. Điều cốt lõi vô hình trước đôi mắt trần tục.)`,
      matchReason: `Đối trọng lại nỗi xa cách nghiệt ngã bằng một cuộc thám hiểm ngụ ngôn dịu dàng, tái sinh niềm tin vào tình bạn và trách nhiệm đối với điều mình yêu thương.`,
      layout: 'hero',
      books: prince ? [prince] : []
    };
  }

  // 2. 1984 & Kafka Hóa Thân (bk-01, bk-07)
  if (
    q.includes('dystopia') ||
    q.includes('toàn trị') ||
    q.includes('giám sát') ||
    q.includes('thao túng') ||
    q.includes('tha hóa') ||
    q.includes('1984') ||
    q.includes('orwell') ||
    q.includes('kafka') ||
    q.includes('hóa thân')
  ) {
    const book1984 = allBooks.find(b => (b._id || b.id) === 'bk-01') || allBooks[0];
    const kafka = allBooks.find(b => (b._id || b.id) === 'bk-07') || allBooks[6];
    return {
      insightTags: 'Phân tích ngữ cảnh: Totalitarianism • Surveillance state • Alienation & Absurdity • Critical dystopian canon',
      text: `Khi bàn về sự tha hóa dưới gông cùm cơ chế hoặc bộ máy quyền lực chuyên chế, văn học thế giới có hai đỉnh cao kinh điển tiếp cận từ hai quy mô khác nhau: **tập thể toàn trị vĩ mô** (*1984*) và **nỗi bi kịch tha hóa cá nhân vi mô** (*Die Verwandlung*). Tôi xin đề cử bộ đôi tác phẩm mang tính thức tỉnh mạnh mẽ nhất:`,
      quote: `“Big Brother is watching you.” — Khắc họa sự áp chế tinh vi lên nhận thức và tự do căn bản của con người.`,
      matchReason: `Cảnh báo trực diện về sự xói mòn nhân tính khi con người bị biến thành bánh răng trong guồng máy cơ giới hóa và kiểm soát tuyệt đối.`,
      layout: 'bento',
      books: [book1984, kafka].filter(Boolean)
    };
  }

  // 3. Văn học hiện thực phê phán Việt Nam (Chí Phèo bk-11, Sống Mòn bk-12)
  if (
    q.includes('việt nam') ||
    q.includes('nam cao') ||
    q.includes('chí phèo') ||
    q.includes('sống mòn') ||
    q.includes('1930') ||
    q.includes('hiện thực phê phán')
  ) {
    const chiPheo = allBooks.find(b => (b._id || b.id) === 'bk-11');
    const songMon = allBooks.find(b => (b._id || b.id) === 'bk-12');
    return {
      insightTags: 'Phân tích ngữ cảnh: Văn học hiện thực phê phán 1930–1945 • Bi kịch lưu manh hóa • Nỗi đau trí thức tiểu tư sản • Tinh hoa văn chương Nam Cao',
      text: `Văn học hiện thực phê phán Việt Nam giai đoạn 1930–1945 đã đạt đến tầm vóc phân tích tâm lý mẫu mực thông qua ngòi bút của văn hào Nam Cao. Thay vì chỉ phản ánh cảnh ngộ bần cùng bên ngoài, ông đi sâu vào sự hủy diệt nhân phẩm và khát khao lương tri cháy bỏng. Tôi gợi ý hai kiệt tác trụ cột:`,
      quote: `“Ai cho tao lương thiện? Làm thế nào cho mất được những vết mảnh chai trên mặt này?” — Nỗi niềm bi tráng về nhân phẩm của Chí Phèo.`,
      matchReason: `Lột tả chân thực tấn bi kịch bị tước đoạt quyền làm người của nông dân và nỗi đau mòn mỏi bế tắc của người trí thức trước Cách mạng.`,
      layout: 'bento',
      books: [chiPheo, songMon].filter(Boolean)
    };
  }

  // 4. Hiện thực huyền ảo Mỹ Latinh (García Márquez: Trăm năm cô đơn bk-09, bk-10)
  if (
    q.includes('mỹ latinh') ||
    q.includes('huyền ảo') ||
    q.includes('thời gian') ||
    q.includes('márquez') ||
    q.includes('marquez') ||
    q.includes('trăm năm cô đơn') ||
    q.includes('macondo')
  ) {
    const cienAnos = allBooks.find(b => (b._id || b.id) === 'bk-09');
    const coronel = allBooks.find(b => (b._id || b.id) === 'bk-10');
    return {
      insightTags: 'Phân tích ngữ cảnh: Hiện thực huyền ảo (Magic Realism) • Thời gian tuần hoàn • Lịch sử Macondo • Văn hào đoạt giải Nobel',
      text: `Chào mừng bạn đến với thế giới của chủ nghĩa hiện thực huyền ảo Mỹ Latinh — nơi ranh giới giữa huyền thoại, ký ức và hiện thực hòa vào nhau trong dòng chảy vô tận của thời gian. Đại diện tiêu biểu nhất chính là đại văn hào Gabriel García Márquez với huyền thoại làng Macondo.`,
      quote: `“Nhiều năm sau này, trước đội hành quyết, Đại tá Aureliano Buendía sẽ nhớ lại buổi chiều xa xăm khi cha ông dẫn đi xem nước đá.”`,
      matchReason: `Bản giao hưởng kỳ vĩ về nỗi cô đơn định mệnh của một dòng họ và sự trôi chảy không thể đảo ngược của lịch sử châu Mỹ Latinh.`,
      layout: 'bento',
      books: [cienAnos, coronel].filter(Boolean)
    };
  }

  // 5. Tác giả
  const matchedAuthor = allAuthors.find(a =>
    q.includes(a.name?.toLowerCase()) || (a.notableThemes && a.notableThemes.some(t => q.includes(t.toLowerCase())))
  );

  if (matchedAuthor) {
    const authorBooks = allBooks.filter(b => b.authorId === (matchedAuthor._id || matchedAuthor.id)).slice(0, 2);
    return {
      insightTags: `Phân tích phong cách: Tác giả ${matchedAuthor.name} • ${matchedAuthor.specialization || 'Cổ điển thế giới'}`,
      text: `Về văn hào **${matchedAuthor.name}** (${matchedAuthor.nationality || 'Thế giới'}), đây là một trong những tượng đài văn chương có phong cách thẩm mỹ và tư tưởng độc đáo. ${matchedAuthor.bio || ''}\n\nDưới đây là các tác phẩm tiêu biểu của ông đang được lưu trữ nguyên bản trong thư viện BookBridge:`,
      quote: `“Văn chương là chiếc cầu nối giữa những tâm hồn đang kiếm tìm chân lý.”`,
      matchReason: `Khám phá trọn vẹn văn phong và tư tưởng của ${matchedAuthor.name}.`,
      layout: authorBooks.length > 1 ? 'bento' : 'hero',
      books: authorBooks
    };
  }

  // 6. Thể loại hoặc câu hỏi chung
  const matchedByGenre = allBooks.filter(b =>
    q.includes(b.genre?.toLowerCase()) ||
    (b.themes && b.themes.some(t => q.includes(t.toLowerCase()))) ||
    (b.title && q.includes(b.title.toLowerCase()))
  ).slice(0, 2);

  if (matchedByGenre.length > 0) {
    return {
      insightTags: `Phân tích chuyên đề: ${matchedByGenre[0].genre} • Chủ đề tương hợp • Ấn bản lưu trữ tuyển chọn`,
      text: `Dựa trên sở thích và từ khóa bạn vừa chia sẻ, hệ thống lưu trữ BookBridge xin trân trọng giới thiệu những ấn bản đối khớp tốt nhất với gu thưởng thức của bạn:`,
      quote: `“Mỗi cuốn sách là một thế giới đang chờ bạn khai mở.”`,
      matchReason: `Sự tương hợp cao về cảm xúc, phong cách kể chuyện và giá trị tư tưởng.`,
      layout: matchedByGenre.length > 1 ? 'bento' : 'hero',
      books: matchedByGenre
    };
  }

  const randomPicks = allBooks.slice(0, 2);
  return {
    insightTags: 'Phân tích ngữ cảnh: Đàm đạo văn chương • Gợi ý khởi đầu',
    text: `Chào bạn, câu hỏi của bạn rất gợi mở. Trong không gian giám tuyển BookBridge, mỗi tác phẩm là một cuộc đối thoại giữa tác giả và nội tâm người đọc. Dưới đây là hai tác phẩm kinh điển tiêu biểu trong kho tàng lưu trữ:`,
    quote: `“Bridge Worlds, Discover Voices Through Books” — BookBridge`,
    matchReason: `Tác phẩm đại diện cho chiều sâu tư tưởng và giá trị nhân bản trường tồn.`,
    layout: 'bento',
    books: randomPicks
  };
}

export const aiService = {
  /**
   * Gửi tin nhắn đến AI Concierge thông qua backend server (/api/ai/chat)
   * Backend sẽ sử dụng GEMINI_API_KEY cấu hình trong server/.env
   */
  async sendMessage({ userMessage, history = [], allBooks = [], allAuthors = [] }) {
    // Chuẩn bị tóm tắt thư viện cho Gemini
    const catalogSummary = allBooks.slice(0, 25).map(b => {
      const author = allAuthors.find(a => (a._id || a.id) === b.authorId);
      return `- ID: "${b._id || b.id}", Tựa đề: "${b.title}", Tác giả: "${author?.name || 'Vô danh'}", Thể loại: "${b.genre}", Thời kỳ: "${b.period}", Tóm tắt: "${(b.synopsis || '').slice(0, 150)}..."`;
    }).join('\n');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: history.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text
          })),
          catalogSummary
        })
      });

      if (response.ok) {
        const result = await response.json();
        const generatedText = result?.data?.text;

        if (generatedText) {
          const parsed = parseAiResponse(generatedText, allBooks);
          return {
            ...parsed,
            isLiveAi: true,
            layout: parsed.books.length === 1 ? 'hero' : 'bento'
          };
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn('[AI Backend Response Warning]', errJson);
      }
    } catch (err) {
      console.warn('[AI Service Network Notice]', err.message);
    }

    // Fallback mượt mà nếu kết nối backend hoặc Gemini tạm thời chậm
    const fallback = fallbackCuratorialResponse(userMessage, allBooks, allAuthors);
    return {
      ...fallback,
      isLiveAi: false
    };
  }
};
