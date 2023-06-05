<script>
export default {
    props: {
        title: String,
        message: String,
        showModal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogVisible: this.showModal,
        }
    },
    methods: {
        closeDialog() {
            this.dialogVisible = false;
            this.$emit('close');
        },

        redierctToStartPage() {
            this.$router.push('/questions/1');

        },
    },
    watch: {
        showModal(newValue) {
            this.dialogVisible = newValue;
        }
    },
}
</script>
<template>
    <div :class="{ 'hidden': !showModal }">
        <div class="fixed w-screen h-screen left-0 top-0 modal-background">
            <div class="absolute w-full h-full" @click="closeDialog"></div>
            <div class="confirm-modal modal-wrapper">
                <div class="modal">
                    <div class="modal-close">
                        <button type="button" class="modal-close-inner" @click="closeDialog">
                            <img src="/images/modal-close.svg" alt="close" />
                        </button>
                    </div>
                    <div class="modal-content content-text">
                        <div class="grid grid-cols-1 w-full">
                            <div class="text-main-content mb-2 title-text title-text-sm"><b>The Ultimate AI-Powered Message
                                    Builder
                                    for Online Institutions</b></div>
                            <div class="text-middle-content mb-6">
                                <div>Ribbon’s free, message builder harnesses AI and incorporates the best examples from top
                                    online programs to generate personalized email templates.</div>
                                <div class="mt-5"><b>About Ribbon Education</b></div>
                                We build tools to help save you time, so you can focus on what truly matters – fostering
                                meaningful connections with your students.
                            </div>
                            <div>
                                <a class="w-full" href="https://www.ribbonedu.com/" target="_blank">
                                    <div class="flex"><button type="button" class="btn btn-primary  font-small-caps w-full"
                                            v-on:click="closeDialog">LEARN MORE</button></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

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

@media screen and (max-width: 640px) {
    .confirm-modal .modal {
        width: 100% !important;
    }

    .confirm-modal {
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

.modal-background {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.confirm-modal .modal {
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
}
</style>
