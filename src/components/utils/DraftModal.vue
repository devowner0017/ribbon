<script>
import { tips } from '../../Ai_Promt_Tips';
export default {
    props: {
        title: String,
        message: String,
        showModal: {
            type: Boolean,
            default: false
        },
        isGenerated: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            dialogVisible: this.showModal,
            currentPage: 1,
            currentHeadline: "",
            currentBody: "",
            pageCount: 0,
        }
    },
    mounted() {
        this.pageCount = tips.length;
        this.currentHeadline = tips[0].headline;
        this.currentBody = tips[0].body;
    },
    methods: {
        closeDialog() {
            this.dialogVisible = false;
            this.$emit('close');
        },

        redierctToStartPage() {
            this.$router.push('/questions/1');

        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    },
    watch: {
        showModal(newValue) {
            this.dialogVisible = newValue;
        },
        currentPage(newValue) {
            this.currentHeadline = tips[newValue-1].headline;
            this.currentBody = tips[newValue-1].body;
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
                    <div v-if="!isGenerated" class="flex justify-center items-center md:m-14 sm:m-4 m-4">
                        <v-progress-circular :size="32" :width="7" color="white"
                            :indeterminate="!isGenerated"></v-progress-circular>
                    </div>
                    <div class="modal-close">
                        <button type="button" class="modal-close-inner" @click="closeDialog">
                            <img src="/images/modal-close.svg" alt="close" />
                        </button>
                    </div>
                    <div class="modal-content content-text">
                        <div class="grid grid-cols-1 w-full gap-2">
                            <div class="text-color-primary text-small">
                                AI PROMPT Tip #{{ currentPage }}
                            </div>
                            <div class="text-main-content title-text title-text-sm"><b>{{ currentHeadline
                            }}</b></div>
                            <div class="text-middle-content content">
                                {{ currentBody }}
                            </div>
                            <div class="flex justify-between">
                                <button type="button" class="btn btn-secondary font-small-caps" :disabled="currentPage <= 1"
                                    v-on:click="previousPage">PREVIOUS</button>
                                <button type="button" class="btn btn-primary font-small-caps"
                                    :disabled="currentPage >= pageCount" v-on:click="nextPage">NEXT</button>
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

.text-small {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 10%;
}

.content {
    height: 150px;
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
        padding: 0 50px 0px 50px !important
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
