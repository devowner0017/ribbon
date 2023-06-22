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
        },
        id: {
            type: String,
            default: '1',
        }
    },
    data() {
        return {
            dialogVisible: this.showModal,
            currentPage: 1,
            currentHeadline: "",
            currentBody: "",
            pageCount: 0,
            start: 0,
            end: 0,
        }
    },
    mounted() {
        this.pageCount = tips.length;
        if (this.id === '1') {
            this.start = 1;
            this.end = 3;
            this.currentPage = 1;
            this.currentHeadline = tips[0].headline;
            this.currentBody = tips[0].body;

        } else if (this.id === '2') {
            this.start = 4;
            this.end = 6;
            this.currentPage = 4;
            this.currentHeadline = tips[3].headline;
            this.currentBody = tips[3].body;
        } else if (this.id === '3') {
            this.start = 7;
            this.end = 10;
            this.currentPage = 7;
            this.currentHeadline = tips[6].headline;
            this.currentBody = tips[6].body;
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
        nextPage() {
            if (this.currentPage < this.end) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > this.start) {
                this.currentPage--;
            }
        }
    },
    watch: {
        showModal(newValue) {
            this.dialogVisible = newValue;
        },
        currentPage(newValue) {
            this.currentHeadline = tips[newValue - 1].headline;
            this.currentBody = tips[newValue - 1].body;
        }
    },
}
</script>
<template>
    <div :class="{ 'hidden': !showModal }">
        <div class="fixed w-full h-screen left-0 top-0 modal-background">
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
                                AI PROMPT TIP #{{ currentPage }}
                            </div>
                            <div class="text-main-content title-text title-text-sm"><b>{{ currentHeadline
                            }}</b></div>
                            <div class="text-middle-content content">
                                {{ currentBody }}
                            </div>
                            <div class="flex justify-between">
                                <button type="button" class="btn btn-secondary font-small-caps" :disabled="currentPage <= start"
                                    v-on:click="previousPage">PREVIOUS</button>
                                <button type="button" class="btn btn-primary font-small-caps"
                                    :disabled="currentPage >= end" v-on:click="nextPage">NEXT</button>
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
    min-height: 150px;
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
        padding: 0 20px 0px 20px !important
    }

    .title-text-sm {
        font-size: 24px!important;
        line-height: 28px!important;
    }

    .content-text-sm {
        font-size: 16px!important;
        line-height: 24px!important;
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
