import path from 'path';
import fs from 'fs';
import dns from 'node:dns';
import { fileURLToPath } from 'url';

// Ưu tiên phân giải IPv4 trên Windows để tránh độ trễ IPv6 khi kết nối Google
dns.setDefaultResultOrder('ipv4first');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Tạo bản tóm tắt danh mục sách từ file books.json & authors.json
 */
function getCatalogSummary() {
  try {
    const booksPath = path.resolve(__dirname, '../../database/data/books.json');
    const authorsPath = path.resolve(__dirname, '../../database/data/authors.json');

    if (fs.existsSync(booksPath) && fs.existsSync(authorsPath)) {
      const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
      const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

      return books.slice(0, 26).map(b => {
        const author = authors.find(a => String(a._id || a.id) === String(b.authorId));
        return `- ID: "${b._id || b.id}", Tựa đề: "${b.title}", Tác giả: "${author?.name || 'Vô danh'}", Thể loại: "${b.genre}", Thời kỳ: "${b.period}", Tóm tắt: "${(b.synopsis || '').slice(0, 150)}..."`;
      }).join('\n');
    }
  } catch (err) {
    console.warn('[AI Controller] Lỗi khi nạp danh mục sách:', err.message);
  }
  return '';
}

/**
 * System instruction cho Gemini AI
 */
function buildSystemInstruction(catalogSummary) {
  return `Bạn là "BookBridge Concierge" - Trợ lý giám tuyển văn học đa ngôn ngữ cấp cao của nền tảng BookBridge (theo phong cách Literary Modernism: uyên bác, tao nhã, ấm áp, sâu sắc và giàu chất thơ).

Mục tiêu của bạn:
1. Đàm thoại văn chương, lắng nghe cảm xúc, gu thẩm mỹ và mong muốn đọc sách của độc giả.
2. Phân tích ngữ cảnh và các trào lưu triết học, thi pháp văn học thế giới (Hiện sinh, Hiện thực phê phán, Dystopia, Hiện thực huyền ảo, Lãng mạn, v.v.).
3. Đối chiếu và đề cử những tác phẩm tinh hoa từ Thư tịch BookBridge.

Danh mục sách lưu trữ trong hệ thống BookBridge hiện nay gồm có:
${catalogSummary}

Định dạng phản hồi yêu cầu:
Hãy trả về câu trả lời bằng tiếng Việt tao nhã. Ở cuối phản hồi, hãy đính kèm một khối JSON đặc biệt nằm giữa 2 thẻ :::RECOMMENDATIONS_JSON::: và :::END_JSON::: với cấu trúc:
:::RECOMMENDATIONS_JSON:::
{
  "insightTags": "Phân tích ngữ cảnh: Từ khóa 1 • Từ khóa 2 • Từ khóa 3",
  "recommendedBookIds": ["bk-01", "bk-02"],
  "quote": "Một câu trích dẫn tiêu biểu từ tác phẩm",
  "matchReason": "Lý do đối khớp với gu đọc của người dùng"
}
:::END_JSON:::
`;
}

/**
 * Chuẩn hóa lịch sử đàm thoại theo đúng quy định của Gemini API:
 * 1. Luôn bắt đầu bằng lượt của 'user' (bỏ qua lời chào đón ban đầu của 'model')
 * 2. Luôn luân phiên tuần tự user -> model -> user -> model -> user
 * 3. Lượt cuối cùng luôn là câu hỏi hiện tại của user
 */
function normalizeContents(history, currentMessage) {
  const contents = [];

  // Lọc lấy các tin nhắn hợp lệ
  const validHistory = (history || [])
    .filter(h => h && h.text && typeof h.text === 'string' && h.text.trim())
    .map(h => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text.trim() }]
    }));

  // Bắt buộc cuộc hội thoại phải bắt đầu bằng 'user' (Gemini API yêu cầu)
  while (validHistory.length > 0 && validHistory[0].role !== 'user') {
    validHistory.shift();
  }

  // Đảm bảo luân phiên luân phiên user/model
  for (const item of validHistory) {
    if (contents.length === 0) {
      contents.push(item);
    } else if (contents[contents.length - 1].role !== item.role) {
      contents.push(item);
    } else {
      // Hợp nhất nếu 2 lượt liên tiếp cùng role
      contents[contents.length - 1].parts[0].text += '\n\n' + item.parts[0].text;
    }
  }

  // Gắn câu hỏi hiện tại của user vào cuối
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += '\n\n' + currentMessage.trim();
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: currentMessage.trim() }]
    });
  }

  // Giữ lại tối đa 8 lượt gần nhất để tối ưu token
  return contents.slice(-8);
}

/**
 * Trích xuất text từ response của Gemini
 */
function extractTextFromCandidate(candidate) {
  if (!candidate?.content?.parts) return '';
  const parts = candidate.content.parts;
  
  // Lọc các phần có text thực (loại bỏ phần suy nghĩ nội bộ nếu có)
  const regularParts = parts.filter(p => p.text && !p.thought);
  if (regularParts.length > 0) {
    return regularParts.map(p => p.text).join('\n').trim();
  }
  
  return parts.filter(p => p.text).map(p => p.text).join('\n').trim();
}

/**
 * GET /api/ai/status
 * Kiểm tra trạng thái kết nối với Gemini API
 */
export async function handleAiStatus(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      status: 'unconfigured',
      connected: false,
      message: 'Chưa cấu hình GEMINI_API_KEY trong file server/.env'
    });
  }

  const model = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
  const t0 = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Ping test' }] }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const latencyMs = Date.now() - t0;
    const data = await response.json();

    if (response.ok && data.candidates?.[0]) {
      return res.status(200).json({
        status: 'healthy',
        connected: true,
        model,
        latencyMs,
        message: 'Kết nối Google Gemini API hoạt động hoàn hảo!',
        sampleText: extractTextFromCandidate(data.candidates[0]).slice(0, 100)
      });
    } else {
      return res.status(200).json({
        status: 'degraded',
        connected: false,
        model,
        latencyMs,
        statusCode: response.status,
        error: data.error?.message || 'Gemini phản hồi lỗi'
      });
    }
  } catch (err) {
    return res.status(200).json({
      status: 'error',
      connected: false,
      model,
      latencyMs: Date.now() - t0,
      error: err.message
    });
  }
}

/**
 * POST /api/ai/chat
 * Xử lý yêu cầu trò chuyện văn học và đề xuất sách thông qua Google Gemini API
 */
export async function handleAiChat(req, res) {
  try {
    const { message, history = [], catalogSummary: clientSummary } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Nội dung tin nhắn (message) không hợp lệ.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Chưa cấu hình GEMINI_API_KEY trong file server/.env.'
      });
    }

    const catalogSummary = clientSummary || getCatalogSummary();
    const systemInstruction = buildSystemInstruction(catalogSummary);
    const contents = normalizeContents(history, message);

    // Danh sách model ưu tiên thử nghiệm (mô hình nhanh và ổn định nhất lên đầu)
    const candidateModels = [
      process.env.GEMINI_MODEL,
      'gemini-flash-lite-latest',
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash',
      'gemini-flash-latest'
    ].filter(Boolean);

    const modelsToTry = [...new Set(candidateModels)];

    let lastError = null;
    let generatedText = null;
    let successfulModel = null;

    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000); // 12 giây timeout cho mỗi model

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500
            }
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const candidate = data?.candidates?.[0];
          generatedText = extractTextFromCandidate(candidate);

          if (generatedText) {
            successfulModel = model;
            break;
          }
        } else {
          const err = await response.json().catch(() => ({}));
          lastError = err.error?.message || `Lỗi từ Gemini API (status ${response.status})`;
          console.warn(`[AI Controller] Model ${model} trả về lỗi HTTP ${response.status}:`, lastError);
        }
      } catch (err) {
        lastError = err.message;
        console.warn(`[AI Controller] Model ${model} gặp lỗi mạng/timeout:`, err.message);
      }
    }

    if (!generatedText) {
      return res.status(502).json({
        success: false,
        message: lastError || 'Không thể tạo phản hồi từ Gemini API.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        text: generatedText,
        model: successfulModel
      }
    });
  } catch (error) {
    console.error('[AI Controller Unhandled Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Lỗi máy chủ nội bộ khi xử lý AI chat'
    });
  }
}
