<script setup>
import UserAnalytics from "@/components/UserAnalytics.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"
</script>

<template>
    <Header></Header>
    <main class="mymusic cool_box">
        <UserAnalytics></UserAnalytics>
    </main>
    <Footer></Footer>
</template>

<style>
body {
    background-image: url("../assets/background/musicnote.jpg");
}

.mymusic {
    margin-left: 8rem;
    margin-right: 8rem;
    height: 100%;
    max-height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    /* background-color: white; */

    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>