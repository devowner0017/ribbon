<template>
    <button type="button" class="btn btn-primary btn-sm w-full">
        <span v-if="!isSending">
            {{ title }}
        </span>
        <v-progress-circular v-if="isSending"  color="white"
            :indeterminate="isSending"></v-progress-circular>
    </button>
</template>

<script>
export default {
    name: 'sendButton',
    props: {
        title: {
            type: String,
            default: 'send'
        },
        isSending: {
            type: Boolean,
            default: false,
        }
    }
}
</script>