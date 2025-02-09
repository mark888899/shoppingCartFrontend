<template>
    <div class="container">
      <h1>{{ product.name }}</h1>
      <img :src="getImageUrl(product.image)" class="img-fluid mb-3" alt="商品圖片" v-if="product.image">
      <p><strong>描述:</strong> {{ product.description }}</p>
      <p><strong>價格:</strong> {{ product.price }} 元</p>
      <p><strong>庫存:</strong> {{ product.stock }}</p>
      <p><strong>類別:</strong> {{ product.category }}</p>
      <p><strong>品牌:</strong> {{ product.brand }}</p>
      <button @click="addToCart" class="btn btn-success">放入購物車</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: {}
      };
    },
    mounted() {
      axios.get(`/products/${this.$route.params.id}`)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
          console.error('獲取商品詳情失敗:', error);
        });
    },
    methods: {
      addToCart() {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('請先登入，才能加入購物車！');
          this.$router.push('/login');
          return;
        }
        axios.post('/cart/add', { productId: this.product.id, quantity: 1 })
          .then(() => {
            alert('商品已加入購物車！');
          })
          .catch(error => {
            console.error('加入購物車失敗:', error);
          });
      },
      getImageUrl(imageName) {
        return `/images/${imageName}`;
      }
    }
  };
  </script>
  
  <style>
  .img-fluid {
    max-height: 400px;
    object-fit: cover;
  }
  </style>
  