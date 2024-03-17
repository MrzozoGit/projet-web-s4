<script setup>
import MyMusic from "@/views/MyMusic.vue";
import NotFound from "@/views/NotFound.vue";
import CD from "@/components/CD.vue";
</script>

<template>
    <div>
        <!-- <Header appName="Vuejs Final" /> -->
        <component :is="currentView" />
        <CD></CD>
    </div>
</template>

<script>
const routes = {
    "/": MyMusic,
    "/mymusic": MyMusic
};

export default {
    data: function () {
        return {
            currentPath: window.location.pathname,
        };
    },

    computed: {
        currentView() {
            return routes[this.currentPath] || NotFound;
        },
    },

    mounted() {
        window.addEventListener("hashchange", () => {
            this.currentPath = window.location.pathname;
        });
    },
};
</script>