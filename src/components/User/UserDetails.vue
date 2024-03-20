<template>
    <div class="user_details">
        <img class="user_details--img" :src="getImage" alt="user profile picture">
        <div class="user_details--container">
            <div>
                <p class="user_details--username">{{ getUsername }}</p>
                <p class="user_details--country" v-if="userData.country && userData.country!='None'">{{ getCountry }}</p>
            </div>
            <div class="user_details--counter_container">
                <div class="user_details--counter">
                    <p class="user_details--counter--title">Playcount</p>
                    <p class="user_details--counter--count">{{ userData.stats.playcount }}</p>
                </div>
                <div class="user_details--counter">
                    <p class="user_details--counter--title">Track count</p>
                    <p class="user_details--counter--count">{{ userData.stats.track_count }}</p>
                </div>
                <div class="user_details--counter">
                    <p class="user_details--counter--title">Album Count</p>
                    <p class="user_details--counter--count">{{ userData.stats.album_count }}</p>
                </div>
                <div class="user_details--counter">
                    <p class="user_details--counter--title">Artist Count</p>
                    <p class="user_details--counter--count">{{ userData.stats.artist_count }}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'UserDetails',
    props: {
        user: { type: String, required: false },
        userData: { type: Object, required: true }
    },
    data() {
        return {
            langMap: {}
        }
    },

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
        console.log("mounted");
        console.log(this.userData);
    },
}
</script>

<style>
.user_details {
    /* width: 100%; */
    display: flex;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.63);
    border: #D1DBFF ridge 8px;
    margin-bottom: 2rem;
    margin-top: 2rem;
    /* align-items: space-between; */

    margin-right: 3rem;
    margin-left: 3rem;
}

.user_details--img {
    /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.63); */
    border-right: #D1DBFF ridge 8px;
    height: 174px;
    object-fit: cover;
    /* margin-left: -10px; */
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
    /* border:groove 10px black; */
    overflow: hidden
}

.user_details--country {
    font-weight: bold;
}

.user_details--counter_container {
    display: flex;
}

.user_details--counter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.user_details--counter + .user_details--counter {
    margin-left: .75rem;

}

.user_details--counter--title {
    font-size: 1.1em;
}

.user_details--counter--count {
    /* transform: rotateX(50deg); */
    color: blue;
    font-weight: bold;
    animation: scaleUpDown 2s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
}

@keyframes scaleUpDown {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>