<template>
    <div class="container">
      <h1 class="my-4">商品列表</h1>
      <div v-if="products.length === 0">目前沒有可用商品</div>
      <div class="row">
        <div v-for="product in products" :key="product.id" class="col-md-4">
          <div class="card mb-4">
            <img :src="getImageUrl(product.image)" class="card-img-top" alt="商品圖片">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text"><strong>價格: {{ product.price }} 元</strong></p>
              <div class="d-flex justify-content-between">
                <router-link :to="'/product/' + product.id" class="btn btn-primary">查看詳情</router-link>
                <button class="btn btn-success" @click="addToCart(product.id)">新增到購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductList',
    data() {
      return {
        products: []
      };
    },
    mounted() {
      axios.get('/products/available')
        .then(response => {
          this.products = response.data.map(product => ({
            ...product,
            image: product.image || 'default.jpg' // 如果沒有提供圖片，使用預設圖片
          }));
        })
        .catch(error => {
          console.error('獲取商品列表失敗:', error);
        });
    },
    methods: {
      getImageUrl(imageName) {
        return `/images/${imageName}`; // 讀取 public/images/ 下的圖片
      },
      
      async addToCart(productId) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("請先登入");
            this.$router.push("/login");
            return;
          }

          const response = await axios.post("http://localhost:8080/cart/add", 
            { productId, quantity: 1 }, // 預設加入 1 件商品
            {
              headers: { Authorization: `Bearer ${token}`,"X-USER-ROLE": localStorage.getItem('role') },
            }
          );

          alert(response.data); // 顯示成功訊息
        } catch (error) {
          console.error("加入購物車失敗:", error);
          alert("加入購物車失敗，請稍後再試");
        }
      }
    }
  };
  </script>
  
  <style>
  .card-img-top {
    max-height: 200px;
    object-fit: cover;
  }
  </style>
  