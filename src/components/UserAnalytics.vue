<script setup>
import { getArtists, getUserInfos, getLastPlayedTrack } from '@/services/api/musicRepository.js';
import { getFavArtists } from '@/services/localstorage/favArtists.js';
import { remember, getLastUser } from '@/services/localstorage/rememberMe.js';
import ArtistList from "@/components/Artist/ArtistList.vue";
import UserDetails from "@/components/User/UserDetails.vue";
import UserAnalyticsNavigation from "@/components/UserAnalyticsNavigation.vue";
</script>

<template>
    <!-- User analytics navigation component -->
    <UserAnalyticsNavigation :username="userData.username" :hasFirstLoaded="hasFirstLoaded" :artists="userData.artists"
        @update:username="handleUsernameUpdate" @select:dataType="selectedDataType = $event"></UserAnalyticsNavigation>

    <!-- Error message display -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Display saved artists list -->
    <ArtistList v-if="selectedDataType == 'saved'" :number="10" :artists="getFav()" :isSaved="true"></ArtistList>
    <!-- Display user details and last played track -->
    <UserDetails v-if="selectedDataType != 'saved' && hasFirstLoaded && !loadingStatus && userData.lastPlayedTrack"
        :user="userData.username" :userData="userData.infos" :lastPlayed="userData.lastPlayedTrack"></UserDetails>
    <!-- Display top 10 artists -->
    <ArtistList v-if="selectedDataType == 'top10' && !loadingStatus && userData.artists" :number="10"
        :artists="getTopOrdered(10)" :isSaved="false"></ArtistList>
    <!-- Display top 100 artists -->
    <ArtistList v-if="selectedDataType == 'top100' && !loadingStatus && userData.artists" :number="100"
        :artists="getTopOrdered(100)" :isSaved="false"></ArtistList>
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
        // Method to handle username update
        async handleUsernameUpdate(newUsername) {
            // Validation for empty username
            if (newUsername == '' || newUsername.trim().length === 0) {
                this.errorMessage = "Please enter a valid username!";
                return;
            }
            // Update local username and trigger update
            this.userData.username = newUsername;
            await this.updateUsername();
        },

        // Method to update username (and datas)
        async updateUsername() {
            // Toggle loading animation
            this.toggleLoadingAnimation();
            try {
                // Retrieve user information and artist list
                await this.retrieveUserInfos();
                await this.retrieveArtistsList();
                this.errorMessage = '';
            } catch (err) {
                this.userData.lastPlayedTrack = undefined;
                this.userData.artists = undefined;
                this.errorMessage = err;
            }
            // Add a slight delay to loading animation toggle
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.toggleLoadingAnimation();
            this.hasFirstLoaded = true;
            remember(this.userData.username);
        },

        // Method to retrieve artists list
        async retrieveArtistsList() {
            try {
                this.userData.artists = await getArtists(this.userData.username, 100);
            } catch (err) {
                throw err;
            }
        },

        // Method to retrieve user information
        async retrieveUserInfos() {
            try {
                this.userData.infos = await getUserInfos(this.userData.username);
                this.userData.lastPlayedTrack = await getLastPlayedTrack(this.userData.username);
            } catch (err) {
                throw err;
            }
        },

        // Method to toggle loading animation
        async toggleLoadingAnimation() {
            this.loadingStatus = !this.loadingStatus;
            if (this.loadingStatus) document.querySelector(".CD--img").style.display = "block";
            else document.querySelector(".CD--img").style.display = "none";
        },

        // Method to get top ordered artists
        async getTopOrdered(nb) {
            let topArtists = this.userData.artists.sort((a, b) => a.rank - b.rank);
            topArtists = topArtists.slice(0, nb);
            return topArtists;
        },

        // Method to get favorite artists
        getFav() {
            return getFavArtists();
        },

        // Method to get last played track
        getLastPlayed() {
            getLastPlayedTrack();
        }
    }
};
</script>