import bcrypt from 'bcryptjs';
import { securityConfig } from '../config/security.js';

/**
 * Băm mật khẩu bằng bcrypt với salt rounds bảo mật cao
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(securityConfig.bcrypt.saltRounds);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Kiểm tra mật khẩu khớp với mã băm
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export default { hashPassword, comparePassword };
