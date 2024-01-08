<template>
  <body>
    <div class="chatcontainer">
      <p class="chat">chat</p>
    </div>
  </body>
</template>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.chatcontainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat {
  user-select: none;
  cursor: pointer;
  font-family: "Impact";
  font-size: 32px;
  z-index: 100;
}
</style>

<script>

function createCat() {
  var catImage = document.createElement("img");

  var maxX = window.innerWidth - 200;
  var maxY = window.innerHeight - catImage.height;

  catImage.style.position = "absolute";
  catImage.style.width = "100px";
  catImage.style.left = Math.random() * maxX + 'px';
  catImage.style.top = Math.random() * maxY + 'px';

  catImage.src = "https://cataas.com/cat?" + new Date().getTime();

  document.body.append(catImage);
}

document.querySelector(".chat").addEventListener("click", (e) => {
  e.target.style.color = `rgb(${Math.random() * 250},${Math.random() * 250},${Math.random() * 250})`;
  createCat();
})

export default {}
</script>