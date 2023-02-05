<template>
    <div class="settings-wrapper d-flex flex-column h-100">
        <header class="d-flex flex-row justify-content-between align-items-center mb-3">
            <span>Settings</span>
            <div class="settings-close" @click="$emit('setSettings')">
                <Icon icon="material-symbols:close" />
            </div>
        </header>
        <DragAndDropList :cities="cities" @deleteCity="deleteCity" @setChosenCity="setChosenCity"
            :chosenCity="chosenCity" />
        <div class="add-city d-flex flex-row align-items-center">
            <input v-model.trim="cityName" placeholder="Enter city" class="input" />
            <button class="btn btn-sm btn-warning m-1" @click="addCity">Add</button>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import DragAndDropList from './dragAndDropList.vue';

export default {
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
        cities: Array,
        chosenCity: String
    },
    methods: {
        deleteCity(city) {
            this.$emit('deleteCity', city)
        },
        addCity() {
            this.$emit('addCity', this.cityName)
            this.cityName = ""
        },
        setChosenCity(city) {
            this.$emit('setChosenCity', city)
        }
    }
}
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