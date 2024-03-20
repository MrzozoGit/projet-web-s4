<script setup>
import { getArtists, getUserInfos } from '@/services/api/musicRepository.js';
import ArtistList from "@/components/Artist/ArtistList.vue";
import UserDetails from "@/components/User/UserDetails.vue";
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
        <option value="top10" :disabled="!hasFirstLoaded">Top 10 artists</option>
        <option value="top100" :disabled="!hasFirstLoaded">Top 100 artists</option>
    </select>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <UserDetails v-if="hasFirstLoaded && userData.username && !loadingStatus" :user="userData.username" :userData="userData.infos"></UserDetails>
    <ArtistList v-if="selectedDataType=='top10' && !loadingStatus" :number="10" :artists="getTopOrdered(10)"></ArtistList>
    <ArtistList v-if="selectedDataType=='top100' && !loadingStatus" :number="100" :artists="getTopOrdered(100)"></ArtistList>
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
            selectedDataType: '',
            loadingStatus: true,
            hasFirstLoaded: false,
            errorMessage: ''
        };
    },

    mounted() {
        this.toggleLoadingAnimation();
    },
    
    methods: {
        async updateUsername() {
            if(this.userData.username == '' || this.userData.username.trim().length === 0) {
                this.errorMessage = "Please enter a valid username!";
                return;
            }
            this.toggleLoadingAnimation();
            await this.retrieveArtistsList();
            await this.retrieveUserInfos();
            this.toggleLoadingAnimation();
            this.hasFirstLoaded = true;
        },

        async retrieveArtistsList() {
            try {
                this.userData.artists = await getArtists(this.userData.username, 100);
                this.errorMessage = '';
            } catch (err) {
                this.errorMessage = err;
            }
        },
        async retrieveUserInfos() {
            try {
                this.userData.infos = await getUserInfos(this.userData.username);
            } catch(err) {
                this.errorMessage = err;
            }
        },
        async toggleLoadingAnimation() {
            this.loadingStatus = !this.loadingStatus;
            if(this.loadingStatus) document.querySelector(".CD--img").style.display = "block";
            else document.querySelector(".CD--img").style.display = "none";
        },
        async getTopOrdered(nb) {
            let topArtists = this.userData.artists.sort((a, b) => a.rank - b.rank);
            topArtists = topArtists.slice(0, nb);
            return topArtists;
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
    margin-bottom: .25rem;
}
</style>