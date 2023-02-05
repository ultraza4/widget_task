<template>
   <div class="flex m-10">
      <draggable class="list-group" :list="cities" handle=".area" @start="drag = true" @end="drag = false"
         @change="setChangedCities">
         <transition-group name="flip-transition">
            <div class="list-group-item bg-gray-300 m-1 p-1 rounded-md d-flex flex-row"
               :class="{ active: city === chosenCity }" v-for="city in cities" :key="city">
               <span class="area">
                  <Icon icon="circum:menu-burger" />
               </span>
               <span class="me-auto" role="button" @click="$emit('setChosenCity', city)">
                  {{ city }}
               </span>
               <div class="remove-btn" role="button" @click="$emit('deleteCity', city)">
                  <Icon icon="ph:trash" />
               </div>
            </div>
         </transition-group>

      </draggable>
   </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import { Icon } from '@iconify/vue';

export default {
   emits: ["setChosenCity", "deleteCity"],
   data() {
      return {
         enabled: true,
         dragging: false
      }
   },
   props: {
      cities: Array,
      chosenCity: String
   },
   components: {
      draggable: VueDraggableNext,
      Icon,
   },
   methods: {
      setChangedCities() {
         localStorage.setItem('cities', JSON.stringify(this.cities))
      }
   },
}
</script>

<style scoped>
.bg-primary {
   background-color: #007bff !important;
}

.area {
   cursor: move;
   cursor: -webkit-grabbing;
   margin-right: 5px;
}

.active {
   background-color: cornflowerblue
}

.flip-transition-move {
   transition: all 0.7s;
}

.list-group-item {
   padding: 10px;
   border: 1px solid #ccc;
}
</style>