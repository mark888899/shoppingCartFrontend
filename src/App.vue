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
            <li class="nav-item">
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
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
