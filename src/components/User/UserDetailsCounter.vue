<template>
    <div class="user_details--counter">
        <p class="user_details--counter--title">{{ title }}</p>
        <p class="user_details--counter--count">{{ count }}</p>
    </div>
</template>

<script>
export default {
    name: 'UserDetails',
    props: {
        title: { type: String, required: true },
        count: { type: String, required: true }
    }
}
</script>

<style>
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