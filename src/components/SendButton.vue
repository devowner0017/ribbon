<template>
    <button type="button" class="btn btn-primary btn-sm w-full">
        <span v-if="!includeSlot && !isSending">{{ title }}</span>
        <slot v-if="includeSlot"></slot>
        <v-progress-circular v-if="isSending" :size="30" color="white" :indeterminate="isSending"></v-progress-circular>
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
        },
        includeSlot: {
            type: Boolean,
            default: false,
        }
    }
}
</script>