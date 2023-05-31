<template>
    <div :class="{ 'hidden': !showModal }">
        <div class="fixed w-screen h-screen left-0 top-0 modal-background">
            <div class="absolute w-full h-full" @click="closeDialog"></div>
            <div class="input-modal modal-wrapper">
                <div class="modal">
                    <div class="flex justify-center items-center md:m-14 sm:m-4 m-4">
                        <v-progress-circular :size="32" :width="7" color="white"
                            :indeterminate="true"></v-progress-circular>
                    </div>
                    <div class="modal-title title-text title-text-sm">
                        <div class="">Loading your first draft...</div>
                    </div>
                    <div class="modal-content content-text content-text-sm">
                        <div>
                            In the meantime, get inspired by top performing email templates made using this tool by
                            institutions like Flatiron School, Reach University, and Stanford University.
                        </div>
                        <InputGroup placeHolder="Enter your email address" title="Your Email" />
                        <div class="d-flex mt-">
                            <button type="button" class="btn btn-primary btn-sm w-full" @click="shareDraft"
                                disabled>SEND</button>
                        </div>
                        <div class="d-flex mt-3">
                            <button type="button" class="btn btn-secondary btn-sm w-full" @click="shareDraft">Maybe
                                later</button>
                        </div>
                        <div class="mt-3 text-color-gray sm-text">
                            By entering your email, you agree to Ribbon Education’s terms and conditions and privacy
                                policy.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import SuccessModal from './SuccessModal.vue';
import InputGroup from '../InputGroup.vue';
export default {
    props: {
        title: String,
        showModal: {
            type: Boolean,
            default: false
        },
        hideClose: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            dialogVisible: this.showModal,
            isModalVisible: false,
        }
    },
    methods: {
        closeDialog() {
            this.dialogVisible = false;
            this.$emit('close');
        }
    },
    watch: {
        showModal(newValue) {
            this.dialogVisible = newValue;
        }
    },
    components: {
        SuccessModal,
        InputGroup,
    }
}
</script>
  
<style scoped lang="scss">
@import '@/assets/styles/main.scss';

@media screen and (max-width: 640px) {
    .input-modal .modal {
        width: 100% !important;
    }

    .input-modal {
        padding: 0 50px 0px 24px !important
    }

    .title-text-sm {
        font-size: 20px;
        line-height: 28px;
    }

    .content-text-sm {
        font-size: 16px;
        line-height: 24px;
    }
}

.title-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
}

.content-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
}

.modal-background {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.input-modal .modal {
    width: 480px;
    background-color: $whiteColor;
    transition: opacity 1s;
    position: relative;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 16px;

    .modal-close {
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        border: 4px solid #ffffff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        border-radius: 24px;
        right: -17px;
        top: -22.5px;

        .modal-close-inner {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: black;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .modal-title {
        h3 {
            font-family: 'Outfit';
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
            text-align: left;
            margin-bottom: 16px;
        }
    }

    .sm-text {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
    }

}
</style>
  