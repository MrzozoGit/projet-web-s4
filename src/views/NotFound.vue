<!-- 404 Not Found. Features a cool gif randomly selected from a list of cool gifs. -->
<template>
    <div class="notfound">
        <p>404: page not found!</p>
        <img :src="getRandomLink" alt="funny gif about music">
        <a href="/"><p>Go back home...</p></a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgLinks: [
                "https://i3.glitter-graphics.org/pub/1296/1296733zp6m2hotbs.gif",
                "https://i3.glitter-graphics.org/pub/584/584703kaid42312g.gif",
                "https://i1.glitter-graphics.org/pub/538/538821jxvt527j7e.gif",
                "https://i10.glitter-graphics.org/pub/612/612420x6agbn858p.gif",
                "https://i9.glitter-graphics.org/pub/637/637699n6hvjk7e2m.gif",
                "https://i8.glitter-graphics.org/pub/1078/1078348qjdw1cofdo.gif",
                "https://i4.glitter-graphics.org/pub/540/540894q6rril77ug.gif",
                "https://i10.glitter-graphics.org/pub/585/585710pc0i4nwtr9.gif",
                "https://i2.glitter-graphics.org/pub/733/733212bd5jjpo34j.gif"
            ]
        };
    },

    computed: {
        getRandomLink() {
            return this.imgLinks[Math.floor(Math.random() * this.imgLinks.length)];
        }
    }
};
</script>

<style>
.notfound {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.notfound > p {
    font-weight: lighter;
    margin-bottom: .5rem;
    text-align: center;
    font-size: 1.5em;
}

.notfound > img {
    height: 50%;
    width: fit-content;
    object-fit: contain;
    image-rendering: pixelated;
    margin-bottom: .5rem;
}

.notfound > a {
    text-decoration: underline;
}
</style>