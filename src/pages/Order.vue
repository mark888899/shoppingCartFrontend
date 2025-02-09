<template>
  <div class="container">
    <h1 class="title">我的訂單</h1>

    <div v-if="orders.length === 0" class="empty-orders">
      沒有找到訂單
    </div>

    <div v-else>
      <table class="order-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>下單時間</th>
            <th>總價</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(order, index) in orders" :key="index">
            <!-- 訂單主要資訊 -->
            <tr>
              <td>{{ order.orderId }}</td>
              <td>{{ formatDate(order.orderDate) }}</td>
              <td>${{ order.totalPrice.toFixed(2) }}</td>
              <td>{{ formatOrderStatus(order.orderStatus) }}</td>
              <td>
                <button @click="toggleOrderDetails(order.orderId)">
                  {{ expandedOrders.has(order.orderId) ? '隱藏' : '查看' }}
                </button>
              </td>
            </tr>

            <!-- 訂單詳細內容（可同時展開多筆） -->
            <tr v-if="expandedOrders.has(order.orderId)" class="order-details-row">
              <td colspan="5">
                <table class="order-detail-table">
                  <thead>
                    <tr>
                      <th>商品名稱</th>
                      <th>商品單價</th>
                      <th>訂單數量</th>
                      <th>總價格</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.orderDetails" :key="item.id">
                      <td>{{ item.productName }}</td>
                      <td>${{ item.price.toFixed(2) }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                      <td>
                        <button @click="goToProductPage(item.productId)" class="product-btn">
                          商品頁面
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [], // 訂單列表
      expandedOrders: new Set(), // 記錄展開的訂單
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("請先登入");
          this.$router.push("/login");
          return;
        }

        const response = await axios.get("http://localhost:8080/order/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          this.orders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        } else {
          console.error("API 回傳的不是陣列:", response.data);
          this.orders = [];
        }

      } catch (error) {
        console.error("獲取訂單失敗:", error);
        alert("無法獲取訂單，請稍後再試");
      }
    },
    toggleOrderDetails(orderId) {
      if (this.expandedOrders.has(orderId)) {
        this.expandedOrders.delete(orderId); // 移除已展開的訂單
      } else {
        this.expandedOrders.add(orderId); // 加入展開的訂單
      }
      this.expandedOrders = new Set(this.expandedOrders); // 觸發 Vue 重新渲染
    },
    formatDate(dateString) {
      if (!dateString) return "未知時間";
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    formatOrderStatus(status) {
      const statusMap = {
        0: "待出貨",
        1: "已出貨",
        2: "訂單已完成",
        3: "訂單取消"
      };
      return statusMap[status] || "未知狀態";
    },
    goToProductPage(productId) {
      this.$router.push(`/product/${productId}`);
    }
  },
  mounted() {
    this.fetchOrders();
  }
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
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.order-table th, .order-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.empty-orders {
  text-align: center;
  font-size: 18px;
  color: gray;
}
.order-details-row {
  background-color: #f9f9f9;
}
.product-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
.product-btn:hover {
  background-color: #0056b3;
}
.order-detail-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: white;
}
.order-detail-table th, .order-detail-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
</style>
