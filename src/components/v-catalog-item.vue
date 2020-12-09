<template>
 <div class="v-catalog-item">
   <img class="v-catalog-item__img" :src="require('../assets/images/' + product_data.image)" alt="img">
   <p class="v-catalog-item__name">{{product_data.name}}</p>
   <p class="v-catalog-item__price">Price: {{ product_data.price }} KZ</p>
   <button
       class="v-catalog-item__add_to_cart_btn btn"
           @click="sendDataToParent">
     Add to cart
   </button>
 </div>
</template>

<script>
export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    sendDataToParent() {
      this.$emit('sendArticle', this.product_data.article)
    }
  }
}
</script>

<style lang="scss">
  .v-catalog-item{
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 8*2px;
    margin-bottom: 8*2px;

    &__img{
      width: 100px;
      height: 100px;
    }
  }
</style>