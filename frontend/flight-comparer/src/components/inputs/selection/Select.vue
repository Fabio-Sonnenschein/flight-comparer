<script>
export default {
  name: 'Select',
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
      valueVariable: {type: String},
      labelVariable: {type: String},
      icon: {type: String},
      id: {type: String},
      initialValue: {type: String},
      label: {type: String}
    }
  }
};
</script>

<template>
  <div class="input-container input-container--text input-container--select">
    <span class="icon input-icon"
          :class="this.options.icon === '' ? 'input-icon--empty' : ''">{{ this.options.icon }}</span>
    <div class="input-container-center">
      <label class="input-label"
             :class="this.value !== '' && this.value !== undefined ? 'input-label-content-position' : ''"
             :for="'input---' + this.options.id">{{ this.options.label }}</label>
      <select
          :id="'input---' + this.options.id"
          class="input input--select"
          v-model="this.value"
          @change="this.emitChange">
        <option v-for="option of this.options.data" :value="option[this.options.valueVariable]">
          {{ option[this.options.labelVariable] }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>
