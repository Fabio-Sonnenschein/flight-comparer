<script>
export default {
  name: 'Input',
  data() {
    return {
      error: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      valid: {
        type: Boolean,
        default: true
      }
    };
  },
  methods: {
    emitClear() {
      this.value = '';
      this.$emit('clearAction', this.options.id);
    },

    checkInput() {
      if (this.options.validate) {
        switch (this.options.fieldType) {
          case 'email':
            if (!new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+').test(this.value)) {
              this.error = 'Please enter a valid email address.';
              this.valid = false;
            } else {
              this.valid = true;
            }
            break;
          default:
            break;
        }
        if (this.options.required && this.value === '') {
          this.error = 'This field is required.';
          this.valid = false;
        }
      }
    },

    emitChange() {
      this.checkInput();
      this.$emit('changeAction', this.options.id, this.value);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    this.value = this.options.initialValue;
    this.checkInput();
  },
  props: {
    options: {
      clearable: {
        type: Boolean,
        default: false
      },
      fieldType: {
        type: String,
        default: 'text'
      },
      helper: {
        type: String,
        default: ''
      },
      icon: {type: String},
      id: {type: String},
      initialValue: {type: String},
      label: {type: String},
      max: {type: Number},
      min: {type: Number},
      step: {type: Number},
      placeholder: {type: String},
      required: {
        type: Boolean,
        default: false
      },
      validate: {
        type: Boolean,
        default: false
      }
    }
  }
};
</script>

<template>
  <div class="input-element">
    <div class="input-container input-container--text"
         :class="!this.valid ? 'input-container--invalid' : ''">
      <span class="icon input-icon"
            :class="this.options.icon === '' ? 'input-icon--empty' : ''">{{ this.options.icon }}</span>
      <div class="input-container-center">
        <label class="input-label"
               :class="this.value !== '' ? 'input-label-content-position' : ''"
               :for="'input---' + this.options.id">
          {{ this.options.label }} {{ this.options.required ? '*' : '' }}
        </label>
        <input
              :type="this.options.fieldType"
              :max="this.options.max"
              :min="this.options.min"
              :step="this.options.step"
              :id="'input---' + this.options.id"
              class="input"
              :placeholder="this.options.placeholder"
              :required="this.options.required"
              v-model="this.value"
              @input="this.emitChange">
      </div>
      <span class="icon input-icon input-icon--clear"
            :class="this.value !== '' && this.options.clearable ? 'input-icon--clear-display' : ''"
            v-if="this.options.clearable"
            @click="this.emitClear">cancel</span>
    </div>
    <p class="input-helper input-helper--invalid"
       v-if="!this.valid">{{ this.error }}</p>
    <p class="input-helper"
       v-if="this.options.helper !== '' && this.valid">{{ this.options.helper }}</p>
  </div>
</template>

<style scoped>

</style>
