<script>

export default {
  name: 'Select_List',
  data() {
    return {
      optionKey: 0
    };
  },
  methods: {
    toggleSelection(option) {
      option.selected = !option.selected;
      option.optionKey++;
      this.$emit('changeAction', this.options.id, this.options.data);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    for (let option of this.options.data) {
      option.optionKey = 0;
    }
  },
  props: {
    options: {
      data: {type: Array},
      valueVariable: {type: String},
      labelVariable: {type: String},
      iconVariable: {type: String},
      id: {type: String},
      label: {type: String}
    }
  }
};

</script>

<template>
  <div class="select-list">
    <label class="input-label">{{ this.options.label }}</label>
    <div class="select-list-options">
      <div class="select-list-option"
           v-for="option of this.options.data">
        <div :id="option[this.options.valueVariable]"
             class="select-list-option-selection-container"
             @click="this.toggleSelection(option)">
          <div class="select-list-option-selection-container--left">
            <span class="icon select-list-option-selection-icon"
                  :key="option.optionKey">
              {{ option.selected ? 'check' : '' }}
            </span>
            <p class="select-list-option-selection-label">
              {{ option[this.options.labelVariable] }}
            </p>
          </div>
          <div class="select-list-option-selection-container--right"
               v-if="option[this.options.iconVariable] !== ''">
            <span class="icon">
              {{ option[this.options.iconVariable] }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
