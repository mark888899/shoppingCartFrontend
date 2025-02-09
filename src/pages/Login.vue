<template>
  <div class="container">
    <h1 class="my-4">登入</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="userEmail" class="form-label">電子郵件</label>
        <input type="email" id="userEmail" v-model="userEmail" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">密碼</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">登入</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      userEmail: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('/auth/login', { userEmail: this.userEmail, password: this.password })
        .then(response => {
          const userData = response.data;
          console.log(userData);
          localStorage.setItem('username', userData.username);
          localStorage.setItem('userId', userData.id);
          localStorage.setItem('token', userData.token); //  儲存 JWT Token
          console.log(localStorage.getItem('token'));
          this.$root.updateUser(); // 更新 Navbar
          alert(userData.message);
          this.$router.push('/');
        })
        .catch(error => {
          alert('登入失敗，請檢查帳號或密碼');
          console.error('登入錯誤:', error);
        });
    }
  }
};
</script>
