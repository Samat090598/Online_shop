<template>
<div class="v-select">
  <p
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
  >{{ selected }}</p>
  <div
      class="options"
      v-if="areOptionsVisible || isExpended"
  >
    <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
    >
      {{option.name}}
    </p>
  </div>
</div>
</template>

<script>
export default {
name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    },
    isExpended: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style>
  .v-select{
    position: relative;
    width: 200px;
    cursor: pointer;
  }
  .title{
    border: 1px solid #aeaeae;
  }
  .v-select p {
    margin: 0;
  }
  .options{
    border: 1px solid #aeaeae;
    position: absolute;
    top: 30px;
    right: 0;
    width: 100%;
    background: #ffffff;
  }

  .options p:hover {
    background: #e7e7e7;
  }
</style>