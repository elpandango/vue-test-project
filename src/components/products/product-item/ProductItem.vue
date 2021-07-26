<template>
  <div class="product-item-wrap">
    <div class="product-item">
      <div class="product-photo">
        <img :src="imageSrc"
             :alt="productData.name"
             width="200"
             height="150">
      </div>
      <div class="product-name">{{ productData.name }}</div>
      <router-link class="product-category"
                   :to="productData.category">{{ productData.category }}
      </router-link>
      <div class="product-footer">
        <div class="created-date">{{ productData.created_date }}</div>
        <button class="delete-btn"
                type="button"
                @click="deleteProduct">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    productData: {
      type: Object
    }
  },
  methods: {
    deleteProduct() {
      this.$emit('deleteProduct', this.productData.id);
    }
  },
  computed: {
    imageSrc() {
      return this.productData?.image?.src ?? 'https://via.placeholder.com/200x150.it';
    },
  }
}
</script>

<style scoped lang="scss" src="./styles.scss"></style>