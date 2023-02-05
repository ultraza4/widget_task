<template>
    <div class="settings-wrapper d-flex flex-column h-100">
        <header class="d-flex flex-row justify-content-between align-items-center mb-3">
            <span>Settings</span>
            <div class="settings-close" @click="$emit('setSettings')">
                <Icon icon="material-symbols:close" />
            </div>
        </header>
        <DragAndDropList @deleteCity="deleteCity" @setChosenCity="setChosenCity" :cities="cities"
            :chosenCity="chosenCity" />
        <div class="add-city d-flex flex-row align-items-center">
            <input v-model.trim="cityName" placeholder="Enter city" class="input" />
            <button class="btn btn-sm btn-warning m-1" @click="addCity">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import DragAndDropList from './dragAndDropList.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    emits: ["setSettings", "addCity", "setChosenCity", "deleteCity"],
    data() {
        return {
            cityName: "",
        }
    },
    components: {
        Icon,
        DragAndDropList
    },
    props: {
        chosenCity: String,
        cities: {
            type: Array as PropType<Array<string>>,
            required: true,
            default: []
        }
    },
    methods: {
        deleteCity(city: string): void {
            this.$emit('deleteCity', city)
        },
        addCity(): void {
            this.$emit('addCity', this.cityName)
            this.cityName = ""
        },
        setChosenCity(city: string): void {
            this.$emit('setChosenCity', city)
        }
    }
})
</script>

<style scoped>
.settings-close {
    cursor: pointer;
}

.add-city {
    margin-top: auto;
}

.input {
    width: 80%;
    margin: 0px 5px;
}

.btn {
    background-color: cornflowerblue;
    border-color: cornflowerblue;
    color: white;
}
</style>