<template>
  <div class="container">
    <h1>{{ isEdit ? "更新商品" : "新增商品" }}</h1>

    <form @submit.prevent="saveProduct">
      <!-- 商品 ID（只讀） -->
      <div class="mb-3">
        <label class="form-label">商品 ID</label>
        <input type="text" class="form-control" v-model="product.id" disabled :placeholder="isEdit ? '' : '系統自動產生'" />
      </div>

      <!-- 商品名稱 -->
      <div class="mb-3">
        <label class="form-label">商品名稱</label>
        <input type="text" class="form-control" v-model="product.name" required />
      </div>

      <!-- 商品價格 -->
      <div class="mb-3">
        <label class="form-label">價格</label>
        <input type="number" class="form-control" v-model="product.price" required step="0.01" />
      </div>

      <!-- 商品庫存 -->
      <div class="mb-3">
        <label class="form-label">庫存數量</label>
        <input type="number" class="form-control" v-model="product.stock" required />
      </div>

      <!-- 商品圖片 -->
      <div class="mb-3">
        <label class="form-label">圖片網址</label>
        <input type="text" class="form-control" v-model="product.image" />
      </div>

      <!-- 商品類別 (下拉選單) -->
      <div class="mb-3">
        <label class="form-label">商品類別</label>
        <select class="form-select" v-model="product.category.id" required>
          <option value="" disabled>請選擇商品類別</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- 按鈕 -->
      <button type="submit" class="btn btn-success">{{ isEdit ? "更新商品" : "新增商品" }}</button>
      <router-link to="/productmanage" class="btn btn-secondary ms-2">取消</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductUpdate",
  data() {
    return {
      product: {
        id: "",
        name: "",
        price: 0,
        stock: 0,
        image: "",
        category: {
          id: "",
        },
      },
      categories: [], // 存放類別列表
      isEdit: false,
    };
  },
  methods: {
    async fetchProduct() {
      if (this.$route.params.id) {
        this.isEdit = true;
        try {
          const response = await axios.get(`http://localhost:8080/products/${this.$route.params.id}`);
          this.product = response.data;
        } catch (error) {
          console.error("獲取商品資料失敗:", error);
          alert("無法載入商品資料");
        }
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:8080/product/categories/");
        this.categories = response.data;
      } catch (error) {
        console.error("獲取類別失敗:", error);
        alert("無法載入商品類別，請稍後再試");
      }
    },
    async saveProduct() {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-USER-ROLE": localStorage.getItem("role") || "GUEST", // ✅ 確保帶入角色
        };

        if (this.isEdit) {
          // 更新商品
          await axios.put("http://localhost:8080/products/maintenance/update", this.product, { headers });
          alert("商品更新成功");
        } else {
          // 新增商品
          await axios.post("http://localhost:8080/products/maintenance/add", this.product, { headers });
          alert("商品新增成功");
        }

        this.$router.push("/productmanage");
      } catch (error) {
        console.error("儲存商品失敗:", error);
        alert("儲存商品失敗，請稍後再試");
      }
    }

  },
  mounted() {
    this.fetchCategories(); // 取得類別
    this.fetchProduct(); // 如果是編輯模式則載入商品資訊
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 30px;
}
</style>
