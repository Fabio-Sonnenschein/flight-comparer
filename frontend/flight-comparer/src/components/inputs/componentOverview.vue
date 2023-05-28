<script>
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';
import Button_Text from '@/components/inputs/button/Button_Text.vue';
import Input_Search from '@/components/inputs/text/Input_Search.vue';
import Input from '@/components/inputs/text/Input.vue';
import Datalist from '@/components/inputs/selection/Datalist.vue';
import Select from '@/components/inputs/selection/Select.vue';
import Chiplist from '@/components/inputs/selection/Chiplist.vue';
import Select_List from '@/components/inputs/selection/Select_List.vue';

export default {
  name: 'componentOverview',
  components: {Select_List, Chiplist, Select, Datalist, Input, Input_Search, Button_Text, Button_Icon, Button_Extend},
  methods: {
    buttonPush(buttonId) {
      console.log(buttonId);
    },

    textInput(inputId, value) {
      console.log(inputId + ':', value);
    },

    clearInput(inputId) {
      console.log(inputId + ': clear');
    },

    datalistSelection(inputId, value) {
      console.log(inputId + ':', value);
    }
  }
};

</script>

<template>
  <div class="component-table">
    <Button_Icon class="button--icon-element"
                 :options="{
                   id: 'icon',
                   icon: 'add',
                   helper: 'Add Element'
                 }"
                 @clickAction="this.buttonPush"/>
    <Button_Extend class="button--extend-element"
                   :options="{
                     id: 'extend',
                     icon: 'save',
                     helper: '',
                     text: 'Save Changes'
                   }"
                   @clickAction="this.buttonPush"/>
    <Button_Text class="button--text-element"
                 :options="{
                   id: 'text',
                   helper: '',
                   text: 'Discard Changes'
                 }"
                 @clickAction="this.buttonPush"/>
    <Input_Search class="input--search-element"
                  :options="{
                    id: 'search',
                    placeholder: 'Search for something',
                    initialValue: ''
                  }"
                  @changeAction="this.textInput"
                  @clearAction="this.clearInput"/>
    <Input class="input--text-element"
           :options="{
             clearable: true,
             fieldType: 'text',
             helper: '',
             icon: '',
             id: 'name',
             initialValue: '',
             label: 'Name',
             placeholder: 'Name'
           }"
           @changeAction="this.textInput"
           @clearAction="this.clearInput"/>
    <Datalist class="datalist-element"
              :options="{
                data: ['Air Canada', 'ANA', 'Iberia'],
                icon: 'airlines',
                id: 'datalist',
                initialValue: 'Air Canada',
                label: 'Airline',
                placeholder: 'Airline'
              }"
              @changeAction="this.datalistSelection"/>
    <Select class="select-element"
            :options="{
              data: ['Air Canada', 'ANA', 'Iberia'],
              icon: 'airlines',
              id: 'select',
              initialValue: '',
              label: 'Airline',
              placeholder: 'Airline'
            }"
            @changeAction="this.datalistSelection"/>
    <Select_List class="select-list-element"
                 :options="{
                   data: [{
                     _id: 'aircanada#1111',
                     name: 'Air Canada',
                     selected: true
                   }, {
                     _id: 'ana#1111',
                     name: 'ANA'
                   }],
                   id: 'select-list',
                   valueVariable: '_id',
                   labelVariable: 'name',
                   label: 'Airlines'
                 }"
                 @changeAction="this.datalistSelection"/>
    <Chiplist class="chiplist-element"
              :options="{
                data: [{
                  icon: 'airlines',
                  id: 'airline',
                  label: 'Airline'
                }, {
                  icon: 'flight',
                  id: 'flight',
                  label: 'Flight'
                }],
                id: 'chiplist',
                initialSelection: ['airline'],
                label: 'Add Chip'
              }"
              @changeAction="this.datalistSelection"/>
    <Chiplist class="chiplist--multiline-element"
              :options="{
                data: [{
                  icon: 'airlines',
                  id: 'airline',
                  label: 'Airline'
                }, {
                  icon: 'flight',
                  id: 'flight',
                  label: 'Flight'
                }],
                id: 'chiplist',
                initialSelection: ['flight'],
                label: 'Add Chip',
                multiline: true
              }"
              @changeAction="this.datalistSelection"/>
  </div>
</template>

<style scoped>

.component-table {
  position: fixed;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  overflow: auto;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 25rem 25rem 25rem;
  grid-template-areas:
          "button--icon button--extend button--text"
          "input--search input--text input--text"
          "datalist select select-list"
          "chiplist chiplist--multiline z";
  row-gap: 2rem;
  column-gap: 2rem;
  align-items: center;
  justify-items: center;
  background: var(--color-background-less);
}

.button--icon-element {
  grid-area: button--icon;
}

.button--extend-element {
  grid-area: button--extend;
}

.button--text-element {
  grid-area: button--text;
}

.input--search-element {
  grid-area: input--search;
}

.input--text-element {
  grid-area: input--text;
}

.datalist-element {
  grid-area: datalist;
}

.select-element {
  grid-area: select;
}

.select-list-element {
  grid-area: select-list;
}

.chiplist-element {
  grid-area: chiplist;
}

.chiplist--multiline-element {
  grid-area: chiplist--multiline;
}

</style>
