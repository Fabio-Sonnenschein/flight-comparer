<script>
export default {
  name: 'Datalist',
  data() {
    return {
      value: {
        type: String,
        default: ''
      }
    };
  },
  methods: {
    emitChange() {
      this.$emit('changeAction', this.options.id, this.value);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    this.value = this.options.initialValue;
  },
  props: {
    options: {
      data: {type: Array},
      icon: {type: String},
      id: {type: String},
      initialValue: {type: String},
      label: {type: String},
      placeholder: {type: String}
    }
  }
};
</script>

<template>
  <div class="input-container input-container--text">
    <span class="icon input-icon"
          :class="this.options.icon === '' ? 'input-icon--empty' : ''">{{ this.options.icon }}</span>
    <div class="input-container-center">
      <label class="input-label"
             :class="this.value !== '' ? 'input-label-content-position' : ''"
             :for="'input---' + this.options.id">{{ this.options.label }}</label>
      <input
            :list="'list---' + this.options.id"
            :id="'input---' + this.options.id"
            class="input input--datalist"
            :placeholder="this.options.placeholder"
            v-model="this.value"
            @input="this.emitChange">
    </div>

    <datalist :id="'list---' + this.options.id">
      <option v-for="option of this.options.data" :value="option">{{ option }}</option>
    </datalist>
  </div>
</template>

<style scoped>

</style>
