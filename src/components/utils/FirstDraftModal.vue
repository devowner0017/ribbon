<template>
    <div :class="{ 'hidden': !showModal }">
        <div class="fixed w-screen h-screen left-0 top-0 modal-background">
            <div class="absolute w-full h-full" @click="closeDialog"></div>
            <div class="input-modal modal-wrapper">
                <div class="modal">
                    <div v-if="!isGenerated" class="flex justify-center items-center md:m-14 sm:m-4 m-4">
                        <v-progress-circular :size="32" :width="7" color="white"
                            :indeterminate="!isGenerated"></v-progress-circular>
                    </div>
                    <div class="modal-title title-text title-text-sm">
                        <div v-if="!isGenerated">Loading your first draft...</div>
                        <div v-if="isGenerated">Your first draft is ready</div>
                    </div>
                    <div class="modal-content content-text content-text-sm">
                        <div>
                            In the meantime, get inspired by top performing email templates made using this tool by
                            institutions like Flatiron School, Reach University, and Stanford University.
                        </div>
                        <InputGroup placeHolder="Enter your email address" title="Your Email" :value="email" type="email"
                            :error="errors.email" v-on:update:value="email = $event" />
                        <div class="d-flex mt-">
                            <SendButton :isSending="isSending" @click="sendData" :disabled="isDisabled" />
                        </div>
                        <div v-if="sendError" class="text-red-500 text-center mt-4">
                            {{ sendError }}
                        </div>
                        <div class="d-flex mt-3">
                            <button type="button" class="btn btn-secondary btn-sm w-full" @click="closeDialog">Maybe
                                later</button>
                        </div>
                        <div class="mt-3 text-color-gray sm-text">
                            By entering your email, you agree to Ribbon Education’s <a
                                href="https://www.ribbonedu.com/terms-and-conditions" target="_blank">terms and conditions</a> and <a
                                href="https://www.ribbonedu.com/privacy-policy" target="_blank">privacy
                                policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-snackbar v-model="snackbar" :timeout="3000">
            <div class="flex items-center"><img src="/images/check.svg" class="mr-2" alt="check" /> <span>Sent
                    your email!</span></div>
        </v-snackbar>
    </div>
</template>
  
<script>
import SuccessModal from './SuccessModal.vue';
import InputGroup from '../InputGroup.vue';
import { EMAIL_ERRORS } from '../../errors';
import { sendDataToHubspot } from '../../actions/hubspot';
import SendButton from '../SendButton.vue';
import { SEND_EMAIL_ID } from '../../actions/config';
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
        },
        isGenerated: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            dialogVisible: this.showModal,
            isModalVisible: false,
            email: '',
            errors: {},
            isSending: false,
            snackbar: false,
            sendError: null,
        }
    },
    methods: {
        closeDialog() {
            this.dialogVisible = false;
            this.$emit('close');
        },
        sendData() {
            if (EMAIL_ERRORS(this.email)) {
                this.errors.email = EMAIL_ERRORS(this.email);
            } else {
                this.errors = {};
                const data = {
                    email: this.email,
                }
                this.isSending = true;
                sendDataToHubspot(SEND_EMAIL_ID, data).then(res => {
                    this.closeDialog();
                    this.email = '';
                    this.snackbar = true;
                    this.isSending = false;
                    this.sendError = null;
                }).catch((err) => {
                    this.isSending = false;
                    this.sendError = err;
                });
            }
        }
    },
    watch: {
        showModal(newValue) {
            this.dialogVisible = newValue;
        }
    },
    computed: {
        isDisabled() {
            return this.email === '';
        }
    },
    components: {
        SuccessModal,
        InputGroup,
        SendButton,
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
        a {
            text-decoration: solid !important;
            text-decoration-line: underline !important;
        }

    }

}
</style>
  