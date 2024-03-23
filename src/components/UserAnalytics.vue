<script setup>
import { getArtists, getUserInfos, getLastPlayedTrack } from '@/services/api/musicRepository.js';
import { getFavArtists } from '@/services/localstorage/favArtists.js';
import { remember, getLastUser } from '@/services/localstorage/rememberMe.js';
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
    <select class="select" v-model="selectedDataType">
        <option disabled value="">Please select one</option>
        <option value="saved">My saved artists</option>
        <option value="top10" :disabled="!hasFirstLoaded || !userData.artists">{{userData.username}}'s top 10 artists</option>
        <option value="top100" :disabled="!hasFirstLoaded || !userData.artists">{{userData.username}}'s top 100 artists</option>
    </select>


    <!-- Select data type to show -->
    <!-- <select class="select" v-model="selectedDataType">
        <option disabled value="">Please select one</option>
        <option value="top10" :disabled="!hasFirstLoaded">{{userData.username}}'s top 10 artists</option>
        <option value="top100" :disabled="!hasFirstLoaded">{{userData.username}}'s top 100 artists</option>
    </select> -->

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <ArtistList v-if="selectedDataType=='saved'" :number="10" :artists="getFav()" :isSaved="true"></ArtistList>
    <UserDetails v-if="selectedDataType!='saved' && hasFirstLoaded && !loadingStatus && userData.lastPlayedTrack" :user="userData.username" :userData="userData.infos" :lastPlayed="userData.lastPlayedTrack"></UserDetails>
    <ArtistList v-if="selectedDataType=='top10' && !loadingStatus && userData.artists" :number="10" :artists="getTopOrdered(10)" :isSaved="false"></ArtistList>
    <ArtistList v-if="selectedDataType=='top100' && !loadingStatus && userData.artists" :number="100" :artists="getTopOrdered(100)" :isSaved="false"></ArtistList>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                username: getLastUser()
            },
            updateCounter: 0,
            selectedPageType: '',
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
            try {
                await this.retrieveUserInfos();
                await this.retrieveArtistsList();
                this.errorMessage = '';
            } catch(err) {
                this.userData.lastPlayedTrack = undefined;
                this.userData.artists = undefined;
                this.errorMessage = err;
            }
            this.toggleLoadingAnimation();
            this.hasFirstLoaded = true;
            remember(this.userData.username);
        },

        async retrieveArtistsList() {
            try {
                this.userData.artists = await getArtists(this.userData.username, 100);
            } catch (err) {
                throw err;
            }
        },
        async retrieveUserInfos() {
            try {
                this.userData.infos = await getUserInfos(this.userData.username);
                this.userData.lastPlayedTrack = await getLastPlayedTrack(this.userData.username);
            } catch(err) {
                throw err;
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
        },
        getFav() {
            return getFavArtists();
        },
        getLastPlayed() {
            getLastPlayedTrack();
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
    /* margin-bottom: .25rem; */
}

.select {
    margin-top: .25rem;
    /* margin-top: 2rem; */
}
</style>