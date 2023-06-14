<template>
    <div class="w-full my-3">
        <span :class="['label-text', {'error-text':isError}]">{{ title }}</span>
        <input :type="type" :value="value" :placeholder="placeHolder" :class="['w-full input-text input-text-sm mt-2',{'error-border': isError}]" :disabled="disabled"  v-model="model" @input="updateValue" />
        <span v-if="isError" class="label-text error-text mt-2">{{ error }}</span>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        placeHolder: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: 'text'
        },
        error: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            model: ""
        }
    },
    methods: {
        updateValue() {
            this.$emit('update:value', this.model);
        }
    },
    computed: {
        isError() {
            return this.error
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

.error-text {
    color: red;
}
.error-border {
    border-color: red;
}
</style>
