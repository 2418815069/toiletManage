<template>
    <ul class="users">
        <li v-for="user in users" :key="user.id">
            <nuxt-link :to="'/users/'+user.id">{{ user.name }}</nuxt-link>
        </li>
    </ul>
</template>



