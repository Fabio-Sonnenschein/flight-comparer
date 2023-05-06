<script>
export default {
  name: 'Chip',
  data() {
    return {};
  },
  methods: {
    emitRemoval() {
      this.$emit('removeChip', this.options.id);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
  },
  props: {
    options: {
      icon: {type: String},
      id: {type: String},
      label: {type: String},
      removable: {
        type: Boolean,
        default: true
      }
    }
  }
};
</script>

<template>
  <div class="chip-container">
    <span class="icon chip-icon" v-if="this.options.icon !== ''">{{ this.options.icon }}</span>
    <p class="chip-label">{{ this.options.label }}</p>
    <span class="icon chip-icon--remove"
          v-if="this.options.removable"
          @click="this.emitRemoval">cancel</span>
  </div>
</template>

<style scoped>

</style>
