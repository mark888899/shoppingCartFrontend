<template>
    <div class="container" v-if="isAdmin">
      <h1>商品維護頁面</h1>
  
      <!-- 商品列表 Table -->
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名稱</th>
            <th>商品價格</th>
            <th>商品庫存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="goToUpdateProduct(product.id)">更新</button>
              <button class="btn btn-danger btn-sm ms-2" @click="deleteProduct(product.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="actions">
        <button class="btn btn-primary" @click="goToAddProduct">新增商品</button>
      </div>
    </div>
  
    <div class="container" v-else>
      <h1>無權限訪問</h1>
      <p>您沒有權限進入此頁面。</p>
      <router-link to="/" class="btn btn-secondary">返回首頁</router-link>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ProductManage",
    data() {
      return {
        isAdmin: false,
        products: [],
      };
    },
    methods: {
      checkUserRole() {
        const role = localStorage.getItem("role");
        this.isAdmin = role === "ADMIN";
      },
      async fetchProducts() {
        try {
          const response = await axios.get("http://localhost:8080/products/available", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-USER-ROLE": localStorage.getItem("role") || "GUEST", // 確保帶入角色
            },
          });
          this.products = response.data;
        } catch (error) {
          console.error("獲取商品列表失敗:", error);
        }
      },
      goToAddProduct() {
      this.$router.push("/productupdate"); // 新增商品
    },
    goToUpdateProduct(productId) {
      this.$router.push(`/productupdate/${productId}`); // 更新商品
    },
    async deleteProduct(productId) {
      if (confirm("確定要刪除此商品嗎？")) {
        try {
          await axios.delete(`http://localhost:8080/products/maintenance/${productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-USER-ROLE": localStorage.getItem("role") || "GUEST",
            },
          });
          alert("商品刪除成功");
          this.fetchProducts(); // 重新載入商品列表
        } catch (error) {
          console.error("刪除商品失敗:", error);
          alert("刪除商品失敗，請稍後再試");
        }
      }
    },

    },
    mounted() {
      this.checkUserRole();
      if (this.isAdmin) {
        this.fetchProducts();
      }
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 50px;
  }
  .table {
    width: 100%;
    margin-top: 20px;
  }
  .actions {
    margin-top: 20px;
  }
  .actions button {
    margin: 10px;
  }
  </style>
  