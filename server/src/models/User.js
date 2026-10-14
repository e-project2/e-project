import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Tên đăng nhập không được để trống'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Tên đăng nhập phải có ít nhất 3 ký tự'],
      maxlength: [30, 'Tên đăng nhập không được vượt quá 30 ký tự']
    },
    email: {
      type: String,
      required: [true, 'Email không được để trống'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng']
    },
    password: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      minlength: [6, 'Mật khẩu phải từ 6 ký tự trở lên'],
      select: false // Không tự động trả về hash mật khẩu trong queries
    },
    fullName: {
      type: String,
      trim: true,
      default: ''
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'banned'],
      default: 'active',
      index: true
    },
    bio: {
      type: String,
      default: '',
      maxlength: 300
    },
    lastLogin: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Mã hóa mật khẩu trước khi lưu nếu có thay đổi
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// So khớp mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Loại bỏ các trường nhạy cảm khi chuyển sang JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
