import { defineStore } from 'pinia';
import axios from 'axios';

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
    displayName: (state) => state.user?.name || state.user?.email?.split('@')[0] || 'ผู้ใช้งาน',
    userEmail: (state) => state.user?.email || 'example@gmail.com',
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        
        this.token = response.data.token;
        // Backend แบบ Prisma ไม่ได้ส่ง object user กลับมา ส่งเพียงแค่ token
        // เก็บอีเมลไว้แสดงชั่วคราวก่อน (หรือสามารถแก้ Backend ให้ส่ง Object user กลับมาด้วย)
        this.user = {
          email,
          name: email.split('@')[0],
        };
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        return { success: true, message: response.data.message || 'เข้าสู่ระบบสำเร็จ' };
      } catch (error) {
        // ดักจับฟิลด์ 'error' ที่ส่งมาจาก authController (เช่น error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        return { 
          success: false, 
          message: error.response?.data?.error || error.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
        };
      }
    },
    updateUserProfile(profile = {}) {
      this.user = {
        ...(this.user || {}),
        ...profile,
      };

      localStorage.setItem('user', JSON.stringify(this.user));
      return this.user;
    },
    async register(userData) {
      try {
        const response = await axios.post('http://localhost:3000/api/register', userData);
        return { success: true, message: response.data.message || 'สมัครสมาชิกสำเร็จ' };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.error || error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก' 
        };
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
