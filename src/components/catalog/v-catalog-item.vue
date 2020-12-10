<template>
 <div class="v-catalog-item">

   <v-popup
       v-if="isInfoPopupVisible"
       :popup-title="product_data.name"
       rightBtnTitle="Add To Cart"
       @closePopup="closeInfoPopup"
       @rightBtnAction="addToCart"
   >
     <div>
       <img class="v-catalog-item__img" :src="require('../../assets/images/' + product_data.image)" alt="img">
       <p class="v-catalog-item__name">{{product_data.name}}</p>
       <p class="v-catalog-item__price">Price: {{ product_data.price | toFix | formattedPrice}}</p>
       <p class="v-catalog-item__price">{{ product_data.category }}</p>
     </div>
   </v-popup>


   <img class="v-catalog-item__img" :src="require('../../assets/images/' + product_data.image)" alt="img">
   <p class="v-catalog-item__name">{{product_data.name}}</p>
   <p class="v-catalog-item__price">Price: {{ product_data.price | toFix | formattedPrice }}</p>
   <button
    class="v-catalog-item__show_info"
    @click="showPopupInfo"
    >
     Show info
   </button>
   <button
       class="v-catalog-item__add_to_cart_btn btn"
           @click="addToCart">
     Add to cart
   </button>
 </div>
</template>

<script>
import vPopup from '../popup/v-popup'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
  name: "v-catalog-item",
  components: {
    vPopup
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return{
      isInfoPopupVisible: false
    }
  },
  filters: {
    toFix,
    formattedPrice
  },
  methods: {
    showPopupInfo(){
      this.isInfoPopupVisible = true;
    },
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
    },
    addToCart(){
      this.$emit('addToCart', this.product_data)
    }
  },
  mounted() {
    this.$set(this.product_data, 'quantity', 1)
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