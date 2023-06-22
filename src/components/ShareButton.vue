<template>
    <button :class="Class" @click="openModal">
        <img src="/images/messageBox.svg" alt="share" />
    </button>
    <Modal :showModal="isModalVisible" @close="closeModal" title="Send yourself this draft">
        <InputGroup placeHolder="Enter your email address" :value="email" type="email" title="Email" :error="errors.email"
            v-on:update:value="email = $event" />
        <div class="d-flex">
            <SendButton :isSending="isSending" @click="sendData" :disabled="isDisabled" />
        </div>
        <div v-if="sendError" class="text-red-500 text-center mt-4">
            {{ sendError }}
        </div>
        <div class="md:mt-3 sm:mt-2 mt-2 text-color-gray sm-text">
            By entering your email, you agree to Ribbon Education’s <a href="https://www.ribbonedu.com/terms-and-conditions"
                target="_blank">terms and conditions</a> and <a href="https://www.ribbonedu.com/privacy-policy"
                target="_blank">privacy
                policy</a>.
        </div>
    </Modal>
    <v-snackbar v-model="snackbar" :timeout="3000">
        <div class="flex items-center"><img src="/images/check.svg" class="mr-2" alt="check" /> <span>Draft has been sent to
                your email!</span></div>
    </v-snackbar>
    <!-- <EmailInputModal :showModal="isModalVisible" @close="closeModal"></EmailInputModal> -->
</template>
<script>
import EmailInputModal from './utils/EmailInputModal.vue';
import Modal from './utils/Modal.vue';
import InputGroup from './InputGroup.vue';
import SendButton from './SendButton.vue';
import { sendDataToHubspot } from '../actions/hubspot';
import { EMAIL_ERRORS } from '../errors';
import { SEND_DRAFT_ID } from '../actions/config';
export default {
    name: "ShareButton",
    props: {
        class: {
            type: String,
            default: "",
        },
        currentDraft: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isModalVisible: false,
            email: "",
            snackbar: false,
            isSending: false,
            errors: {},
            sendError: null,
        };
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        sendData() {
            if (EMAIL_ERRORS(this.email)) {
                this.errors.email = EMAIL_ERRORS(this.email);
            } else {
                this.errors = {};
                const data = {
                    email: this.email,
                    latest_draft: this.currentDraft
                }
                this.isSending = true;
                sendDataToHubspot(SEND_DRAFT_ID, data).then(res => {
                    this.closeModal();
                    this.email = '';
                    this.snackbar = true;
                    this.isSending = false;
                    this.sendError = null;
                }).catch((err) => {
                    this.isSending = false;
                    this.sendError = err;
                    console.log(err)
                });
            }
        }

    },
    computed: {
        Class() {
            return "share-btn " + this.class;
        },
        isDisabled() {
            return this.email === '';
        }
    },
    components: { EmailInputModal, Modal, InputGroup, SendButton }
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/main.scss";
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
</style>