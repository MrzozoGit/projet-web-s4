<script setup>
import { getSpotifyToken } from '@/services/api/musicRepository.js';
// Pages
import MyMusic from "@/views/MyMusic.vue";
import NotFound from "@/views/NotFound.vue";
import CORS from "@/views/CORS.vue";
// Components
import CD from "@/components/CD.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"
</script>

<template>

        <Header></Header>
        <main class="mymusic cool_box">
            <component :is="currentView" />
        </main>
        <Footer></Footer>
        <CD></CD>

</template>

<script>
const routes = {
    "/": MyMusic,
    "/mymusic": MyMusic,
    "/request-cors": CORS
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

    async beforeMount() {
        try {
            await getSpotifyToken();
        }
        catch(err) {
            console.log("Error getting the spotify token");
            console.log(err);
            this.currentPath = "/request-cors";
            
        }
    },

    mounted() {
        window.addEventListener("hashchange", () => {
            this.currentPath = window.location.pathname;
        });
    },
};
</script>

<style>
main {
    margin-left: 8rem;
    margin-right: 8rem;
    height: 100%;
    max-height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    /* background-color: white; */

    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>