<template>
  <div class="v-cart-item">
    <img class="v-cart-item__img" :src="require('../assets/images/' + cart_item_data.image)" alt="img">
    <div class="cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price}}</p>
      <p>{{cart_item_data.article}}</p>
      <div class="v-cart-item__quantity">qty:
        <span>
          <span class="quantity_button" @click="incrementItem">+</span>
          {{cart_item_data.quantity}}
          <span class="quantity_button" @click="decrementItem">-</span>
        </span>
      </div>
    </div>
    <div class="v-cart-item__quantity">
      <button @click="deleteFromCart">Delete</button>
    </div>
  </div>
</template>

<script>

export default {
name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    decrementItem(){
      this.$emit('decrement')
    },
    incrementItem(){
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  }
}
</script>

<style lang="scss">
  .v-cart-item{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 8*2px;
    margin-bottom: 8*2px;

    &__img{
      max-width: 50px;
    }

    .quantity_button{
      cursor: pointer;
    }
  }
</style>