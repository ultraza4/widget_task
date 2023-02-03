<template>
    <div class="settings-wrapper">
        <header class="d-flex flex-row justify-content-between align-items-center mb-3">
            <span>Settings</span>
            <div class="settings-close" @click="$emit('setSettings')">
                <Icon icon="material-symbols:close" />
            </div>
        </header>
        <div class="cities-list d-flex flex-column">
            <div v-for="city in cities" :key="city" @click="$emit('setChosenCity', city)" role="button"
                class="city-item d-flex justify-content-between mb-2">
                {{ city }}
                <div class="remove-btn" role="button" @click="$emit('deleteCity', city)">
                    <Icon icon="ph:trash" />
                </div>
            </div>
        </div>
        <div class="add-city d-flex flex-row align-items-center">
            <input v-model.trim="cityName" placeholder="Enter city" />
            <button @click="$emit('addCity', cityName)">add city</button>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    emits: ["setSettings", "addCity", "setChosenCity", "deleteCity"],
    data() {
        return {
            cityName: "",
        }
    },
    components: {
        Icon
    },
    props: {
        cities: Array,
    },
    methods: {
    }
}
</script>

<style scoped>
.settings-close {
    cursor: pointer;
}
</style>