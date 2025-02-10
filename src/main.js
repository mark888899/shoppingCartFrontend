import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Home from './pages/Home.vue';
import ProductDetail from './pages/ProductDetail.vue';
import ProductList from './pages/ProductList.vue';
import ProductManage from './pages/ProductManage.vue';
import ProductUpdate from './pages/ProductUpdate.vue';
import Cart from './pages/Cart.vue';
import Order from './pages/Order.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

// 設置 JWT 驗證攔截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// 設置 API 基本 URL
axios.defaults.baseURL = 'http://localhost:8080/';

// 定義路由
const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail },
  { path: '/productlist', component: ProductList }, 
  { path: '/productmanage', component: ProductManage }, 
  { path: '/productupdate/:id?', component: ProductUpdate },  // `:id?` 允許 id 可選
  { path: '/cart', component: Cart },
  { path: '/order', component: Order },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');

