<script>
export default {
  name: 'Button_Icon',
  data() {
    return {};
  },
  setup(props) {
    return {props};
  },
  props: {
    options: {
      id: {type: String},
      icon: {type: String},
      helper: {type: String}
    }
  }
};
</script>

<template>
  <div class="button-container button-container--icon" :title="this.options.helper"
       @click="this.$emit('clickAction', this.options.id)">
    <span class="icon button-icon">{{ this.options.icon }}</span>
  </div>
</template>

<style scoped>

</style>
