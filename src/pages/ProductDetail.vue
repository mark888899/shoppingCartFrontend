<template>
  <div class="container">
    <h1>{{ product.name }}</h1>
    <img :src="getImageUrl(product.image)" class="product-image" alt="商品圖片" v-if="product.image">
    
    <p><strong>描述:</strong> {{ product.description }}</p>
    <p><strong>價格:</strong> {{ product.price }} 元</p>
    <p><strong>庫存:</strong> {{ product.stock }}</p>
    <p><strong>類別:</strong> {{ product.category?.name || "未分類"}}</p>
    <p><strong>品牌:</strong> {{ product.brand }}</p>

    <!-- 數量選擇區 -->
    <div class="d-flex align-items-center quantity-container">
    <span class="me-2">數量：</span>
      <button @click="decreaseQuantity" class="btn btn-outline-secondary quantity-btn">-</button>
      <input type="number" v-model="quantity" min="1" :max="product.stock" class="form-control quantity-input" readonly>
      <button @click="increaseQuantity" class="btn btn-outline-secondary quantity-btn">+</button>

      <!-- 增加 margin-left 讓購物車按鈕不會貼緊 "+" -->
      <button @click="addToCart" class="btn btn-success add-to-cart-btn ms-3">放入購物車</button>
    
    </div>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      quantity: 1, // 預設數量為 1
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(`http://localhost:8080/products/${productId}`);
        this.product = response.data;
        console.log(this.product);
      } catch (error) {
        console.error("獲取商品詳情失敗:", error);
      }
    },

    getImageUrl(imageName) {
      return `/images/${imageName}`;
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    },

    async addToCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("請先登入");
          this.$router.push("/login");
          return;
        }

        await axios.post("http://localhost:8080/cart/add", 
          { productId: this.product.id, quantity: this.quantity }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("商品已加入購物車");
      } catch (error) {
        console.error("加入購物車失敗:", error);
        alert("加入購物車失敗，請稍後再試");
      }
    }
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>

<style scoped>
.product-image {
  max-width: 60%; /* 控制圖片最大寬度 */
  height: auto; /* 確保圖片等比例縮放 */
  display: block; /* 讓圖片可以透過 margin: auto 置中 */
  margin: 20px auto; /* 上下留白，水平置中 */
  border-radius: 8px; /* 圖片圓角（可選） */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 增加陰影效果（可選） */
}

.quantity-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 按鈕和輸入框之間的間距 */
}

.quantity-input {
  width: 50px;
  text-align: center;
  font-size: 14px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.quantity-btn {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* 讓"放入購物車"按鈕緊接 "+" 按鈕的右側 */
.add-to-cart-btn {
  height: 40px;
  white-space: nowrap;
  margin-left: 15px; /* 控制按鈕與 "+" 的間距 */
}

</style>
