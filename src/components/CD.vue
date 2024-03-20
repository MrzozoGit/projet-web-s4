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

@keyframes rotateAndScale {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* @keyframes expandToCenter {
  from {
    transform: translate(-50%, -50%) scale(1);
    right: 1rem;
    bottom: 1rem;
    opacity: 0.5;
  }
  to {
    transform: translate(-45vw, -45vh) scale(10);
    opacity: 1;
  }
} */


</style>