<template>
  <div class="add-element--amenity-container edit-input-column">
    <Input class="edit-input-container"
           :options="{
             fieldType: 'text',
             icon: '',
             id: 'addAmenityText',
             initialValue: '',
             label: 'Amenity',
             placeholder: 'Amenity'
           }"
           @changeAction="(inputId, value) => {this.amenity.text = value;}"/>
    <div class="edit-icon-input-container">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'addAmenityIcon',
               initialValue: '',
               label: 'Icon',
               placeholder: 'Icon'
             }"
             @changeAction="(inputId, value) => {this.amenity.icon = value;}"/>
      <div class="edit-input-container">
        <span class="icon">{{ this.amenity.icon }}</span>
      </div>
    </div>
    <div class="edit-hint-container">
      Icon names can be found on <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Google
      Fonts</a>.
    </div>
    <Input class="edit-input-container"
           :options="{
             fieldType: 'text',
             icon: '',
             id: 'addAmenityDescription',
             initialValue: '',
             label: 'Description',
             placeholder: 'Description'
           }"
           @changeAction="(inputId, value) => {this.amenity.description = value;}"/>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';

export default {
  name: 'AddElement_Amenity',
  components: {Input},
  setup(props) {
    return {props};
  },
  props: {
    amenity: {}
  }
};
</script>

<style scoped>

.add-element--amenity-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}

.add-element--amenity-container .edit-input-container:last-of-type {
  margin-bottom: 0;
}

.edit-icon-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.edit-icon-input-container .edit-input-container {
  margin-right: 1rem;
  margin-bottom: 0;
}

.edit-hint-container {
  margin: .5rem 0 1rem 1rem;
}

</style>
