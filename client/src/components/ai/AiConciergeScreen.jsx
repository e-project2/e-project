import React, { useState, useRef, useEffect } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { aiService } from '../../services/aiService.js';
import { Icon } from '../common/Icon.jsx';

export function AiConciergeScreen({ onNavigate, onSelectBook, onSelectAuthor, onOpenReader }) {
  const { books, authors } = useBooks();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const conversationEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  // Suggested Curatorial Inquiries theo đúng thiết kế Stitch
  const suggestedInquiries = [
    {
      id: 'inq-1',
      title: 'Tôi muốn đọc một cuốn sách triết học ngắn, giàu chất thơ về tình bạn và nỗi cô đơn.'
    },
    {
      id: 'inq-2',
      title: 'Tìm tác phẩm dystopia u uất cảnh báo về sự giám sát và thao túng tâm lý.'
    },
    {
      id: 'inq-3',
      title: 'Gợi ý tiểu thuyết hiện thực phê phán Việt Nam sâu sắc thời kỳ 1930–1945.'
    },
    {
      id: 'inq-4',
      title: 'Sách hiện thực huyền ảo Mỹ Latinh mang đậm âm hưởng thời gian vô tận.'
    }
  ];

  // Quick Tags
  const quickTags = [
    '#HiệnSinh',
    '#Dystopian',
    '#HiệnThựcHuyềnẢo',
    '#VănHọcViệtNam',
    '#TriếtHọcThiCa',
    '#Kafkaesque',
    '#TâmLýChiềuSâu',
    '#ThờiKỳHiệnĐại'
  ];

  // Bắt đầu sạch sẽ chỉ với lời chào đón từ BookBridge Concierge (đã xóa các lượt chat mẫu)
  const [messages, setMessages] = useState([
    {
      id: 'msg-system-welcome',
      sender: 'assistant',
      time: 'Hôm nay',
      insightTags: 'Khởi đầu đàm đạo • Giám tuyển văn học đa ngôn ngữ • Thư tịch thế giới',
      text: 'Chào mừng bạn đến với không gian đàm đạo văn chương BookBridge. Tôi là trợ lý giám tuyển văn học đa ngôn ngữ, sẵn sàng giúp bạn lần theo những sợi chỉ tư tưởng giữa các nền văn học Á - Âu - Mỹ Latinh. Hãy cho tôi biết cảm xúc hoặc một tác phẩm bạn vừa khép lại để bắt đầu hành trình tiếp theo.'
    }
  ]);

  // Cuộn mượt mà xuống cuối hội thoại khi có tin nhắn mới
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Khởi tạo SpeechRecognition nếu trình duyệt hỗ trợ
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'vi-VN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, []);

  const triggerToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleBookmark = (book) => {
    if (!book) return;
    const bookId = book._id || book.id;
    const wasFavorite = isFavorite(bookId);
    toggleFavorite(bookId);
    triggerToast(
      wasFavorite
        ? `Đã bỏ lưu "${book.title}" khỏi giá sách cá nhân.`
        : `Đã lưu "${book.title}" vào giá sách cá nhân.`
    );
  };

  const handleVoiceInput = () => {
    if (!speechRecognitionRef.current) {
      triggerToast('Trình duyệt chưa hỗ trợ nhận diện giọng nói (Web Speech API).');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
        triggerToast('Đang lắng nghe giọng nói... Hãy phát biểu ý muốn đọc sách của bạn.');
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleSendQuery = async (queryText) => {
    const query = (queryText || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessageTime = new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());

    const newUserMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      time: userMessageTime,
      text: query
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const result = await aiService.sendMessage({
        userMessage: query,
        history: messages,
        allBooks: books,
        allAuthors: authors
      });

      const assistantMsg = {
        id: `msg-assistant-${Date.now()}`,
        sender: 'assistant',
        time: new Intl.DateTimeFormat('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date()),
        insightTags: result.insightTags,
        text: result.text,
        quote: result.quote,
        matchReason: result.matchReason,
        layout: result.layout || (result.books?.length > 1 ? 'bento' : 'hero'),
        books: result.books,
        bookIds: result.books?.map((b) => b._id || b.id) || []
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error handling AI response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-error-${Date.now()}`,
          sender: 'assistant',
          time: userMessageTime,
          insightTags: 'Thông báo kết nối • Trợ lý giám tuyển BookBridge',
          text: `Đã có lỗi xảy ra khi xử lý phản hồi (${err.message}). Bạn vui lòng thử lại hoặc gửi câu hỏi khác nhé.`
        }
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleResetConversation = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm mới cuộc trò chuyện này để bắt đầu chủ đề mới?')) {
      setMessages([
        {
          id: 'msg-system-welcome',
          sender: 'assistant',
          time: 'Hôm nay',
          insightTags: 'Khởi đầu đàm đạo • Giám tuyển văn học đa ngôn ngữ • Thư tịch thế giới',
          text: 'Chào mừng bạn đến với không gian đàm đạo văn chương BookBridge. Tôi là trợ lý giám tuyển văn học đa ngôn ngữ, sẵn sàng giúp bạn lần theo những sợi chỉ tư tưởng giữa các nền văn học Á - Âu - Mỹ Latinh. Hãy cho tôi biết cảm xúc hoặc một tác phẩm bạn vừa khép lại để bắt đầu hành trình tiếp theo.'
        }
      ]);
      triggerToast('Đã làm mới không gian đàm đạo văn chương.');
    }
  };

  const resolveBook = (bookIdOrObj) => {
    if (!bookIdOrObj) return null;
    if (typeof bookIdOrObj === 'object') return bookIdOrObj;
    return books.find((b) => String(b._id || b.id) === String(bookIdOrObj));
  };

  const resolveAuthor = (authorId) => {
    if (!authorId) return null;
    return authors.find((a) => String(a._id || a.id) === String(authorId));
  };

  return (
    <div className="w-full bg-surface dark:bg-slate-950 min-h-screen text-on-surface dark:text-slate-100 font-body transition-colors">
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
        <div className="w-full max-w-5xl mx-auto flex flex-col space-y-6">

          {/* ========================================================================= */}
          {/* CONCIERGE HEADER CARD (LITERARY MODERNISM EDITORIAL STYLE)                 */}
          {/* ========================================================================= */}
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden border border-border-subtle/70 dark:border-slate-800 transition-all">
            {/* Ambient decorative blur glow */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-surface-container dark:bg-amber-950/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Title & Badges Group */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container dark:bg-slate-800 font-label-sm text-label-sm text-primary dark:text-amber-400 font-semibold shadow-xs">
                      <span className="material-symbols-outlined text-[15px] text-on-tertiary-container dark:text-amber-500">
                        auto_awesome
                      </span>
                      Literary Knowledge Engine
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low dark:bg-slate-800/60 font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
                      <span className="material-symbols-outlined text-[14px]">translate</span>
                      EN • FR • VI • ES • JA • RU
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-label-sm text-label-sm font-semibold border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Gemini AI Active
                    </span>
                  </div>

                  {/* Reset conversation button */}
                  <button
                    type="button"
                    onClick={handleResetConversation}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container dark:bg-slate-800 dark:hover:bg-slate-700 text-on-surface-variant dark:text-slate-300 font-label-sm text-label-sm transition-all cursor-pointer"
                    title="Làm mới cuộc hội thoại"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    <span className="hidden sm:inline">Làm mới</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <h1 className="font-headline-lg text-headline-lg text-primary dark:text-slate-100 tracking-tight font-bold">
                    BookBridge AI Literary Concierge
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 max-w-2xl leading-relaxed">
                    Chia sẻ cảm xúc, tác giả tâm đắc hoặc chủ đề bạn khao khát chiêm nghiệm để nhận những phân tích đa chiều và các ấn bản lưu trữ tinh tuyển.
                  </p>
                </div>
              </div>

              {/* Curatorial Inquiries Section (4 Quick Cards) */}
              <div className="pt-3 border-t border-border-subtle/50 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[16px] text-on-tertiary-container dark:text-amber-500">
                    explore
                  </span>
                  <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-semibold">
                    Suggested Curatorial Inquiries
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedInquiries.map((inq) => (
                    <button
                      key={inq.id}
                      type="button"
                      onClick={() => handleSendQuery(inq.title)}
                      className="inquiry-btn text-left p-3.5 rounded-xl bg-surface-container-low dark:bg-slate-800/70 hover:bg-surface-container dark:hover:bg-slate-800 hover:shadow-xs transition-all text-on-surface dark:text-slate-200 font-body-sm text-body-sm group flex items-start gap-2.5 border border-transparent hover:border-border-subtle dark:hover:border-slate-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-on-tertiary-container dark:text-amber-500 group-hover:translate-x-1 transition-transform mt-0.5 shrink-0">
                        arrow_right_alt
                      </span>
                      <span className="leading-relaxed">{inq.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tags Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-400 mr-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">label</span> Chủ đề gợi mở:
                </span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const cleanText = tag.replace('#', '');
                      handleSendQuery(`Gợi ý cho tôi các tác phẩm đặc sắc thuộc chủ đề: ${cleanText}`);
                    }}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 hover:text-primary dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONVERSATION STREAM                                                       */}
          {/* ========================================================================= */}
          <section className="space-y-8" id="conversation-stream">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div
                    key={msg.id}
                    className="flex items-start justify-end gap-3 sm:gap-4 pl-8 sm:pl-16 animate-fadeIn"
                  >
                    <div className="flex-1 space-y-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-label-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                          {msg.time}
                        </span>
                        <span className="font-label-md text-label-md text-primary dark:text-amber-400 font-bold">
                          Bạn
                        </span>
                      </div>
                      <div className="inline-block text-left p-5 rounded-2xl rounded-tr-sm bg-primary text-on-primary dark:bg-slate-800 dark:text-slate-100 font-body-md text-body-md leading-relaxed shadow-md">
                        {msg.text}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-800 flex items-center justify-center text-primary dark:text-amber-400 shrink-0 font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                  </div>
                );
              }

              // Assistant Message
              const matchedBooks = (msg.bookIds || [])
                .map((id) => resolveBook(id))
                .filter(Boolean);

              const renderBooks = matchedBooks.length > 0 ? matchedBooks : msg.books || [];

              return (
                <div key={msg.id} className="flex items-start gap-3 sm:gap-4 animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary dark:bg-amber-500 dark:text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>

                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md text-primary dark:text-slate-100 font-bold">
                        BookBridge Concierge
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                        {msg.time}
                      </span>
                    </div>

                    {/* AI Synthesized Tags & Insight Pill */}
                    {msg.insightTags && (
                      <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container dark:bg-slate-800/90 text-on-surface dark:text-slate-200 font-label-sm text-[12px] shadow-xs">
                        <span className="material-symbols-outlined text-[15px] text-on-tertiary-container dark:text-amber-500">
                          psychology
                        </span>
                        <span>{msg.insightTags}</span>
                      </div>
                    )}

                    {/* Thoughtful text explanation */}
                    <div className="p-6 rounded-2xl rounded-tl-sm bg-surface-container-lowest dark:bg-slate-900 text-on-surface dark:text-slate-200 font-body-md text-body-md leading-relaxed shadow-sm border border-border-subtle/50 dark:border-slate-800 space-y-3 whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* =============================================================== */}
                    {/* CASE 1: HERO BOOK CARD (FOR SINGLE RECOMMENDATION)              */}
                    {/* =============================================================== */}
                    {renderBooks.length === 1 && (
                      (() => {
                        const book = renderBooks[0];
                        const author = resolveAuthor(book.authorId);
                        const bookIsSaved = isFavorite(book._id || book.id);

                        return (
                          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-md transition-all duration-300 hover:shadow-xl group border border-border-subtle/70 dark:border-slate-800">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                              {/* Book Cover Visual with 2:3 aspect ratio */}
                              <div className="md:col-span-4 flex justify-center">
                                <div className="relative w-44 sm:w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-300 bg-surface-container dark:bg-slate-800">
                                  <img
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    src={book.coverImage || '/favicon.svg'}
                                    onError={(e) => {
                                      e.currentTarget.src = '/favicon.svg';
                                    }}
                                  />
                                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wide">
                                    Archival Folio
                                  </span>
                                </div>
                              </div>

                              {/* Book Details & Literary Attributes */}
                              <div className="md:col-span-8 space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-label-sm text-label-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                    Top Curatorial Match (98%)
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 font-label-sm text-label-sm text-on-surface dark:text-slate-300">
                                    {book.genre || 'Classic'}
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 font-label-sm text-label-sm text-on-surface dark:text-slate-300">
                                    {book.pageCount ? `${book.pageCount} Trang` : 'Ấn bản lưu trữ'}
                                  </span>
                                </div>

                                <div>
                                  <h3
                                    onClick={() => onSelectBook && onSelectBook(book)}
                                    className="font-headline-md text-headline-md text-primary dark:text-slate-100 group-hover:text-secondary dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                                  >
                                    {book.title}
                                  </h3>

                                  <div className="flex items-center gap-2.5 mt-2">
                                    {author?.avatar && (
                                      <img
                                        alt={author.name}
                                        className="w-7 h-7 rounded-full object-cover shadow-xs"
                                        src={author.avatar}
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => onSelectAuthor && author && onSelectAuthor(author)}
                                      className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 font-medium hover:text-primary dark:hover:text-white transition-colors"
                                    >
                                      {author?.name || 'Tác giả BookBridge'}
                                    </button>
                                    <span className="text-on-surface-variant/40 dark:text-slate-600">•</span>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
                                      {book.publicationYear ? `${book.publicationYear}` : 'Cổ điển'}
                                    </span>
                                  </div>
                                </div>

                                {/* Literary Quote in Playfair Display */}
                                {msg.quote && (
                                  <div className="p-3.5 rounded-lg bg-surface-container-low dark:bg-slate-800/60 font-headline-sm italic text-primary dark:text-slate-200 text-[15px] leading-relaxed border-l-2 border-amber-500">
                                    {msg.quote}
                                  </div>
                                )}

                                <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-300">
                                  <strong className="text-primary dark:text-white font-semibold">
                                    Lý do đối khớp hoàn hảo:{' '}
                                  </strong>
                                  {msg.matchReason || book.synopsis}
                                </p>

                                {/* Direct Action CTAs */}
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => onSelectBook && onSelectBook(book)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 font-label-md text-label-md shadow-sm transition-all hover:translate-x-0.5 cursor-pointer font-semibold"
                                  >
                                    <span>Inspect Full Book Details</span>
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                  </button>

                                  {onOpenReader && (
                                    <button
                                      type="button"
                                      onClick={() => onOpenReader(book)}
                                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary text-white hover:bg-secondary/90 font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                      <span>Read Online</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => handleToggleBookmark(book)}
                                    className={`bookmark-trigger inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-label-md text-label-md transition-colors cursor-pointer ${
                                      bookIsSaved
                                        ? 'bg-status-success/10 text-status-success dark:bg-emerald-950/40 dark:text-emerald-400'
                                        : 'bg-surface-container hover:bg-surface-container-high dark:bg-slate-800 dark:hover:bg-slate-700 text-on-surface dark:text-slate-200'
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-[18px]">
                                      {bookIsSaved ? 'bookmark_added' : 'bookmark_add'}
                                    </span>
                                    <span>{bookIsSaved ? 'Saved to Shelf' : 'Save to Shelf'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {/* =============================================================== */}
                    {/* CASE 2: BENTO PAIR CARDS (FOR MULTIPLE BOOK RECOMMENDATIONS)     */}
                    {/* =============================================================== */}
                    {renderBooks.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {renderBooks.map((book) => {
                          const author = resolveAuthor(book.authorId);
                          const bookIsSaved = isFavorite(book._id || book.id);

                          return (
                            <div
                              key={book._id || book.id}
                              className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group border border-border-subtle/70 dark:border-slate-800"
                            >
                              <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                  <div className="w-24 aspect-[2/3] shrink-0 rounded-md overflow-hidden shadow bg-surface-container dark:bg-slate-800">
                                    <img
                                      alt={book.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      src={book.coverImage || '/favicon.svg'}
                                      onError={(e) => {
                                        e.currentTarget.src = '/favicon.svg';
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-1.5 min-w-0">
                                    <div className="flex flex-wrap gap-1">
                                      <span className="px-2 py-0.5 rounded-full bg-surface-container dark:bg-slate-800 font-label-sm text-[11px] text-on-surface dark:text-slate-300 font-semibold">
                                        {book.genre || 'Canon'}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low dark:bg-slate-800/60 font-label-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                                        {book.publicationYear || book.period || 'Classic'}
                                      </span>
                                    </div>
                                    <h4
                                      onClick={() => onSelectBook && onSelectBook(book)}
                                      className="font-headline-sm text-headline-sm text-primary dark:text-slate-100 leading-tight group-hover:text-secondary dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                                    >
                                      {book.title}
                                    </h4>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
                                      {author?.name || 'Tác giả BookBridge'}
                                    </p>
                                    <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 line-clamp-2">
                                      {book.synopsis}
                                    </p>
                                  </div>
                                </div>

                                {book.themes && book.themes.length > 0 && (
                                  <div className="text-[12px] font-body-sm text-on-surface-variant dark:text-slate-400 p-2.5 rounded bg-surface-container-low dark:bg-slate-800/60">
                                    <em>Chủ đề chính:</em> {book.themes.slice(0, 3).join(' • ')}
                                  </div>
                                )}
                              </div>

                              <div className="pt-4 flex items-center justify-between gap-2 border-t border-border-subtle/50 dark:border-slate-800/80">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => onSelectBook && onSelectBook(book)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors cursor-pointer font-semibold"
                                  >
                                    <span>Inspect Details</span>
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                  </button>

                                  {onOpenReader && (
                                    <button
                                      type="button"
                                      onClick={() => onOpenReader(book)}
                                      className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high dark:bg-slate-800 dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 transition-colors cursor-pointer"
                                      title="Read Online"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                    </button>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleToggleBookmark(book)}
                                  className={`bookmark-trigger p-2 rounded-full transition-colors cursor-pointer ${
                                    bookIsSaved
                                      ? 'bg-status-success/15 text-status-success dark:bg-emerald-950/40 dark:text-emerald-400'
                                      : 'bg-surface-container hover:bg-surface-container-high dark:bg-slate-800 dark:hover:bg-slate-700 text-on-surface dark:text-slate-200'
                                  }`}
                                  title={bookIsSaved ? 'Saved to Shelf' : 'Save to Shelf'}
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    {bookIsSaved ? 'bookmark_added' : 'bookmark_add'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* TYPING / THINKING INDICATOR */}
            {isTyping && (
              <div className="flex items-center gap-3 py-3 text-on-surface-variant dark:text-slate-400 font-label-sm text-label-sm animate-pulse">
                <div className="w-9 h-9 rounded-full bg-surface-container dark:bg-slate-800 flex items-center justify-center text-on-tertiary-container dark:text-amber-500 shadow-xs">
                  <span className="material-symbols-outlined text-[18px] animate-spin">cyclone</span>
                </div>
                <span>BookBridge Concierge đang tra cứu hệ thống thư mục lưu trữ & phân tích thi pháp...</span>
              </div>
            )}

            <div ref={conversationEndRef} />
          </section>

          {/* ========================================================================= */}
          {/* CRITERION FILTER DRAWER (WHEN TOGGLED)                                    */}
          {/* ========================================================================= */}
          {showFilterDrawer && (
            <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-4 shadow-lg border border-border-subtle dark:border-slate-800 animate-slideUp">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-subtle/60 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-500">tune</span>
                  Gắn tiêu chí giám tuyển văn học
                </span>
                <button
                  type="button"
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Nguyên tác</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Tiếng Việt', 'English', 'Français', 'Español', '日本語'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setInputQuery((prev) => `${prev} [Ngôn ngữ: ${lang}]`);
                          setShowFilterDrawer(false);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-1 rounded-md bg-surface-container dark:bg-slate-800 hover:bg-amber-500/10 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Thời kỳ & Phong cách</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Hiện sinh', 'Dystopia', 'Hiện thực phê phán', 'Hiện thực huyền ảo', 'Cổ điển'].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => {
                          setInputQuery((prev) => `${prev} [Trường phái: ${style}]`);
                          setShowFilterDrawer(false);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-1 rounded-md bg-surface-container dark:bg-slate-800 hover:bg-amber-500/10 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Dung lượng sách</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Dưới 150 trang (Ngắn)', '150 - 350 trang', 'Trường thiên tiểu thuyết'].map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => {
                          setInputQuery((prev) => `${prev} [Độ dài: ${len}]`);
                          setShowFilterDrawer(false);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-1 rounded-md bg-surface-container dark:bg-slate-800 hover:bg-amber-500/10 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STICKY INPUT BAR (ARCHIVAL CONSOLE)                                       */}
          {/* ========================================================================= */}
          <div className="sticky bottom-4 z-30 pt-2">
            <div className="bg-surface-container-lowest/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 shadow-xl transition-all border border-border-subtle/70 dark:border-slate-800">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
              >
                {/* Left Action Tool: Filter trigger */}
                <button
                  type="button"
                  onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                    showFilterDrawer
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  title="Attach Literary Criterion"
                >
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>

                {/* Main Input Field */}
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    autoComplete="off"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Hỏi chuyên gia gợi ý: Mô tả gu đọc, cảm xúc hôm nay, hoặc tác giả bạn yêu thích..."
                    className="w-full bg-surface-container-low dark:bg-slate-800 text-primary dark:text-slate-100 placeholder:text-on-surface-variant/70 dark:placeholder:text-slate-500 text-body-md font-body-md rounded-full px-5 py-3 outline-none focus:bg-surface-container dark:focus:bg-slate-700/80 transition-all border border-transparent focus:border-border-subtle dark:focus:border-slate-600"
                  />
                </div>

                {/* Audio / Dictate Mic */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  title={isListening ? 'Đang ghi âm giọng nói...' : 'Voice consultation (Thu âm giọng nói)'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isListening ? 'mic' : 'mic_none'}
                  </span>
                </button>

                {/* Amber Primary Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-3 rounded-full bg-on-tertiary-container hover:bg-on-tertiary-container/90 dark:bg-amber-500 dark:hover:bg-amber-400 text-on-primary dark:text-slate-950 font-label-md text-label-md flex items-center gap-1.5 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold"
                >
                  <span>Gửi</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>

              {/* Bottom Disclaimer Footnote */}
              <div className="mt-2.5 px-3 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] font-label-sm text-on-surface-variant dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-on-tertiary-container dark:text-amber-500">
                    verified
                  </span>
                  BookBridge AI provides curated citations and links directly to verified platform book records.
                </span>
                <span className="opacity-80">Enter để gửi inquiry</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOAST NOTIFICATION                                                        */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-primary dark:bg-amber-500 text-on-primary dark:text-slate-950 px-4 py-2.5 rounded-full font-label-sm text-label-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default AiConciergeScreen;
