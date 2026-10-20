import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://new.familiesapp.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar', // تحديد اللغة الافتراضية (يمكن تغييرها إلى en حسب رغبة المستخدم)
  },
});