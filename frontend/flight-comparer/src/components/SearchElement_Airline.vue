<template>
  <div class="search-element">
    <div class="search-element-content-container">
      <div class="airline-content-container">
        <div class="airline-content-container airline-content-container--display" v-if="!this.editMode">
          <h1 class="airline-code">{{ this.airlineData.code }}</h1>
          <div class="airline-details-container">
            <h2 class="airline-name">{{ this.airlineData.name }}</h2>
            <p class="airline-alliance">{{ this.airlineData.alliance }}</p>
          </div>
        </div>
        <div class="airline-content-container airline-content-container--edit" v-if="this.editMode">
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
      </div>
      <div class="search-element-edit-action-container" v-if="this.editable">
        <span class="search-element-edit-action icon" @click="edit" v-if="!this.editMode">edit</span>
        <span class="search-element-edit-action icon" @click="discard" v-if="this.editMode">clear</span>
        <span class="search-element-edit-action icon" @click="save" v-if="this.editMode">save</span>
        <span class="search-element-edit-action icon" @click="deleteItem" v-if="this.editMode">delete</span>
      </div>
    </div>
    <div class="edit-mode-hint" v-if="this.editMode">
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
      airlineAlliance_edit: ''
    };
  },
  methods: {
    edit() {
      this.editMode = true;
      this.airlineCode_edit = this.airlineData.code;
      this.airlineName_edit = this.airlineData.name;
      this.airlineAlliance_edit = this.airlineData.alliance;
    },

    save() {
      // TODO: API Call
      this.airlineData.code = this.airlineCode_edit;
      this.airlineData.name = this.airlineName_edit;
      this.airlineData.alliance = this.airlineAlliance_edit;
      this.editMode = false;
    },

    discard() {
      this.editMode = false;
    },

    deleteItem() {
      // TODO: API Call
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

</style>
