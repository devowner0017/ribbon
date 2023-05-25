<template>
    <button :class="['check-card flex h-full',]">
        <div :class="['card card-sm h-full',  {'selected' : isSelected}]"  >
            <span>{{ text }}</span>
        </div>
    </button>
</template>
<script>
export default {
    name: 'CheckCard',
    props: {
        text: {
            type: String,
            default: "",
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
}
</script>