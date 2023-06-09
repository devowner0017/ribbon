<template>
    <div class="flex flex-col grow justify-center items-center loading-panel">
        <v-progress-circular :size="70" :width="7" color="white" :indeterminate="indeterminate"></v-progress-circular>
    </div>
</template>
<script>
export default {
    props: {
        indeterminate: {
            type: Boolean,
            default: true,
        }
    },
}
</script>