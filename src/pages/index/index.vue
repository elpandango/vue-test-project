<template>
  <div class="index-page">

    <div class="filters-container">
      <div class="form-row">
        <div class="form-col w50p">
          <div class="form-label">Search:</div>
          <div class="form-control">
            <label><input type="text"
                          class="search-input"
                          v-model="searchInput"></label>
          </div>
        </div>

        <div class="form-col w50p">
          <div class="form-label">Sort by date:</div>
          <div class="form-control">
            <label>
              <select v-model="sortByDate">
                <option disabled value="">Select sorting</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </label>
          </div>
        </div>
      </div>

    </div>

    <product-add @productAdded="productAdded"/>

    <div class="products-grid">
      <product-item :product-data="product"
                    v-for="product in filteredProducts"
                    :key="product.id"
                    @deleteProduct=deleteProduct></product-item>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/products/product-item/ProductItem';
import ProductAdd from '@/components/products/product-add/ProductAdd';
import {httpRequest} from "@/api";
import {mapGetters} from 'vuex';

export default {
  name: "index",
  components: {
    'product-item': ProductItem,
    'product-add': ProductAdd,
  },
  data() {
    return {
      searchInput: '',
      sortByDate: '',
    }
  },
  methods: {
    async deleteProduct(productId) {
      for (const key in this.productList) {
        if (this.productList[key].id === productId) {
          await httpRequest('DELETE', null, null, this.productList[key].prodId);
          await this.getProductList();
          break;
        }
      }
    },
    async productAdded() {
      await this.getProductList();
    },
    async getProductList() {
      const result = await httpRequest('GET');
      this.$store.dispatch('setProductList', result.data);
    }
  },
  async mounted() {
    await this.getProductList();
  },
  computed: {
    ...mapGetters([
      'productList',
    ]),
    filteredProducts() {
      const prodList = this.productList.filter(product => {
        return product.name.includes(this.searchInput) || product.category.includes(this.searchInput) || product.image_name.includes(this.searchInput);
      });

      if (this.sortByDate === 'desc') {
        return prodList.sort((a,b) => new Date(b.created_date) - new Date(a.created_date));
      } else {
        return prodList.sort((a,b) => new Date(a.created_date) - new Date(b.created_date));
      }
    },
  }
}
</script>

<style lang="scss">
.products-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  width: calc(100% + 20px);
}

.filters-container {
  border-radius: 12px;
  box-shadow: 0 8px 48px 0 rgba(184, 186, 229, 0.42);
  border: solid 1px #ffffff;
  background-color: #fff;
  padding: 20px;
  max-width: 600px;
  margin-bottom: 20px;
}
</style>