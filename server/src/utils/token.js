import jwt from 'jsonwebtoken';
import { securityConfig } from '../config/security.js';

/**
 * Tạo Access Token JWT
 * @param {object} payload - Thường gồm userId, email, role
 * @returns {string}
 */
export function generateAccessToken(payload) {
  return jwt.sign(
    {
      id: payload._id || payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role
    },
    securityConfig.jwt.secret,
    { expiresIn: securityConfig.jwt.expiresIn }
  );
}

/**
 * Tạo Refresh Token JWT
 * @param {object} payload
 * @returns {string}
 */
export function generateRefreshToken(payload) {
  return jwt.sign(
    {
      id: payload._id || payload.id,
      email: payload.email,
      role: payload.role
    },
    securityConfig.jwt.refreshSecret,
    { expiresIn: securityConfig.jwt.refreshExpiresIn }
  );
}

/**
 * Xác minh Access Token
 * @param {string} token
 * @returns {object} Decoded payload
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, securityConfig.jwt.secret);
}

/**
 * Xác minh Refresh Token
 * @param {string} token
 * @returns {object} Decoded payload
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, securityConfig.jwt.refreshSecret);
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
