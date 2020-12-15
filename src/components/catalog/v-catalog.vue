<template>
  <div class="v-catalog">
    <v-notifications
      :messages="messages"
      :timeout="5000"
    />



    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">
        Cart: {{CART.length}}
      </div>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <v-select
          :selected="selected"
          :options="categories"
          @select="sortByCategories"
          :isExpended="IS_DESKTOP"
      />

      <div class="range-slider">
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            v-model.number="minPrice"
            @change="setRangeSliders"
        >
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            v-model.number="maxPrice"
            @change="setRangeSliders"
        >
      </div>

      <div class="range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>
    
    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'
import vSelect from '../v-select'
import vNotifications from '../notifications/v-notification'

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect,
    vNotifications
  },
  props: {

  },
  data() {
    return {
      categories: [
        {name: 'Все', value: 'All'},
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'}
      ],
      selected: 'Все',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 1000,
      messages: [
      ]
    }
  },
  computed: {
    ...mapGetters([
       'PRODUCTS',
        'CART',
        'IS_DESKTOP'
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      }
      else{
        return this.PRODUCTS;
      }
    }
  },
  methods: {
    ...mapActions([
       'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
    ]),
    setRangeSliders() {
      if (this.minPrice > this.maxPrice){
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCategories();
    },
    sortByCategories(category) {
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      })
      if (category){
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          vm.selected = category.name
          return item.category == category.name;
        })
      }
    },
    addToCart(data) {
      this.ADD_TO_CART(data)
      .then(() => {
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
            { name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
        )
      })
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if (response.data) {
        console.log('Data arrived!');
        this.sortByCategories();
      }
    })
  }
}
</script>

<style lang="scss">
  .v-catalog{
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    &__link_to_cart{
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 16px;
      border: 1px solid #aeaeae;
    }

    .filters{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .range-slider{
      width: 200px;
      margin: auto 16px;
      text-align: center;
      position: relative;
    }

    .range-slider svg, .range-slider input[type=range] {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb {
      z-index: 2;
      position: relative;
      top: 2px;
      margin-top: -7px;
    }
  }
</style>