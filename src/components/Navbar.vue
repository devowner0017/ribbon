<template>
    <nav>
        <div class="nav-bar nav-bar-sm">
            <a href="https://www.ribbonedu.com/" target="_blank"><span>
                    <img src='@/assets/icons/logo.svg' alt="ribbon education" />
                </span>
            </a>
            <div class="flex">
                <Button class="btn-ghost btn-sm" v-on:click="showAboutModal">about</Button>
                <Button class="btn-primary btn-sm" v-on:click="showShareModal">share</Button>
            </div>
        </div>
    </nav>
    <Modal :showModal="isShareModalVisible" @close="closeShareModal" title="Share Ribbon’s AI-Powered Smart Compose Tool">
        <div>
            We’re proud to showcase how AI can help educators communicate with their students. Share this tool with anyone
            you think may find it useful!
        </div>
        <InputGroup placeHolder="First and last name" title="Name" :value="name" type="text" :error="errors.name"
            v-on:update:value="name = $event" />
        <InputGroup placeHolder="Enter your email address" title="Email" :value="email" type="email" :error="errors.email"
            v-on:update:value="email = $event" />
        <InputGroup placeHolder="Enter your email address" title="Email you want to share tool with" :value="share_email"
            type="email" :error="errors.share_email" v-on:update:value="share_email = $event" />
        <div class="d-flex md:mt-5 sm:mt-3 mt-2">
            <SendButton title="share" :isSending="isSending" @click="sendData" :disabled="isDisabled" />
        </div>
        <div v-if="sendError" class="text-red-500 text-center md:mt-4 sm:mt-2 mt-2">
            {{ sendError }}
        </div>
        <div class="md:mt-3 sm:mt-2 mt-2 text-color-gray sm-text">
            By entering your email, you agree to Ribbon Education’s <a
                href="https://www.ribbonedu.com/terms-and-conditions" target="_blank">terms and conditions</a> and <a
                href="https://www.ribbonedu.com/privacy-policy" target="_blank">privacy
                policy</a>.
        </div>
    </Modal>
    <AboutModal :showModal="isAboutModalVisible" @close="closeAboutModal"></AboutModal>
    <v-snackbar v-model="snackbar" :timeout="3000">
        <div class="flex items-center"><img src="/images/check.svg" class="mr-2" alt="check" /> <span>Thanks, sent!</span>
        </div>
    </v-snackbar>
</template>
<script>
import Button from './Button.vue';
import AboutModal from './utils/AboutModal.vue';
import Modal from './utils/Modal.vue';
import InputGroup from './InputGroup.vue';
import SendButton from './SendButton.vue';
import { EMAIL_ERRORS, NAME_ERRORS } from '../errors';
import { sendDataToHubspot } from '../actions/hubspot';
import { SHARE_EMAIL_ID } from '../actions/config';
export default {
    name: 'Navbar',
    components: { Button, AboutModal, Modal, InputGroup, SendButton },
    data() {
        return {
            isAboutModalVisible: false,
            isShareModalVisible: false,
            name: "",
            email: "",
            share_email: "",
            isSending: false,
            snackbar: false,
            errors: {},
            sendError: null,
        }
    },
    methods: {
        closeAboutModal() {
            this.isAboutModalVisible = false;
        },
        showAboutModal() {
            this.isAboutModalVisible = true;
        },
        showShareModal() {
            this.isShareModalVisible = true;
        },
        closeShareModal() {
            this.isShareModalVisible = false;
        },
        sendData() {
            if (EMAIL_ERRORS(this.email) || NAME_ERRORS(this.name) || EMAIL_ERRORS(this.share_email)) {
                this.errors.email = EMAIL_ERRORS(this.email);
                this.errors.name = NAME_ERRORS(this.name);
                this.errors.share_email = EMAIL_ERRORS(this.share_email);
            } else {
                this.errors = {};
                const names = this.name.trim().split(' ');
                const data = {
                    email: this.email,
                    firstname: names[0],
                    lastname: names[1],
                    ai_generator_referrer: this.share_email,
                }
                this.isSending = true;
                sendDataToHubspot(SHARE_EMAIL_ID, data).then(res => {
                    this.closeShareModal();
                    this.email = '';
                    this.name = '';
                    this.share_email = '';
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
    computed: {
        isDisabled() {
            return this.email === '' || this.name === '' || this.share_email === '';
        }
    }

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