<script setup>
import { getArtists } from '@/services/api/musicRepository.js';
import ArtistCard from '@/components/Artist/ArtistCard.vue';
</script>

<template>
    <div class="artist_list">
        <h2 class="artist_list--title">Top {{ number }} artists</h2>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <ul class="artist_list--list">
            <li class="artist_list--list--li" v-for="artist in artistsList" :key="artist">
                <ArtistCard :name="artist"></ArtistCard>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'ArtistList',
    props: {
        username: { type: String, required: true },
        usernameUpdateCounter: { type: Number, required: true },
        number: { type: Number, required: true }
    },
    data() {
        return {
            artistsList: [],
            topArtists: [],
            errorMessage: ''
        }
    },
    methods: {
        async retrieveArtistsList() {
            try {
                this.artistsList = await getTopArtists(this.username, this.number);
                this.errorMessage = '';
            } catch (err) {
                this.artistsList = [];
                this.errorMessage = err;
            }
        }
    },
    watch: {
        // Surveiller les changements de updateCounter
        usernameUpdateCounter(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.retrieveArtistsList();
            }
        }
    }
}
</script>
  
<style>
.artist_list {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-top: 2rem;
    margin-left: 3rem;
    margin-right: 3rem;
    /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.63);
    border: #D1DBFF double 3px; */
    font-family: ms pgothic;
}

.artist_list--title {
    font-family: Barlow, Open Sans, Lucida Grande, Helvetica Neue, Helvetica, Arial, Sans-serif;
    text-transform: uppercase;
    text-align: center;
}

.artist_list--list {
    margin-top: 1rem;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: center;
}

.artist_list--list--li {}
</style>@/components/ArtistCard.vue