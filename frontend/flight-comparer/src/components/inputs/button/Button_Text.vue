<script>
export default {
  name: 'Button_Text',
  data() {
    return {};
  },
  setup(props) {
    return {props};
  },
  props: {
    options: {
      emphasis: {
        type: Boolean,
        default: false
      },
      id: {type: String},
      helper: {type: String},
      text: {type: String}
    }
  }
};
</script>

<template>
  <div class="button-container button-container--text"
       :class="this.options.emphasis? 'button-container--emphasis' : ''"
       :title="this.options.helper"
       @click="this.$emit('clickAction', this.options.id)">
    <p class="button-text button-text--text">{{ this.options.text }}</p>
  </div>
</template>

<style scoped>

</style>
