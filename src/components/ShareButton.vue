<template>
    <button :class="Class" @click="onClickShare">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: "ShareButton",
    props: {
        class: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        onClickShare() {
            this.isModalVisible = true;
        }
    },
    computed: {
        Class() {
            return "share-btn " + this.class;
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/main.scss";
</style>