<template>
  <div class="add-element--amenity-container">
    <div class="edit-input-container">
      <label for="amenity-text-input"
             class="edit-input-label">Amenity</label>
      <input type="text"
             class="input input--text edit-input"
             id="amenity-text-input"
             placeholder="Amenity"
             v-model="amenity.text">
    </div>
    <div class="edit-icon-input-container">
      <div class="edit-input-container">
        <label for="amenity-icon-input"
               class="edit-input-label">Icon</label>
        <input type="text"
               class="input input--text edit-input"
               id="amenity-icon-input"
               placeholder="Icon"
               v-model="amenity.icon">
      </div>
      <div class="edit-input-container">
        <span class="icon">{{ this.amenity.icon }}</span>
      </div>
    </div>
    <div class="edit-hint-container">
      Icon names can be found on <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Google
      Fonts</a>.
    </div>
    <div class="edit-input-container">
      <label for="amenity-description-input"
             class="edit-input-label">Description</label>
      <input type="text"
             class="input input--text edit-input"
             id="amenity-description-input"
             placeholder="Description"
             v-model="amenity.description">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddElement_Amenity',
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
  width: 100%;
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
