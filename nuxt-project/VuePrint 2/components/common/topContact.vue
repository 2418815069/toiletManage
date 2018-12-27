<template>
    <div class="head">
        <contact-item></contact-item>
        <div class="right"></div>
    </div>
</template>
<script>
import contactItem from './contactItem'
export default {
    components: {
        contactItem
    }
}
</script>

<style scoped>
.head{
    /* height: 5cm; */
    width: 100%;
}
</style>
