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
        <div class="amenity-content-container amenity-content-container--edit edit-input-column"
             v-if="this.editMode && !this.removeEntryConfirmation">
          <Input class="edit-input-container"
                 :options="{
                   fieldType: 'text',
                   icon: '',
                   id: 'amenityText---' + this.amenityData.id,
                   initialValue: this.amenityEdit.text,
                   label: 'Amenity',
                   placeholder: 'Amenity'
                 }"
                 @changeAction="(inputId, value) => {this.amenityEdit.text = value;}"/>
          <div>
            <div class="edit-icon-input-container">
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'amenityIcon---' + this.amenityData.id,
                       initialValue: this.amenityEdit.icon,
                       label: 'Icon',
                       placeholder: 'Icon'
                     }"
                     @changeAction="(inputId, value) => {this.amenityEdit.icon = value;}"/>
              <div class="edit-input-icon-container">
                <span class="icon">{{ this.amenityEdit.icon }}</span>
              </div>
            </div>
            <div class="edit-hint-container">
              Icon names can be found on <a href="https://fonts.google.com/icons" target="_blank"
                                            rel="noopener noreferrer">Google
              Fonts</a>.
            </div>
          </div>
          <Input class="edit-input-container"
                 :options="{
                   fieldType: 'text',
                   icon: '',
                   id: 'amenityDescription---' + this.amenityData.id,
                   initialValue: this.amenityEdit.description,
                   label: 'Description',
                   placeholder: 'Description'
                 }"
                 @changeAction="(inputId, value) => {this.amenityEdit.description = value;}"/>
        </div>
        <div class="remove-entry-confirmation-container" v-if="this.removeEntryConfirmation">
          <div class="remove-entry-confirmation-hint">
            <span class="icon">priority_high</span>
            <p>Deleting an amenity will also remove any airports with lounges that offer this amenity!</p>
          </div>
          <div class="remove-entry-confirmation-actions">
            <Button_Text :options="{
                           helper: 'Cancel removal',
                           id: 'cancelRemoval---' + this.amenityData.id,
                           text: 'Cancel'
                         }"
                         @clickAction="this.cancelRemoval"/>
            <Button_Text :options="{
                           emphasis: true,
                           helper: 'Remove amenity',
                           id: 'confirmRemoval---' + this.amenityData.id,
                           text: 'Remove Amenity',
                         }"
                         @clickAction="this.deleteItem"/>
          </div>
        </div>
      </div>
      <div class="search-element-edit-action-container"
           :class="this.editMode ? 'search-element-edit-action-container--edit-mode' : ''"
           v-if="this.editable && !this.removeEntryConfirmation">
        <Button_Icon :options="{
                       id: 'editAmenity---' + this.amenityData.id,
                       icon: 'edit',
                       helper: 'Edit Amenity'
                     }"
                     @clickAction="this.edit"
                     v-if="!this.editMode"/>
        <Button_Icon :options="{
                       id: 'discardAmenity---' + this.amenityData.id,
                       icon: 'clear',
                       helper: 'Discard Changes'
                     }"
                     @clickAction="this.discard"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'saveAmenity---' + this.amenityData.id,
                       icon: 'save',
                       helper: 'Save Changes'
                     }"
                     @clickAction="this.save"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'removeAmenity---' + this.amenityData.id,
                       icon: 'delete',
                       helper: 'Remove Amenity'
                     }"
                     @clickAction="this.confirmRemoval"
                     v-if="this.editMode"/>
      </div>
    </div>
    <div class="edit-mode-hint" v-if="this.editMode && !this.removeEntryConfirmation">
      <span class="icon">emoji_objects</span>
      <p>Any changes will be reflected on existing airport lounges.</p>
    </div>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';
import Button_Text from '@/components/inputs/button/Button_Text.vue';
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';

export default {
  name: 'SearchElement_Amenity',
  components: {Button_Icon, Button_Text, Input},
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
  position: relative;
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

.search-element-edit-action-container--edit-mode {
  align-items: flex-start;
  position: absolute;
  right: 0;
}

.search-element-edit-action-container > .button-container--icon {
  margin-left: 1rem;
}

.search-element-edit-action-container > .button-container--icon:first-of-type {
  margin-left: 0;
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

.edit-input-icon-container {
  padding-bottom: 1rem;
  margin-left: .5rem;
}

.edit-hint-container {
  margin: -.5rem 0 2rem 1rem;
}

.edit-mode-hint {
  padding: 1rem;
  margin: 0 -1rem -1rem -1rem;
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

.remove-entry-confirmation-actions > .button-container {
  margin-left: 1rem;
}

.remove-entry-confirmation-actions > .button-container:first-of-type {
  margin-left: 0;
}

</style>
