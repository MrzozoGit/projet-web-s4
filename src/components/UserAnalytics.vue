<script setup>
import { getArtists, getUserInfos } from '@/services/api/musicRepository.js';
import ArtistList from "@/components/Artist/ArtistList.vue";
</script>

<template>
    <!-- Username input -->
    <div class="username_input">
        <input class="username_input--input" v-model="userData.username" placeholder="my username..." />
        <button class="username_input--button" @click="updateUsername">Retrieve user analytics</button>
    </div>

    <!-- Select data type to show -->
    <select v-model="selectedDataType">
        <option disabled value="">Please select one</option>
        <option value="top10">Top 10 artists</option>
        <option value="top100">Top 100 artists</option>
    </select>

    <ArtistList v-if="selectedDataType=='top10'" :number="10" :artists="getTopOrdered(10)"></ArtistList>
    <ArtistList v-if="selectedDataType=='top100'" :number="100" :artists="getTopOrdered(100)"></ArtistList>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                username: '',
                artists: {}
            },
            updateCounter: 0,
            selectedDataType: ''
        };
    },
    methods: {
        async updateUsername() {
            await this.retrieveArtistsList();
            await this.retrieveUserInfos();
        },

        async retrieveArtistsList() {
            try {
                this.userData.artists = await getArtists(this.userData.username, 100);
                this.errorMessage = '';
            } catch (err) {
                this.userData.artists = {};
                this.errorMessage = err;
            }
        },
        async retrieveUserInfos() {
            try {
                this.userData.infos = await getUserInfos(this.userData.username);
            } catch(err) {
                this.userData.infos = {};
                this.errorMessage = err;
            }
        },
        getTopOrdered(nb) {
            console.log(nb)
            let topArtists = this.userData.artists.sort((a, b) => a.rank - b.rank).slice(0, nb);
            console.log(topArtists)
            return topArtists
        }
    }
};
</script>

<style>
.username_input {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.username_input--input {
    width: 12rem;
    padding: 0;
    text-align: center;
}

.username_input--button {
    width: 12rem;
    padding: 0;
    margin-top: .25rem;
}
</style>