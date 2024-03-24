<script setup>
import { getArtistInfo } from '@/services/api/musicRepository.js';
import { deleteArtist, saveArtist } from '@/services/localstorage/favArtists.js';
</script>

<template>
    <div class="artist_card" v-if="!isJustDeleted">
        <a v-bind:href="data.lastfmUrl" target="_blank">
            <img class="artist_card--picture" v-bind:src="data.img" />
            <div class="artist_card--infos">
                <h2 class="artist_card--infos--name">{{ data.name }}</h2>
            </div>
        </a>
        <p v-if="!isSaved" v-on:click="save" style="z-index: 100; position: absolute; right: .5rem; top: 0; color: white; font-weight: bold;">SAVE</p>
        <p v-else v-on:click="unsave" style="z-index: 100; position: absolute; right: .5rem; top: 0; color: white; font-weight: bold;">DELETE</p>
    </div>
</template>
  
<script>
export default {
    name: 'ArtistCard',
    props: {
        data: { type: Object, required: true },
        isSaved: { type: Boolean, required: true }
    },
    data() {
        return {
            isJustDeleted: false
        };
    },
    methods: {
        save() {
            saveArtist(this.data);
        },

        unsave() {
            deleteArtist(this.data.name);
            this.isJustDeleted = true;
        }
    }
}
</script>
  
<style>
.artist_card {
    position: relative;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.63);
    border: #D1DBFF ridge 3px;
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

@media screen and (max-width: 768px) {
    .artist_card {
        width: 100%;
    }

    .artist_card a {
        width: auto;
    }

    .artist_card--picture {
        width: 100%;
    }
}
</style>