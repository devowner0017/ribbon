<template>
    <button :class="Class" @click="openModal">
        <img src="/images/messageBox.svg" alt="share" />
    </button>
    <Modal :showModal="isModalVisible" @close="closeModal" title="Send yourself this draft">
        <InputGroup placeHolder="Enter your email address" :value="email" type="email" title="Email" :error="errors.email"
            v-on:update:value="email = $event" />
        <div class="d-flex mt-">
            <SendButton :isSending="isSending" @click="sendData" :disabled="isDisabled" />
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
            errors: {}
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
                    draft: this.currentDraft
                }
                this.isSending = true;
                sendDataToHubspot(data).then(res => {
                    this.closeModal();
                    this.email = '';
                    this.snackbar = true;
                    this.isSending = false;
                }).catch((err) => {
                    this.isSending = false;
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
</style>