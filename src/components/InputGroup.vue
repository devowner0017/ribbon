<template>
    <div class="w-full my-3">
        <span class="label-text">{{ title }}</span>
        <input type="text" :placeholder="placeHolder" class="w-full input-text mt-2" />
    </div>
</template>
<script>
    export default{
        props: {
            title: {
                type: String,
                default: ""
            },
            placeHolder: {
                type: String, 
                default: ""
            }
        },
        data() {
            return {

            }
        }
    }
</script>
<style scoped lang="scss">
.label-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}
</style>
