<template>
  <div class="container">
    <h1 class="title">購物車</h1>

    <div v-if="cart.length === 0" class="empty-cart">購物車是空的</div>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>數量</th>
            <th>單價</th>
            <th>總價</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price.toFixed(2) }}</td>
            <td>{{ (item.quantity * item.price).toFixed(2) }}</td>
            <td>
              <button class="delete-btn" @click="removeFromCart(item.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <h3>總計: ${{ totalPrice.toFixed(2) }}</h3>
      </div>

      <button class="checkout-btn" @click="checkout">結帳</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
  },
  methods: {
    async fetchCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("請先登入");
          this.$router.push("/login"); // 🔹 跳轉到登入頁面
          return;
        }

        const response = await axios.get("http://localhost:8080/cart/items", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        this.cart = response.data;
      } catch (error) {
        console.error("獲取購物車失敗:", error);
      }
    },
    async removeFromCart(cartId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("請先登入");
          this.$router.push("/login"); // 🔹 跳轉到登入頁面
          return;
        }

            // **從購物車內找到對應 cartId 的商品**
        const cartItem = this.cart.find(item => item.id === cartId);
        const productName = cartItem ? cartItem.productName : "該商品"; // 若找不到，預設值為 "該商品"


        await axios.delete(`http://localhost:8080/cart/remove/${cartId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        this.cart = this.cart.filter((item) => item.id !== cartId);
        alert(`商品「${productName}」已成功刪除`);
      } catch (error) {
        console.error("刪除商品失敗:", error);
        alert("刪除商品失敗，請稍後再試");
      }
    },
    async checkout() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("請先登入");
          this.$router.push("/login"); // 🔹 跳轉到登入頁面
          return;
        }

        const response = await axios.post(
          "http://localhost:8080/order/checkout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        alert("已成功建立訂單"); // 顯示結帳成功訊息
        this.cart = []; // 清空購物車
        this.$router.push("/order"); // 跳轉到訂單頁面
      } catch (error) {
        console.error("結帳失敗:", error);
        alert("結帳失敗，請稍後再試");
      }
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.title {
  text-align: center;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.cart-summary {
  margin-top: 20px;
  text-align: right;
}
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.checkout-btn {
  display: block;
  width: 100%;
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
}
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: gray;
}
</style>
