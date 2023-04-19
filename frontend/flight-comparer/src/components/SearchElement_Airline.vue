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
          <div class="edit-input-container">
            <label for="airline-code-input"
                   class="edit-input-label">IATA Airline Code</label>
            <input type="text"
                   class="input input--text edit-input"
                   id="airline-code-input"
                   placeholder="IATA Airline Code"
                   v-model="airlineCode_edit">
          </div>
          <div class="edit-input-container">
            <label for="airline-name-input"
                   class="edit-input-label">Airline Name</label>
            <input type="text"
                   class="input input--text edit-input"
                   id="airline-name-input"
                   placeholder="Airline Name"
                   v-model="airlineName_edit">
          </div>
          <div class="edit-input-container">
            <label for="airline-alliance-input"
                   class="edit-input-label">Alliance</label>
            <input type="text"
                   class="input input--text edit-input"
                   id="airline-alliance-input"
                   placeholder="Alliance"
                   v-model="airlineAlliance_edit">
          </div>
        </div>
        <div class="remove-entry-confirmation-container" v-if="this.removeEntryConfirmation">
          <div class="remove-entry-confirmation-hint">
            <span class="icon">priority_high</span>
            <p>Deleting an airline will also remove any connected flights and trips!</p>
          </div>
          <div class="remove-entry-confirmation-actions">
            <div class="remove-entry-confirmation-action" @click="cancelRemoval">
              Cancel
            </div>
            <div class="remove-entry-confirmation-action remove-entry-confirmation-action--emphasis"
                 @click="deleteItem">
              Remove airline
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
      <p>Any changes will be reflected on existing flights and trips that are using this airline.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchElement_Airline',
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
      const request = await fetch('http://localhost:8080/airline', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: this.airlineData._id,
          code: this.airlineCode_edit,
          name: this.airlineName_edit,
          alliance: this.airlineAlliance_edit
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
      const request = await fetch('http://localhost:8080/airline/' + this.airlineData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();
      console.log(response);

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
}

.airline-content-container {
  flex-grow: 4;
  display: flex;
  flex-direction: row;
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

.search-element-edit-action {
  padding: 1rem;
  cursor: pointer;
}

.airline-content-container--edit {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.airline-content-container--edit .edit-input-container {
  margin-right: 1rem;
  margin-bottom: 0;
}

.edit-input-container {
  display: flex;
  flex-direction: column;
  margin-top: .5rem;
  margin-bottom: 1rem;
}

.edit-input-label {
  font-size: .9rem;
  margin-left: 1rem;
  margin-bottom: -1.75rem;
  z-index: 2;
  user-select: none;
}

.edit-input {
  background: var(--color-background);
  border-radius: 8px;
  border: none;
  padding: 2.25rem 1rem 1rem;
  color: var(--color-text);
  outline: none;
  font-size: 1.125rem;
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
