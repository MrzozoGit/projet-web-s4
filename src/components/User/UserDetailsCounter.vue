<template>
    <div class="user_details--counter">
        <!-- Counter name -->
        <p class="user_details--counter--title">{{ title }}</p>
        <!-- Counter value -->
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
    text-align: center;
}

.user_details--counter--count {
    color: blue;
    font-weight: bold;
    animation: scaleUpDown 2s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
}

@media screen and (max-width: 992px) {
    .user_details--counter + .user_details--counter {
        margin-left: .75rem;
    }

    .user_details--counter--title {
        font-size: 1em;
    }

    .user_details--counter--count {
        font-size: 1em;
    }
}

@media screen and (max-width: 768px) {
    .user_details--counter + .user_details--counter {
        margin-left: .75rem;
    }

    .user_details--counter--count {
        font-size: .9em;
    }
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