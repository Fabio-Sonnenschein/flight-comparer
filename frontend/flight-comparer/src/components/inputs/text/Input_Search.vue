<script>
export default {
  name: 'Input_Search',
  data() {
    return {
      query: {type: String}
    };
  },
  methods: {
    clearInput() {
      this.query = '';
      this.$emit('clearAction', this.options.id);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    this.query = this.options.initialValue;
  },
  props: {
    options: {
      id: {type: String},
      placeholder: {type: String},
      initialValue: {type: String}
    }
  }
};
</script>

<template>
  <div class="input-container input-container--search">
    <span class="icon input-icon input-icon--search">search</span>
    <input
          type="text"
          class="input--search"
          :placeholder="this.options.placeholder"
          v-model="this.query"
          @input="this.$emit('changeAction', this.options.id, this.query)">
    <span class="icon input-icon input-icon--clear"
          :class="this.query !== '' ? 'input-icon--clear-display' : ''"
          @click="this.clearInput">cancel</span>
  </div>
</template>

<style scoped>

</style>
