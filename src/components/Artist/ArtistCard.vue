<script setup>
import { getArtistInfo } from '@/services/api/musicRepository.js';
import { saveArtist } from '@/services/localstorage/favArtists.js';
</script>

<template>
    <div class="artist_card">
        <a v-bind:href="data.lastfmUrl" target="_blank">
            <img class="artist_card--picture" v-bind:src="data.img" />
            <div class="artist_card--infos">
                <h2 class="artist_card--infos--name">{{ data.name }}</h2>
            </div>
        </a>
        <p  v-on:click="save" style="z-index: 100; position: absolute; right: .5rem; top: 0; color: white; font-weight: bold;">SAVE</p>
    </div>
</template>
  
<script>
export default {
    name: 'ArtistCard',
    props: {
        data: { type: Object, required: true }
    },
    methods: {
        save() {
            saveArtist(this.data);
        }
    }
}
</script>
  
<style>
.artist_card {
    position: relative;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.63);
    border: #D1DBFF ridge 3px;
    /* cool pink chunky border */
    /* border-width: 10px;
    border-image: url('https://cdn140.picsart.com/322698437144201.png') 1100 round; */
    ;

    transition: all .15s ease-in-out;
}

.artist_card a {
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: end;
    width: 10rem;
    height: 10rem;
}

.artist_card:hover {
    transform: scale(92%);
}

.artist_card--picture {
    position: absolute;
    width: inherit;
    height: inherit;
    object-fit: cover;
    z-index: 50;
}

.artist_card--infos {
    font-size: 12px;
    margin-bottom: 1rem;
    margin-left: 1rem;
    color: white;
    font-family: Barlow, Open Sans, Lucida Grande, Helvetica Neue, Helvetica, Arial, Sans-serif;
    text-shadow: 0 0 10px rgba(0, 0, 0, .7);
    z-index: 51;
}

.artist_card--infos--name {
    margin: 0;
}
</style>