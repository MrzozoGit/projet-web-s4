<script setup>
import { getArtistInfo } from '@/services/api/musicRepository.js';
</script>

<template>
    <a v-bind:href="artistData.url" target="_blank">
        <div class="artist_card">
            <img class="artist_card--picture" v-bind:src="artistData.img" />
            <div class="artist_card--infos">
                <h2 class="artist_card--infos--name">{{ artistData.name }}</h2>
            </div>
        </div>
    </a>
</template>
  
<script>
export default {
    name: 'ArtistCard',
    props: {
        id: [String, Number],
        name: { type: String, required: true },
        pictureUrl: { type: String, default: "https://lh3.googleusercontent.com/proxy/nzN9SWft2aCUm-PDNCi90PkbSuTBAYP1hehPeH8523gaNBp_-4QuY8u-2fub_-enxXNAXyoQQjQZG7H03G_kTSWa6WARld3GXkAwwUsLVbOR" }
    },
    data() {
        return {
            artistData: []
        }
    },
    created: function () {
        this.retrieveArtistInfo();
    },
    methods: {
        async retrieveArtistInfo() {
            this.artistData = (await getArtistInfo(this.name)).artist;
            // console.log(this.artistData);
        }
    }
}
</script>
  
<style>
a {
    text-decoration: none;
}

.artist_card {
    position: relative;
    display: flex;
    align-items: end;
    width: 10rem;
    height: 10rem;

    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.63);
    border: #D1DBFF ridge 3px;
    /* cool pink chunky border */
    /* border-width: 10px;
    border-image: url('https://cdn140.picsart.com/322698437144201.png') 1100 round; */
    ;

    transition: all .15s ease-in-out;
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
    padding-top: 5px;
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