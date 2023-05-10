<script>
import Chip from '@/components/inputs/selection/Chip.vue';

export default {
  name: 'Chiplist',
  components: {Chip},
  data() {
    return {
      data: new Map(),
      showAddData: false,
      addDataEmpty: true
    };
  },
  methods: {
    emitChange() {
      let selection = new Map();
      for (let chip of this.data) {
        if (chip[1].shown) {
          selection.set(chip[0], chip[1]);
        }
      }
      this.$emit('changeAction', this.options.id, selection);
    },

    removeChip(chipId) {
      this.data.get(chipId).shown = false;
      this.emitChange();
    },

    addChip(chipId) {
      this.data.get(chipId).shown = true;
      this.emitChange();
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    for (let dataEntry of this.options.data) {
      dataEntry.shown = false;
      this.data.set(dataEntry.id, dataEntry);
    }
    for (let chipId of this.options.initialSelection) {
      this.data.get(chipId).shown = true;
      this.addDataEmpty = false;
    }
  },
  props: {
    options: {
      data: {type: Array},
      id: {type: String},
      initialSelection: {type: Array},
      label: {type: String},
      multiline: {
        type: Boolean,
        default: false
      }
    }
  }
};
</script>

<template>
  <div class="chiplist">
    <div :class="this.options.multiline ? 'chiplist-container--multiline' : 'chiplist-container'">
      <div v-for="chip in this.data">
        <Chip v-if="chip[1].shown"
              :options="{
                icon: chip[1].icon,
                id: chip[1].id,
                label: chip[1].label,
                removable: true
              }"
              v-on:removeChip="this.removeChip"/>
      </div>
      <div class="chip-add-button" v-if="this.options.multiline">
        <span class="icon" :title="this.options.label" @click="this.showAddData = !this.showAddData">add_circle</span>
        <div class="chiplist-data-container"
             :class="this.showAddData ? 'chiplist-data-container--active' : ''">
          <div v-for="chip in this.data">
            <Chip v-if="!chip[1].shown"
                  :options="{
                  icon: chip[1].icon,
                  id: chip[1].id,
                  label: chip[1].label,
                  removable: false
                }"
                  @click="this.addChip(chip[1].id)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="chip-add-button" v-if="!this.options.multiline">
      <span class="icon" :title="this.options.label" @click="this.showAddData = !this.showAddData">add_circle</span>
      <div class="chiplist-data-container"
           :class="this.showAddData ? 'chiplist-data-container--active' : ''">
        <div v-for="chip in this.data">
          <Chip v-if="!chip[1].shown"
                :options="{
                  icon: chip[1].icon,
                  id: chip[1].id,
                  label: chip[1].label,
                  removable: false
                }"
                @click="this.addChip(chip[1].id)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
