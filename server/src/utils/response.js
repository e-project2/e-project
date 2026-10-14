/**
 * Phản hồi thành công chuẩn hóa
 * @param {import('express').Response} res
 * @param {any} data
 * @param {string} [message]
 * @param {object} [meta] - Metadata như pagination (page, limit, totalPages, total)
 * @param {number} [statusCode=200]
 */
export function sendSuccess(res, data = null, message = 'Success', meta = null, statusCode = 200) {
  const response = {
    success: true,
    message,
    data
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
}

/**
 * Phản hồi lỗi chuẩn hóa
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=400]
 * @param {any} [errors=null]
 */
export function sendError(res, message = 'Error occurred', statusCode = 400, errors = null) {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
}

export default { sendSuccess, sendError };
