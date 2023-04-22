<template>
  <div class="search-element">
    <div class="search-element-content-container">
      <div class="amenity-content-container">
        <div class="amenity-content-container amenity-content-container--display"
             v-if="!this.editMode && !this.removeEntryConfirmation">
          <div class="amenity-icon-text-container">
            <span class="amenity-icon icon">{{ this.amenityData.icon }}</span>
            <p class="amenity-text">{{ this.amenityData.text }}</p>
          </div>
          <p class="amenity-description">{{ this.amenityData.description }}</p>
        </div>
        <div class="amenity-content-container amenity-content-container--edit"
             v-if="this.editMode && !this.removeEntryConfirmation">
          <div class="edit-input-container">
            <label for="amenity-text-input"
                   class="edit-input-label">Amenity</label>
            <input type="text"
                   class="input input--text edit-input"
                   id="amenity-text-input"
                   placeholder="Amenity"
                   v-model="amenityEdit.text">
          </div>
          <div>
            <div class="edit-icon-input-container">
              <div class="edit-input-container">
                <label for="amenity-icon-input"
                       class="edit-input-label">Icon</label>
                <input type="text"
                       class="input input--text edit-input"
                       id="amenity-icon-input"
                       placeholder="Icon"
                       v-model="amenityEdit.icon">
              </div>
              <div class="edit-input-container">
                <span class="icon">{{ this.amenityEdit.icon }}</span>
              </div>
            </div>
            <div class="edit-hint-container">
              Icon names can be found on <a href="https://fonts.google.com/icons" target="_blank"
                                            rel="noopener noreferrer">Google
              Fonts</a>.
            </div>
          </div>
          <div class="edit-input-container">
            <label for="amenity-description-input"
                   class="edit-input-label">Description</label>
            <input type="text"
                   class="input input--text edit-input"
                   id="amenity-description-input"
                   placeholder="Description"
                   v-model="amenityEdit.description">
          </div>
        </div>
        <div class="remove-entry-confirmation-container" v-if="this.removeEntryConfirmation">
          <div class="remove-entry-confirmation-hint">
            <span class="icon">priority_high</span>
            <p>Deleting an amenity will also remove any airports with lounges that offer this amenity!</p>
          </div>
          <div class="remove-entry-confirmation-actions">
            <div class="remove-entry-confirmation-action" @click="cancelRemoval">
              Cancel
            </div>
            <div class="remove-entry-confirmation-action remove-entry-confirmation-action--emphasis"
                 @click="deleteItem">
              Remove amenity
            </div>
          </div>
        </div>
      </div>
      <div class="search-element-edit-action-container" v-if="this.editable && !this.removeEntryConfirmation">
        <span class="search-element-edit-action icon" @click="edit" v-if="!this.editMode">edit</span>
        <span class="search-element-edit-action icon" @click="discard" v-if="this.editMode">clear</span>
        <span class="search-element-edit-action icon" @click="save" v-if="this.editMode">save</span>
        <span class="search-element-edit-action icon" @click="confirmRemoval" v-if="this.editMode">delete</span>
      </div>
    </div>
    <div class="edit-mode-hint" v-if="this.editMode && !this.removeEntryConfirmation">
      <span class="icon">emoji_objects</span>
      <p>Any changes will be reflected on existing airport lounges.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchElement_Amenity',
  data: function () {
    return {
      editMode: false,
      amenityEdit: {},
      removeEntryConfirmation: false
    };
  },
  methods: {
    edit() {
      this.editMode = true;
      this.amenityEdit.description = this.amenityData.description;
      this.amenityEdit.icon = this.amenityData.icon;
      this.amenityEdit.text = this.amenityData.text;
    },

    async save() {
      const request = await fetch('http://127.0.0.1:8080/amenity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: this.amenityData._id,
          description: this.amenityEdit.description,
          icon: this.amenityEdit.icon,
          text: this.amenityEdit.text
        })
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.amenityData.description = this.amenityEdit.description;
      this.amenityData.icon = this.amenityEdit.icon;
      this.amenityData.text = this.amenityEdit.text;
      this.editMode = false;
    },

    discard() {
      this.editMode = false;
    },

    confirmRemoval() {
      this.editMode = false;
      this.removeEntryConfirmation = true;
    },

    cancelRemoval() {
      this.editMode = false;
      this.removeEntryConfirmation = false;
      this.discard();
    },

    async deleteItem() {
      const request = await fetch('http://127.0.0.1:8080/amenity/' + this.amenityData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.$emit('action', this.amenityData._id);

      this.editMode = false;
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
  },
  props: {
    amenityData: {},
    editable: Boolean
  }
};
</script>

<style scoped>

.search-element {
  background: var(--color-background-less);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.search-element-content-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.amenity-content-container {
  flex-grow: 4;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.amenity-icon-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 5rem;
  min-height: 5rem;
}

.amenity-icon {
  font-size: 2rem;
  margin: 0 0 .5rem;
}

.amenity-text {
  margin: .25rem 0 0;
  text-align: center;
  line-height: 1.25rem;
}

.search-element-edit-action-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.search-element-edit-action {
  padding: 1rem;
  cursor: pointer;
}

.amenity-content-container--edit {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.edit-icon-input-container .edit-input-container {
  margin-right: 1rem;
}

.edit-icon-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.edit-hint-container {
  margin: -.5rem 0 1rem 1rem;
}

.edit-mode-hint {
  padding: 1rem;
  margin: 1rem -1rem -1rem -1rem;
  background: var(--color-background);
  border: 2px solid var(--color-background-less);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.edit-mode-hint p {
  margin: 0 0 0 1rem;
}

.remove-entry-confirmation-container {
  margin: -1rem;
  border: 2px solid var(--color-error);
  border-radius: 8px;
  flex-grow: 4;
  padding: 1rem;
}

.remove-entry-confirmation-hint {
  padding: 1rem;
  margin: -1rem -1rem 0 -1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.remove-entry-confirmation-hint p {
  margin: 0 0 0 1rem;
}

.remove-entry-confirmation-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: .5rem;
}

.remove-entry-confirmation-action {
  padding: .5rem 1rem;
  background: var(--color-background);
  border-radius: 8px;
  margin-left: 1rem;
  text-transform: uppercase;
  letter-spacing: .15rem;
  cursor: pointer;
}

.remove-entry-confirmation-action--emphasis {
  background: var(--color-error);
}

</style>
