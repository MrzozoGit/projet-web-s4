<template>
    <div class="CD">
        <img class="CD--img" src="../assets/props/CD.png" alt="Cool CD picture">
    </div>
</template>

<style>
.CD {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    height: 6rem;
    width: 6rem;
    z-index: 100;
}

.CD--img {
  display: none;
    animation: rotateAndScale 3s linear infinite;
}
</style>