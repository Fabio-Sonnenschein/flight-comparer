<template>
  <div class="add-element-background">
    <div class="add-element-container">
      <div class="add-element-header">
        <div class="add-element-header--left">
          <span class="icon" @click="closeDialog">arrow_back</span>
          <h1 class="add-element-type">New {{ this.type }}</h1>
        </div>
        <div class="add-element-header--right">
          <div class="add-element-action" @click="save">
            <span class="icon action-icon">save</span>
            <p class="action-text">Save</p>
          </div>
        </div>
      </div>
      <AddElement_Airline v-if="this.type === 'airline'" :airline="newAirline"/>
      <AddElement_Amenity v-if="this.type === 'amenity'" :amenity="newAmenity"/>
    </div>
  </div>
</template>

<script>
import AddElement_Airline from '@/components/AddElement_Airline.vue';
import AddElement_Amenity from '@/components/AddElement_Amenity.vue';

export default {
  name: 'AddElementWrapper',
  components: {AddElement_Amenity, AddElement_Airline},
  data: function () {
    return {
      newAirline: {},
      newAmenity: {}
    };
  },
  methods: {
    closeDialog() {
      this.$emit('closeOverlay');
    },

    save() {
      switch (this.type) {
        case 'airline':
          this.apiPOSTAirline();
          break;
        case 'amenity':
          this.apiPOSTAmenity();
          break;
        default:
          this.closeDialog();
          break;
      }
    },

    async apiPOSTAirline() {
      const request = await fetch('http://127.0.0.1:8080/airline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alliance: this.newAirline.alliance,
          code: this.newAirline.code,
          name: this.newAirline.name
        })
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      if (response !== null && response !== '' && response !== undefined) {
        this.newAirline._id = response.InsertedID;
      }

      this.$emit('created', this.newAirline);
    },

    async apiPOSTAmenity() {
      const request = await fetch('http://127.0.0.1:8080/amenity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: this.newAmenity.description,
          icon: this.newAmenity.icon,
          text: this.newAmenity.text
        })
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      if (response !== null && response !== '' && response !== undefined) {
        this.newAmenity._id = response.InsertedID;
      }

      this.$emit('created', this.newAmenity);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
  },
  props: {
    type: ''
  }
};
</script>

<style scoped>

.add-element-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background-69);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-element-container {
  background: var(--color-background-less);
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 0 20px 0 var(--color-background);
  width: 60rem;
  max-height: 60rem;
  overflow: auto;
}

.add-element-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.add-element-header--left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.add-element-header--left .icon {
  padding: 1rem;
  cursor: pointer;
}

.add-element-type {
  margin: 0 0 0 1rem;
  text-transform: capitalize;
}

.add-element-action {
  background: var(--color-background);
  border-radius: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}

.add-element-action .action-text {
  opacity: 0;
  width: 0;
  transition: .3s;
}

.add-element-action:hover > .action-text {
  opacity: 1;
  width: 4rem;
}

</style>
