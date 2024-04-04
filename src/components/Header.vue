<template>
    <header class="header">
        <div class="header--box cool_box">
            <img class="header--box--img" src="../assets/logo.gif" alt="">
        </div>
    </header>
</template>

<style>
.header {
    margin-left: 8rem;
    margin-right: 8rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.header--box {
    display: flex;
    justify-content: center;
    height: 6rem;
    background-image: url("../assets/background/cdbg.gif");
}

.header--box--img {
    width: 450px;
    height: 375px;
    margin-top: -150px;
    object-fit: contain;
}

@media screen and (max-width: 1200px) {
    .header {
        margin-left: 4rem;
        margin-right: 4rem;
    }
}

@media screen and (max-width: 992px) {
    .header {
        margin-left: 3rem;
        margin-right: 3rem;
    }
}

@media screen and (max-width: 768px) {
    .header {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

/* .header {
    background-color: black;
}

.header--title {
    margin: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    color: white;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
} */
</style>