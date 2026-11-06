import { defineStore } from 'pinia';
import axios from '../api/axios';
import i18n from '../i18n';
import dogAvatar from '../assets/avatars/dog.png';
import catAvatar from '../assets/avatars/cat.png';
import rabbitAvatar from '../assets/avatars/rabbit.png';
import bearAvatar from '../assets/avatars/bear.png';
import birdAvatar from '../assets/avatars/bird.png';

const baseURL = import.meta.env.VITE_API_URL || 'https://phuenjaizone-chatbot-web.onrender.com';

const t = (key) => i18n.global.t(key);

const AVATAR_MAP = {
  avatar_dog: dogAvatar,
  avatar_cat: catAvatar,
  avatar_rabbit: rabbitAvatar,
  avatar_bear: bearAvatar,
  avatar_bird: birdAvatar,
};

const resolveAvatarImage = (value) => {
  if (!value || typeof value !== 'string') return dogAvatar;
  return AVATAR_MAP[value] || dogAvatar;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem('user')) || null;
      } catch {
        return null;
      }
    })(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    displayName: (state) => state.user?.name || state.user?.username || state.user?.email?.split('@')[0] || t('auth.defaultUser'),
    userEmail: (state) => state.user?.email || 'example@gmail.com',
    profileImage: (state) => resolveAvatarImage(state.user?.avatar || state.user?.avatarUrl || state.user?.profileImage || ''),
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/api/login', { email, password });
        
        this.token = response.data.token;
        const refreshToken = response.data.refreshToken;
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        // Backend แบบ Prisma ไม่ได้ส่ง object user กลับมา ส่งเพียงแค่ token
        // เก็บอีเมลไว้แสดงชั่วคราวก่อน (หรือสามารถแก้ Backend ให้ส่ง Object user กลับมาด้วย)
        this.user = {
          email,
          name: email.split('@')[0],
          // 👇 [จุดที่ 1 ที่เพิ่มเข้ามา]: นำข้อมูล user ที่ Backend เพิ่งแก้ให้ส่งมา (รวมถึง role) มารวมไว้ในตัวแปรนี้ด้วย
          ...(response.data.user || {})
        };
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        // 👇 [จุดที่ 2 ที่เพิ่มเข้ามา]: เซฟสิทธิ์ (role) แยกลง localStorage เพื่อให้ Login.vue นำไปเช็คเงื่อนไขย้ายหน้า
        if (response.data.user && response.data.user.role) {
          localStorage.setItem('userRole', response.data.user.role);
        }
        
        return { success: true, message: response.data.message || t('auth.loginSuccess') };
      } catch (error) {
        // ดักจับฟิลด์ 'error' ที่ส่งมาจาก authController (เช่น error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        return { 
          success: false, 
          message: error.response?.data?.error || error.response?.data?.message || t('auth.loginFailed') 
        };
      }
    },
    async updateUserProfile(profile = {}) {
      const selectedAvatar =
        typeof profile.avatar === 'string' && profile.avatar.trim()
          ? profile.avatar.trim()
          : typeof profile.avatarUrl === 'string' && profile.avatarUrl.trim()
          ? profile.avatarUrl.trim()
          : this.user?.avatar || this.user?.avatarUrl || 'avatar_dog';

      const nextName =
        typeof profile.name === 'string' && profile.name.trim()
          ? profile.name.trim()
          : this.user?.name || this.user?.username || t('auth.defaultUser');

      const nextEmail =
        typeof profile.email === 'string' && profile.email.trim()
          ? profile.email.trim()
          : this.user?.email || '';

      const payload = {
        name: nextName,
        username: nextName,
        email: nextEmail,
        avatar: selectedAvatar,
        avatarUrl: selectedAvatar,
      };

      this.user = {
        ...(this.user || {}),
        ...payload,
      };
      localStorage.setItem('user', JSON.stringify(this.user));

      if (this.token) {
        try {
          const response = await axios.put('/api/profile', payload);
          if (response.data?.user) {
            this.user = {
              ...this.user,
              ...response.data.user,
              name: response.data.user.name || response.data.user.username || nextName,
              avatar: response.data.user.avatar || response.data.user.avatarUrl || selectedAvatar,
              avatarUrl: response.data.user.avatarUrl || response.data.user.avatar || selectedAvatar,
            };
            localStorage.setItem('user', JSON.stringify(this.user));
          }
          return {
            success: true,
            message: response.data?.message || t('auth.profileSaved'),
            user: this.user,
          };
        } catch (error) {
          // กรณีมี Error จากการซ้ำของชื่อ/อีเมล ให้แจ้งกลับ แต่ถ้าเป็น 404 (Backend ยังไม่ได้อัปเดต Route) ให้ใช้ค่าที่บันทึกใน LocalStorage ได้เลย
          if (error.response?.status === 400 || error.response?.status === 409) {
            return {
              success: false,
              message: error.response?.data?.error || t('auth.profileUpdateFailed'),
              user: this.user,
            };
          }
        }
      }

      return {
        success: true,
        message: t('auth.profileSaved'),
        user: this.user,
      };
    },
    async register(userData) {
      try {
        const payload = {
          name: userData?.name,
          username: userData?.username || userData?.name,
          email: userData?.email,
          password: userData?.password,
          confirmPassword: userData?.confirmPassword,
          avatar: userData?.avatar || userData?.avatarUrl || 'avatar_dog',
          avatarUrl: userData?.avatarUrl || userData?.avatar || 'avatar_dog',
          recaptchaToken: userData?.recaptchaToken,
        };
        const response = await axios.post('/api/register', payload);
        return { success: true, message: response.data.message || t('auth.registerSuccess') };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.error || error.response?.data?.message || t('auth.registerFailed') 
        };
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // 👇 [จุดที่ 3 ที่เพิ่มเข้ามา]: อย่าลืมลบ userRole ทิ้งตอนที่ผู้ใช้กดออกจากระบบด้วยครับ
      localStorage.removeItem('userRole');
    }
  }
});
