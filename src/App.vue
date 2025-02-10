<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Shopping Frontend</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/productlist">商品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/order">訂單</router-link>
            </li>
            <li class="nav-item dropdown" v-if="user.username">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                {{ user.username }}
              </a>
              <ul class="dropdown-menu">
                <li v-if="user.role==='1'">
                  <router-link class="dropdown-item" to="productManage">編輯商品</router-link>
                </li>
                <li>
                  <button class="dropdown-item" @click="logout">登出</button>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login">登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      user: {
        username: localStorage.getItem("username") || "",
        role: localStorage.getItem("role") || "",
      },
    };
  },
  methods: {
    updateUser() {
      this.user.username = localStorage.getItem("username") || "";
      this.user.role = localStorage.getItem("role") || "";
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("未登入");
          return;
        }

        await axios.post("http://localhost:8080/auth/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 清除 localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        // 更新 UI
        this.updateUser();
        alert("登出成功");

        // 重新導向到首頁
        this.$router.push("/");
      } catch (error) {
        console.error("登出失敗:", error);
        alert("登出失敗，請稍後再試");
      }
    },
  },
  mounted() {
    this.updateUser();
    window.addEventListener("storage", this.updateUser);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateUser);
  },
};
</script>

<style>
/* 確保 Bootstrap 下拉選單顯示正確 */
.dropdown-menu {
  min-width: 100px;
}
</style>
