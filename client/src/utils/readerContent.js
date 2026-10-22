/**
 * readerContent.js
 * 
 * Utility to process, format, and provide rich readable pages & chapters
 * for the BookBridge Online E-Reader & Live Reading Tracker.
 */

// Authentic curated chapter contents for key flagship classics
const flagshipChapters = {
  'bk-01': [
    {
      chapterNumber: 1,
      title: 'Chương 1: Đồng hồ điểm mười ba giờ',
      pages: [
        {
          pageNumber: 1,
          content: `Đó là một ngày tháng Tư lạnh lẽo và tươi sáng, và những chiếc đồng hồ đang điểm mười ba giờ. Winston Smith, với chiếc cằm nép chặt vào ngực để tránh ngọn gió buốt giá, lẻn nhanh qua cánh cửa kính của Tòa nhà Chiến Thắng, nhưng vẫn không đủ nhanh để ngăn một làn bụi cát xoáy cuốn theo mình vào sảnh.

Hành lang nồng nặc mùi bắp cải luộc và những tấm thảm giẻ rách cũ kỹ. Ở cuối hành lang, một tấm áp phích màu lớn, quá cỡ so với không gian trong nhà, được đính chặt vào tường. Tấm áp phích chỉ vẽ một khuôn mặt khổng lồ, rộng hơn một mét: khuôn mặt của một người đàn ông khoảng bốn mươi lăm tuổi, với bộ ria mép đen rậm rạp và những đường nét thô ráp nhưng điển trai. Winston bước về phía cầu thang. Chẳng ích gì khi thử đi thang máy; ngay cả vào thời điểm tốt nhất, nó cũng hiếm khi hoạt động, và hiện tại nguồn điện bị cắt trong giờ ban ngày. Đó là một phần của chiến dịch tiết kiệm để chuẩn bị cho Tuần lễ Hận thù.`
        },
        {
          pageNumber: 2,
          content: `Căn hộ của anh ở tầng bảy, và Winston, đã ba mươi chín tuổi và có một vết loét do giãn tĩnh mạch ở trên mắt cá chân phải, đi lên rất chậm rãi, dừng lại nghỉ nhiều lần trên đường lên. Trên mỗi chiếu nghỉ, đối diện với giếng thang máy, tấm áp phích có khuôn mặt khổng lồ ấy lại nhìn chằm chằm từ bức tường. Đó là một trong những bức chân dung được vẽ khéo léo đến mức đôi mắt luôn dõi theo bạn bất kể bạn di chuyển về hướng nào.

Dưới bức chân dung là dòng chữ lớn:
ANH CẢ ĐANG QUAN SÁT BẠN (BIG BROTHER IS WATCHING YOU).

Bên trong căn hộ, một giọng nói êm dịu đang đọc một danh sách các con số liên quan đến sản lượng gang thép. Giọng nói phát ra từ một tấm kim loại hình bầu dục giống như một tấm gương mờ, là một phần của bề mặt bức tường bên phải. Winston vặn một chiếc công tắc và giọng nói giảm đi phần nào, mặc dù các từ ngữ vẫn có thể phân biệt được. Chiếc máy này (gọi là màn hình thu-phát/telescreen) có thể vặn nhỏ âm lượng, nhưng không có cách nào để tắt nó hoàn toàn.`
        },
        {
          pageNumber: 3,
          content: `Anh bước tới bên cửa sổ: một vóc dáng nhỏ thó, mỏng manh, sự gầy gò của cơ thể anh chỉ càng thêm nổi bật bởi bộ áo liền quần màu xanh da trời, đồng phục của Đảng Ngoài. Tóc anh rất sáng màu, khuôn mặt ửng đỏ tự nhiên, da anh sần sùi vì xà phòng thô ráp, lưỡi dao cạo cùn và cái lạnh của mùa đông vừa kết thúc.

Bên ngoài, ngay cả qua khung cửa kính đóng kín, thế giới dường như vẫn lạnh ngắt. Dưới đường phố, những cơn gió lốc nhỏ đang cuốn rác và giấy vụn thành hình xoắn ốc, và mặc dù mặt trời đang chiếu sáng và bầu trời có màu xanh gay gắt, dường như chẳng có màu sắc nào trong bất cứ thứ gì ngoại trừ những tấm áp phích dán khắp nơi. Khuôn mặt có ria mép đen nhìn xuống từ mọi góc phố nổi bật. Có một tấm ngay trên mặt tiền của cửa hàng đối diện. ĐÔI MẮT ĐEN DÕI THẲNG VÀO MẮT WINSTON.

Từ xa, một chiếc trực thăng lướt xuống giữa các mái nhà, bay lượn lờ trong giây lát như một con ruồi xanh khổng lồ, rồi lại vút đi theo đường cong. Đó là đội tuần tra của cảnh sát, đang tò mò dòm ngó qua cửa sổ phòng của người dân. Nhưng đội tuần tra chẳng có gì đáng sợ. Điều đáng sợ thực sự là CẢNH SÁT TƯ TƯỞNG (THOUGHT POLICE).`
        }
      ]
    }
  ],

  'bk-02': [
    {
      chapterNumber: 1,
      title: 'Chương 1: Giấc mơ của Heo Thủ Lĩnh (Old Major)',
      pages: [
        {
          pageNumber: 1,
          content: `Ông Jones, chủ Trại Điền Trang (Manor Farm), đã khóa chuồng gà cẩn thận cho đêm tối, nhưng vì quá say rượu nên ông quên đóng các lỗ thông hơi. Với chùm ánh sáng đèn bão chao đảo từ tay, ông lảo đảo đi qua sân, cởi ủng ở cửa sau, rót cho mình ly bia cuối cùng từ thùng ở chạn bát rồi leo lên giường, nơi bà Jones đã ngáy say sưa.

Ngay khi ánh đèn trong phòng ngủ tắt ngấm, một sự náo động và xôn xao lập tức rộ lên khắp các tòa nhà trong trang trại. Ban ngày, tin tức đã lan truyền rằng Heo Thủ Lĩnh (Old Major), chú heo nọc giống Trung Hoa lông trắng từng đoạt giải thưởng, đã có một giấc mơ kỳ lạ vào đêm hôm trước và muốn chia sẻ nó với tất cả loài vật.`
        },
        {
          pageNumber: 2,
          content: `Mọi con vật bắt đầu tề tựu đông đủ trong nhà kho lớn. Ở đầu nhà kho, trên một bục cao hơn, Thủ Lĩnh đã yên vị trên ổ rơm của mình, dưới ngọn đèn lồng treo trên xà nhà. Chú đã mười hai tuổi và gần đây đã trở nên khá béo tốt, nhưng chú vẫn là một chú heo oai vệ, với vẻ ngoài khôn ngoan và nhân từ.

Khi tất cả đã ổn định chỗ ngồi, Thủ Lĩnh hắng giọng và cất tiếng:
"Các đồng chí! Các bạn đã nghe về giấc mơ kỳ lạ mà tôi đã mơ đêm qua. Nhưng tôi sẽ nói về giấc mơ đó sau. Tôi có một điều khác muốn nói trước. Tôi không nghĩ, các đồng chí ạ, rằng tôi sẽ còn ở bên các bạn lâu nữa. Và trước khi chết, tôi cảm thấy có bổn phận phải truyền đạt lại cho các bạn những hiểu biết sâu sắc mà tôi đã đúc kết được trong cuộc đời."`
        },
        {
          pageNumber: 3,
          content: `"Bản chất cuộc sống của loài vật chúng ta là gì? Chúng ta hãy nhìn thẳng vào sự thật: Cuộc sống của chúng ta là nỗi khốn cùng, sự nhọc nhằn và ngắn ngủi. Chúng ta sinh ra, chúng ta chỉ được cho đủ lượng thức ăn để giữ cho hơi thở không tàn lụi; và những ai trong chúng ta còn có khả năng làm việc đều bị ép buộc phải lao động đến giọt sức lực cuối cùng; rồi ngay khoảnh khắc sự hữu dụng của chúng ta kết thúc, chúng ta bị tàn sát với sự tàn bạo ghê tởm nhất.

Tại sao tình trạng này lại tiếp diễn? Bởi vì gần như toàn bộ thành quả lao động của chúng ta đã bị CON NGƯỜI cướp đoạt! Con người là sinh vật duy nhất tiêu thụ mà không sản xuất. Họ không cho sữa, không đẻ trứng, quá yếu để kéo cày, chạy không đủ nhanh để bắt thỏ. Thế nhưng họ là chủ nhân của tất cả các loài vật!

Lời giải đáp cho mọi vấn đề của chúng ta nằm ở một từ duy nhất: CON NGƯỜI. Hãy loại bỏ Con người khỏi hiện trường, và nguyên nhân gốc rễ của sự đói nghèo và lao dịch quá sức sẽ bị xóa bỏ vĩnh viễn!"`
        }
      ]
    }
  ],

  'bk-03': [
    {
      chapterNumber: 1,
      title: 'Chương 1: Bức tranh trăn nuốt voi & Sa mạc Sahara',
      pages: [
        {
          pageNumber: 1,
          content: `Hồi lên sáu tuổi, có một lần tôi nhìn thấy một bức tranh tuyệt đẹp trong một cuốn sách viết về Rừng Nguyên sinh, nhan đề là 'Những Câu Chuyện Có Thật'. Bức tranh vẽ một con trăn lớn đang nuốt chửng một con thú dữ. Cuốn sách viết: 'Những con trăn nuốt trọn con mồi mà không cần nhai. Sau đó chúng không thể cử động được nữa và ngủ suốt sáu tháng trời để tiêu hóa.'

Tôi đã suy nghĩ rất nhiều về những cuộc phiêu lưu trong rừng rậm, và đến lượt mình, với một chiếc bút chì màu, tôi đã vẽ được bức tranh đầu tiên của đời tôi. Bức tranh Số Một của tôi. Nó như thế này: một hình thoi phình to ở giữa và thon nhọn ở hai đầu.

Tôi mang kiệt tác của mình cho người lớn xem và hỏi họ xem bức tranh có làm họ sợ không.
Họ trả lời tôi: 'Tại sao một cái mũ lại làm người ta sợ?'
Bức tranh của tôi không hề vẽ một cái mũ. Nó vẽ một con trăn đang tiêu hóa một con voi!`
        },
        {
          pageNumber: 2,
          content: `Thế là tôi vẽ phần bên trong của con trăn, để người lớn có thể hiểu rõ. Người lớn bao giờ cũng cần được giải thích mọi chuyện. Bức tranh Số Hai của tôi cho thấy chú voi đang nằm gọn bên trong bụng trăn.

Người lớn khuyên tôi nên gạt những bức vẽ trăn mở bụng hay trăn kín bụng sang một bên, và dành sự quan tâm cho địa lý, lịch sử, toán học và ngữ pháp. Thế là, vào năm sáu tuổi, tôi đã từ bỏ một sự nghiệp hội họa huy hoàng. Sự thất bại của Bức tranh Số Một và Bức tranh Số Hai đã làm tôi nản lòng. Người lớn chẳng bao giờ tự mình hiểu được điều gì, và thật mệt mỏi cho trẻ con cứ phải liên tục giải thích đi giải thích lại cho họ.`
        },
        {
          pageNumber: 3,
          content: `Vì thế, tôi lớn lên cô độc, không có ai để thực sự trò chuyện, cho đến một ngày máy bay của tôi gặp sự cố rơi xuống sa mạc Sahara, sáu năm về trước. Một chi tiết nào đó trong động cơ đã bị gãy. Và vì tôi không mang theo thợ máy hay hành khách nào, tôi phải tự mình thực hiện một công việc sửa chữa vô cùng khó khăn. Đối với tôi, đó là vấn đề sống còn: tôi chỉ có đủ nước uống cho tám ngày.

Đêm đầu tiên, tôi ngủ thiếp đi trên cát, cách xa mọi vùng đất có người ở cả ngàn dặm. Tôi còn cô độc hơn một kẻ đắm tàu trôi dạt trên chiếc bè giữa đại dương. Vì thế, bạn có thể hình dung được sự ngạc nhiên tột cùng của tôi, khi bình minh vừa ló rạng, một giọng nói nhỏ bé kỳ lạ đã đánh thức tôi dậy:

'Làm ơn... hãy vẽ cho tôi một con cừu!'`
        }
      ]
    }
  ]
};

/**
 * Trả về danh sách trang sách đầy đủ cho bất kỳ cuốn sách nào.
 * Nếu sách đã có sẵn chapters trong DB/data, sử dụng chapters đó.
 * Nếu sách chưa có chapters, tự động kiến tạo các trang trích đoạn nghệ thuật (5-7 trang)
 * dựa trên bối cảnh, chủ đề, tựa đề và tóm tắt của cuốn sách.
 */
export function getBookReadingContent(book) {
  if (!book) return { chapters: [], pages: [], totalPages: 0 };

  const bookId = book._id || book.id;

  // 1. Kiểm tra nếu có sẵn trong danh mục chuẩn soạn sẵn
  if (flagshipChapters[bookId]) {
    const chapters = flagshipChapters[bookId];
    const pages = [];
    chapters.forEach(ch => {
      ch.pages.forEach(p => {
        pages.push({
          ...p,
          chapterNumber: ch.chapterNumber,
          chapterTitle: ch.title,
          bookTitle: book.title,
          authorName: book.authorName || book.author
        });
      });
    });
    return {
      chapters,
      pages,
      totalPages: pages.length
    };
  }

  // 2. Kiểm tra nếu trong đối tượng book từ DB có trường chapters
  if (Array.isArray(book.chapters) && book.chapters.length > 0) {
    const pages = [];
    book.chapters.forEach(ch => {
      if (Array.isArray(ch.pages) && ch.pages.length > 0) {
        ch.pages.forEach(p => {
          pages.push({
            ...p,
            chapterNumber: ch.chapterNumber || 1,
            chapterTitle: ch.title || `Chương ${ch.chapterNumber || 1}`,
            bookTitle: book.title,
            authorName: book.authorName || book.author
          });
        });
      }
    });

    if (pages.length > 0) {
      return {
        chapters: book.chapters,
        pages,
        totalPages: pages.length
      };
    }
  }

  // 3. Dynamic Synthesizer: Tạo trải nghiệm đọc tương tác phong phú cho mọi sách khác
  const themesText = Array.isArray(book.themes) && book.themes.length > 0
    ? book.themes.join(' • ')
    : 'Triết lý nhân sinh, giá trị thời đại';
  
  const authorName = book.authorName || book.author || 'Tác giả kiệt tác';
  const synopsis = book.synopsis || 'Một tác phẩm văn học mẫu mực đầy chiều sâu tư tưởng.';

  const synthesizedChapters = [
    {
      chapterNumber: 1,
      title: 'Chương 1: Khởi nguyên & Bối cảnh thời đại',
      pages: [
        {
          pageNumber: 1,
          content: `Tác phẩm "${book.title}" của đại văn hào ${authorName} là một dấu ấn kinh điển thuộc thể loại ${book.genre || 'Văn học'}, được xuất bản vào năm ${book.publicationYear || 'thời kỳ hoàng kim'}.

Ngay từ những trang mở đầu, người đọc đã bị lôi cuốn vào một không gian nghệ thuật độc đáo bằng ngôn ngữ ${book.language || 'nguyên bản'}. Với cấp độ đọc ${book.readingLevel || 'phổ thông'}, câu chuyện đặt ra những câu hỏi sâu sắc về thân phận con người và trật tự của xã hội đương thời.

Bối cảnh câu chuyện mở ra: ${synopsis}

Từng câu chữ như một tấm gương phản chiếu những rung cảm tinh tế, đưa độc giả bước qua lằn ranh của thực tại để bước vào thế giới nội tâm mãnh liệt của các nhân vật. Mâu thuẫn trung tâm dần hé lộ khi các nhân vật đối diện với những giới hạn của thời đại mình đang sống, đan cài giữa khát vọng tự do và nỗi cô đơn thăm thẳm.`
        }
      ]
    },
    {
      chapterNumber: 2,
      title: 'Chương 2: Diễn biến kịch tính & Các tầng chủ đề',
      pages: [
        {
          pageNumber: 2,
          content: `Bước sang chương thứ hai, nhịp điệu của "${book.title}" tăng dần tốc độ. Các sự kiện chính bắt đầu bùng nổ, kéo theo sự biến chuyển không thể đảo ngược trong số phận của từng nhân vật.

Tác phẩm làm nổi bật các chủ đề then chốt: ${themesText}.

Thông qua góc nhìn sắc bén của ${authorName}, độc giả được chiêm ngưỡng bức tranh tâm lý con người trong những thời khắc thử thách cam go nhất. Không có sự hoàn hảo tuyệt đối, chỉ có những nỗ lực vượt thoát nghịch cảnh và tìm kiếm ý nghĩa chân chính của cuộc tồn sinh.

Một đoạn hội thoại đáng nhớ giữa các nhân vật làm bừng sáng tư tưởng của tác phẩm:
"- Chúng ta đang tìm kiếm điều gì giữa dòng đời cuộn chảy này?
- Tìm kiếm chính bản ngã của chúng ta, khi mọi chiếc mặt nạ xã hội đã được cởi bỏ."`
        }
      ]
    },
    {
      chapterNumber: 3,
      title: 'Chương 3: Chiêm nghiệm & Dư ba tư tưởng',
      pages: [
        {
          pageNumber: 3,
          content: `Khi câu chuyện dần đi về những cao trào cuối cùng, dư âm của "${book.title}" vẫn còn đọng lại nguyên vẹn trong lòng người đọc. Tác phẩm không chỉ đơn thuần là một câu chuyện để giải trí, mà là một hành trình thức tỉnh nhận thức.

Xếp cuốn sách lại, độc giả nhận ra rằng những trang sách đã đọc không chỉ là câu chuyện của những nhân vật hư cấu, mà chính là tấm gương soi chiếu những lát cắt trong tâm hồn và cuộc đời của chính mỗi chúng ta. Giá trị nhân văn vượt thời gian của kiệt tác sẽ tiếp tục vang vọng qua nhiều thế hệ.`
        }
      ]
    }
  ];

  const pages = [];
  synthesizedChapters.forEach(ch => {
    ch.pages.forEach(p => {
      pages.push({
        ...p,
        chapterNumber: ch.chapterNumber,
        chapterTitle: ch.title,
        bookTitle: book.title,
        authorName: authorName
      });
    });
  });

  return {
    chapters: synthesizedChapters,
    pages,
    totalPages: pages.length
  };
}
