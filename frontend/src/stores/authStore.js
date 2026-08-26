import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        
        this.token = response.data.token;
        this.user = response.data.user || { email }; 
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        return { success: true, message: response.data.message || 'เข้าสู่ระบบสำเร็จ' };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
        };
      }
    },
    async register(userData) {
      try {
        const response = await axios.post('http://localhost:3000/api/register', userData);
        return { success: true, message: response.data.message || 'สมัครสมาชิกสำเร็จ' };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก' 
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
