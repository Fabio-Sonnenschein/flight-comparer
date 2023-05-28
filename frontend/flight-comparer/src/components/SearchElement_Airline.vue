<template>
  <div class="search-element">
    <div class="search-element-content-container">
      <div class="airline-content-container">
        <div class="airline-content-container airline-content-container--display"
             v-if="!this.editMode && !this.removeEntryConfirmation">
          <h1 class="airline-code">{{ this.airlineData.code }}</h1>
          <div class="airline-details-container">
            <h2 class="airline-name">{{ this.airlineData.name }}</h2>
            <p class="airline-alliance">{{ this.airlineData.alliance }}</p>
          </div>
        </div>
        <div class="airline-content-container airline-content-container--edit"
             v-if="this.editMode && !this.removeEntryConfirmation">
          <div class="edit-input-column">
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'iataAirlineCode---' + this.airlineData.id,
                     initialValue: this.airlineCode_edit,
                     label: 'IATA Airline Code',
                     placeholder: 'IATA Airline Code'
                   }"
                   @changeAction="(inputId, value) => {this.airlineCode_edit = value;}"/>
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airlineName---' + this.airlineData.id,
                     initialValue: this.airlineName_edit,
                     label: 'Airline Name',
                     placeholder: 'Airline Name'
                   }"
                   @changeAction="(inputId, value) => {this.airlineName_edit = value;}"/>
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airlineAlliance---' + this.airlineData.id,
                     initialValue: this.airlineAlliance_edit,
                     label: 'Airline Alliance',
                     placeholder: 'Airline Alliance'
                   }"
                   @changeAction="(inputId, value) => {this.airlineAlliance_edit = value;}"/>
          </div>
        </div>
        <div class="remove-entry-confirmation-container" v-if="this.removeEntryConfirmation">
          <div class="remove-entry-confirmation-hint">
            <span class="icon">priority_high</span>
            <p>Deleting an airline will also remove any connected flights and trips!</p>
          </div>
          <div class="remove-entry-confirmation-actions">
            <Button_Text :options="{
                           helper: 'Cancel removal',
                           id: 'cancelRemoval---' + this.airlineData.id,
                           text: 'Cancel'
                         }"
                         @clickAction="this.cancelRemoval"/>
            <Button_Text :options="{
                           emphasis: true,
                           helper: 'Remove airline',
                           id: 'confirmRemoval---' + this.airlineData.id,
                           text: 'Remove Airline',
                         }"
                         @clickAction="this.deleteItem"/>
          </div>
        </div>
      </div>
      <div class="search-element-edit-action-container"
           :class="this.editMode ? 'search-element-edit-action-container--edit-mode' : ''"
           v-if="this.editable && !this.removeEntryConfirmation">
        <Button_Icon :options="{
                       id: 'editAirline---' + this.airlineData.id,
                       icon: 'edit',
                       helper: 'Edit Airline'
                     }"
                     @clickAction="this.edit"
                     v-if="!this.editMode"/>
        <Button_Icon :options="{
                       id: 'discardAirline---' + this.airlineData.id,
                       icon: 'clear',
                       helper: 'Discard Changes'
                     }"
                     @clickAction="this.discard"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'saveAirline---' + this.airlineData.id,
                       icon: 'save',
                       helper: 'Save Changes'
                     }"
                     @clickAction="this.save"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'removeAirline---' + this.airlineData.id,
                       icon: 'delete',
                       helper: 'Remove Airline'
                     }"
                     @clickAction="this.confirmRemoval"
                     v-if="this.editMode"/>
      </div>
    </div>
    <div class="edit-mode-hint" v-if="this.editMode && !this.removeEntryConfirmation">
      <span class="icon">emoji_objects</span>
      <p>Any changes will be reflected on existing flights and trips that are using this airline.</p>
    </div>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';
import Button_Text from '@/components/inputs/button/Button_Text.vue';

export default {
  name: 'SearchElement_Airline',
  components: {Button_Text, Button_Icon, Input},
  data: function () {
    return {
      editMode: false,
      airlineCode_edit: '',
      airlineName_edit: '',
      airlineAlliance_edit: '',
      removeEntryConfirmation: false
    };
  },
  methods: {
    edit() {
      this.editMode = true;
      this.airlineCode_edit = this.airlineData.code;
      this.airlineName_edit = this.airlineData.name;
      this.airlineAlliance_edit = this.airlineData.alliance;
    },

    async save() {
      const request = await fetch('http://127.0.0.1:8080/airline', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: this.airlineData._id,
          alliance: this.airlineAlliance_edit,
          code: this.airlineCode_edit,
          name: this.airlineName_edit
        })
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.airlineData.code = this.airlineCode_edit;
      this.airlineData.name = this.airlineName_edit;
      this.airlineData.alliance = this.airlineAlliance_edit;
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
      const request = await fetch('http://127.0.0.1:8080/airline/' + this.airlineData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.$emit('action', this.airlineData._id);

      this.editMode = false;
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
  },
  props: {
    airlineData: {},
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

.airline-content-container {
  flex-grow: 4;
  display: flex;
  flex-direction: row;
}

.airline-content-container--edit {
  flex-direction: column;
}

.airline-code {
  margin: 0;
  width: 5rem;
  align-self: center;
}

.airline-details-container {
  display: flex;
  flex-direction: column;
}

.airline-name {
  margin: 0;
}

.airline-alliance {
  margin: 0;
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
