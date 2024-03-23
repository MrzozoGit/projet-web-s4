<template>
    <div class="input_container">
        <!-- Username input -->
        <div class="username_input">
            <input class="username_input--input" v-model="localUsername" placeholder="my username..." />
            <button class="username_input--button" @click="onUpdateUsername">Retrieve user analytics</button>
        </div>

        <!-- Select data type to show -->
        <select class="select" v-model="selectedDataType">
            <option disabled value="">Please select one</option>
            <option value="saved">My saved artists</option>
            <option value="top10" :disabled="!hasFirstLoaded || !artists">{{username}}'s top 10 artists</option>
            <option value="top100" :disabled="!hasFirstLoaded || !artists">{{username}}'s top 100 artists</option>
        </select>
    </div>
</template>
  
<script>
export default {
    props: ['username', 'hasFirstLoaded', 'artists'],
    emits: ['update:username', 'select:dataType'],
    data() {
        return {
            localUsername: this.username,
            selectedDataType: '',
        };
    },
    methods: {
        onUpdateUsername() {
            this.$emit('update:username', this.localUsername);
        }
    },
    watch: {
        selectedDataType(newVal) {
            this.$emit('select:dataType', newVal);
        }
    }
};
</script>
  
<style>
.input_container {
    display: flex;
    flex-direction: column;
}
.username_input {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.username_input--input {
    width: 12rem;
    padding: 0;
    text-align: center;
}

.username_input--button {
    width: 12rem;
    padding: 0;
    margin-top: .25rem;
    /* margin-bottom: .25rem; */
}

.select {
    margin-top: .25rem;
    /* margin-top: 2rem; */
}
</style>