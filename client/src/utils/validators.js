export function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).trim());
}

export function validateReadingProgress(currentPage, totalPages) {
  const page = parseInt(currentPage, 10);
  const total = parseInt(totalPages, 10);

  if (isNaN(page)) {
    return { isValid: false, message: 'Số trang phải là một số hợp lệ.' };
  }

  if (page < 0) {
    return { isValid: false, message: 'Số trang đã đọc không được là số âm.' };
  }

  if (page > total) {
    return { isValid: false, message: `Số trang đã đọc (${page}) không được vượt quá tổng số trang (${total}).` };
  }

  return { isValid: true, page, percentage: Math.min(100, Math.round((page / total) * 100)) };
}

export function validateContactForm(formData) {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Vui lòng nhập họ và tên của bạn.';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Họ và tên phải có tối thiểu 2 ký tự.';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Vui lòng nhập địa chỉ email.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Địa chỉ email không đúng định dạng (ví dụ: name@example.com).';
  }

  if (!formData.subject?.trim()) {
    errors.subject = 'Vui lòng chọn hoặc nhập chủ đề liên hệ.';
  }

  if (!formData.message?.trim()) {
    errors.message = 'Vui lòng nhập nội dung tin nhắn.';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Nội dung tin nhắn phải có tối thiểu 10 ký tự.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
