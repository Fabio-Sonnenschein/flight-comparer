<script>
export default {
  name: 'Button_Extend',
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
      helper: {type: String},
      text: {type: String}
    }
  }
};
</script>

<template>
  <div class="button-container button-container--extend" :title="this.options.helper"
       @click="this.$emit('clickAction', this.options.id)">
    <span class="icon button-icon button-icon--extend">{{ this.options.icon }}</span>
    <p class="button-text button-text--extend">{{ this.options.text }}</p>
  </div>
</template>

<style scoped>

</style>
