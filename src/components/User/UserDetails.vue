<script setup>
import { getLastPlayedTrack } from '@/services/api/musicRepository.js';
import UserDetailsCounter from '@/components/User/UserDetailsCounter.vue'
</script>
<template>
    <div class="user_details">
        <img class="user_details--img" :src="getImage" alt="user profile picture">
        <div class="user_details--container">
            <div>
                <p class="user_details--username">{{ getUsername }}</p>
                <p class="user_details--country" v-if="userData.country && userData.country!='None'">{{ getCountry }}</p>
            </div>
            <div class="user_details--counter_container">
                <UserDetailsCounter :title="'Playcount'" :count="userData.stats.playcount"></UserDetailsCounter>
                <UserDetailsCounter :title="'Track count'" :count="userData.stats.track_count"></UserDetailsCounter>
                <UserDetailsCounter :title="'Album Count'" :count="userData.stats.album_count"></UserDetailsCounter>
                <UserDetailsCounter :title="'Artist Count'" :count="userData.stats.artist_count"></UserDetailsCounter>
            </div>
        </div>
        <div class="user_details--lastplayed">
            <img class="user_details--lastplayed--img" :src="lastPlayed.img" alt="last played track cover">
            <div class="user_details--lastplayed--infos">
                <p>Last played track</p>
                <p><a :href="lastPlayed.url" target="_blank">{{ lastPlayed.name }}</a> by {{ lastPlayed.artist }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDetails',
    props: {
        user: { type: String, required: false },
        userData: { type: Object, required: true },
        lastPlayed: { type: Object, required: true }
    },
    // data() {
    //     return {
    //         // lastPlayed: {}
    //     }
    // },

    computed: {
        getImage() {
            if (this.userData.image) return this.userData.image;
            else return "/src/assets/default-avatar.jpg";
        },

        getUsername() {
            if (this.userData.realname) return this.userData.realname;
            else return this.user;
        },

        getCountry() {
            let countryCode;
            if (this.userData.country == "France") countryCode = "FR";
            else if (this.userData.country == "English") countryCode = "EN";
            if (countryCode) {
                const codePoints = countryCode
                    .toUpperCase()
                    .split('')
                    .map(char =>  127397 + char.charCodeAt());
                return String.fromCodePoint(...codePoints);
                }
            return this.userData.country;
        }
    },

    mounted() {
        // console.log("mounted");
        // console.log(this.userData);
    },
}
</script>

<style>
.user_details {
    display: flex;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.63);
    border: #D1DBFF ridge 8px;
    margin-bottom: 2rem;
    margin-top: 2rem;

    margin-right: 3rem;
    margin-left: 3rem;
}

.user_details--img {
    border-right: #D1DBFF ridge 8px;
    height: 100%;
    object-fit: cover;
}

.user_details--container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: .5rem;
}

.user_details--username {
    font-size: 1.25em;
    font-weight: bold;
    overflow: hidden
}

.user_details--country {
    font-weight: bold;
}

.user_details--lastplayed {
    border-left: #D1DBFF ridge 8px;
    overflow: scroll;
    width: 182px;
    height: 174px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}

.user_details--lastplayed--img {
    min-height: 174px;
    object-fit: cover;
}

.user_details--lastplayed--infos {
    padding: .25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
}

.user_details--counter_container {
    display: flex;
}

@media screen and (max-width: 992px) {
    .user_details {
        border: #D1DBFF ridge 6px;
        margin-bottom: 1rem;
        margin-top: 1rem;
        margin-right: 1rem;
        margin-left: 1rem;
    }

    .user_details--img {
        border-right: #D1DBFF ridge 6px;
    }

    .user_details--lastplayed {
        border-left: #D1DBFF ridge 6px;
        min-width: 151px;
    }
}

@media screen and (max-width: 768px) {
    .user_details {
        border: #D1DBFF ridge 4px;
        margin-bottom: .5rem;
        margin-top: .5rem;
        margin-right: 0;
        margin-left: 0;
        overflow-x: scroll;
        width: 100%;
        min-height: 190px;
    }

    .user_details--img {
        border-right: #D1DBFF ridge 4px;
    }

    .user_details--lastplayed {
        border-left: #D1DBFF ridge 4px;
        min-width: 182px;
    }

    .user_details--container {
        min-width: 300px;
    }
}
</style>