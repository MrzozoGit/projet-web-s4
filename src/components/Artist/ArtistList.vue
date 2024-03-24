<script setup>
import { getArtists } from '@/services/api/musicRepository.js';
import ArtistCard from '@/components/Artist/ArtistCard.vue';
</script>

<template>
    <div class="artist_list">
        <h2 class="artist_list--title">Top {{ number }} artists</h2>
        <ul class="artist_list--list">
            <li class="artist_list--list--li" v-for="artist in artistsList" :key="artist">
                <ArtistCard :data="artist" :isSaved="isSaved"></ArtistCard>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'ArtistList',
    props: {
        number: { type: Number, required: true },
        artists: { type: Promise, type: Object, required: true },
        isSaved: { type: Boolean, required: true }
    },
    data() {
        return {
            artistsList: []
        }
    },

    mounted() {
        console.log("mounted");
        try {
            this.artists.then(res => this.artistsList = res);
        } catch {
            this.artistsList = this.artists;
        }
    },
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

@media screen and (max-width: 768px) {
    .artist_list {
        margin-left: 0rem;
        margin-right: 0rem;
    }

    .artist_list--list {
        width: 100%;
    }

    .artist_list--list--li {
        width: 100%;
    }
}
</style>