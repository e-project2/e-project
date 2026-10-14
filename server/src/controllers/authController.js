import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Đăng ký tài khoản người dùng mới
 */
export async function register(req, res, next) {
  try {
    const { username, email, password, fullName } = req.body;

    // Kiểm tra trùng username hoặc email
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return sendError(res, 'Email này đã được sử dụng.', 409);
      }
      return sendError(res, 'Tên đăng nhập này đã tồn tại.', 409);
    }

    const newUser = await User.create({
      username,
      email,
      password,
      fullName: fullName || username,
      role: 'user',
      status: 'active'
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return sendSuccess(
      res,
      {
        user: newUser,
        accessToken,
        refreshToken
      },
      'Đăng ký tài khoản thành công!',
      null,
      201
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Đăng nhập tài khoản
 */
export async function login(req, res, next) {
  try {
    const { identifier, email, username, password } = req.body;
    const loginKey = (identifier || email || username || '').trim().toLowerCase();

    // Tìm người dùng theo email hoặc username (cần include password field)
    const user = await User.findOne({
      $or: [{ email: loginKey }, { username: loginKey }]
    }).select('+password');

    if (!user) {
      return sendError(res, 'Email hoặc tên đăng nhập không đúng.', 401);
    }

    if (user.status === 'banned') {
      return sendError(res, 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên.', 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Mật khẩu không chính xác.', 401);
    }

    // Cập nhật mốc đăng nhập gần nhất
    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return sendSuccess(
      res,
      {
        user: user.toJSON(),
        accessToken,
        refreshToken
      },
      'Đăng nhập thành công!'
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Làm mới Access Token bằng Refresh Token
 */
export async function refreshToken(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) {
      return sendError(res, 'Refresh token là bắt buộc.', 400);
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      return sendError(res, 'Refresh token không hợp lệ hoặc đã hết hạn.', 401);
    }

    const user = await User.findById(decoded.id);
    if (!user || user.status === 'banned') {
      return sendError(res, 'Người dùng không hợp lệ hoặc đã bị khóa.', 401);
    }

    const newAccessToken = generateAccessToken(user);
    return sendSuccess(res, { accessToken: newAccessToken }, 'Làm mới token thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy thông tin tài khoản hiện hành (Me)
 */
export async function getMe(req, res, next) {
  try {
    return sendSuccess(res, { user: req.user }, 'Lấy thông tin tài khoản thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Cập nhật hồ sơ cá nhân
 */
export async function updateProfile(req, res, next) {
  try {
    const { fullName, avatar, bio } = req.body;
    const user = req.user;

    if (fullName !== undefined) user.fullName = fullName.trim();
    if (avatar !== undefined) user.avatar = avatar.trim();
    if (bio !== undefined) user.bio = bio.trim();

    await user.save();

    return sendSuccess(res, { user: user.toJSON() }, 'Cập nhật hồ sơ thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Đổi mật khẩu
 */
export async function changePassword(req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return sendError(res, 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới.', 400);
    }

    if (newPassword.length < 6) {
      return sendError(res, 'Mật khẩu mới phải có ít nhất 6 ký tự.', 400);
    }

    // Lấy lại user kèm password hash
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return sendError(res, 'Mật khẩu hiện tại không đúng.', 400);
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, null, 'Đổi mật khẩu thành công!');
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  refreshToken,
  getMe,
  updateProfile,
  changePassword
};
