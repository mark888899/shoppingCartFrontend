<template>
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
            <li class="nav-item">
              <router-link v-if="!user.username" class="nav-link" to="/login">登入</router-link>
              <span v-else class="nav-link">{{ user.username }}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        user: {
          username: localStorage.getItem("username") || ""
        }
      };
    },
    mounted() {
      window.addEventListener("storage", this.updateUser);
    },
    beforeUnmount() {
      window.removeEventListener("storage", this.updateUser);
    },
    methods: {
      updateUser() {
        this.user.username = localStorage.getItem("username") || "";
      }
    }
  };
  </script>
  
  <style>
  .navbar {
    margin-bottom: 20px;
  }
  </style>
  