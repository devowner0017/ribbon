<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 gird-cols-1">
            <div class=" md:flex flex-col grow w-full justify-center items-center sm:hidden hidden">
                <div
                    class="form-content form-content-md form-content-sd form-content-sm w-full h-full flex flex-column justify-center items-center ">
                    <div class="flex flex-col justify-center items-center">
                        <p class="header-text">
                            Thanks for using Ribbon’s AI-Powered Smart Compose Tool
                        </p>
                        <p class="mid-text mt-3 mb-5">
                            Provide your email so we can send you your final version and get access to our top performing
                            email templates used by institutions like yours.
                        </p>
                        <InputGroup title="Email" placeHolder="Enter your email address" :value="email" type="email"
                            :disabled="sent" :error="errors.email" v-on:update:value="email = $event" />
                        <div class="flex mt-3 w-full">
                            <SendButton :isSending="isSending" :includeSlot="sent" @click="sendData" :disabled="isDisabled">
                                <div class="flex items-center justify-center"><img src="/images/check.svg" class="mr-2"
                                        width="20" height="20" alt="check" />
                                    <span>EMAIL SENT</span>
                                </div>
                            </SendButton>
                        </div>
                        <div v-if="sendError" class="text-red-500 text-center mt-4">
                            {{ sendError }}
                        </div>
                        <div class="md:block sm:hidden hidden">
                            <div class="line my-8"></div>
                            <p class="bottom-text-title">
                                About Ribbon Education
                            </p>
                            <p class="bottom-text">
                                Ribbon builds tools that help advisors and student facing staff quickly understand learner
                                context and automate busy work so that your time and energy can go back to human
                                interactions
                                with your actual students.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="selected_draft" draftNum="final" hiddenSend :subject="subject" :mode="mode"
                    :selected="selected" />
            </div>

        </div>
        <div :class="['md:hidden sm:block w-full absolue bottom-0 z-50 upper-menu', { 'upper-full': showSendMenu }]">
            <button
                :class="['flex flex-column items-center justify-center menu-btn', 
                { 'union-circle-btn rounded-full bg-color-primary': !showSendMenu }, 
                { 'close-menu-btn': showSendMenu }]"
                @click="openMenu">
                <span v-if="!showSendMenu"><img src="/images/union.svg" alt="union" /></span>
                <span v-if="showSendMenu"><img src="/images/x-icon.svg" alt="union" /></span>
            </button>
            <div class="menu-content h-full">
                <div class="flex flex-col justify-center items-center">
                    <p class="header-text">
                        Thanks for using Ribbon’s AI-Powered Smart Compose Tool
                    </p>
                    <p class="mid-text mt-3 mb-5">
                        Provide your email so we can send you your final version and get access to our top performing
                        email templates used by institutions like yours.
                    </p>
                    <InputGroup title="Email" placeHolder="Enter your email address" :value="email" type="email"
                        :disabled="sent" :error="errors.email" v-on:update:value="email = $event" />
                    <div class="flex mt-3 w-full">
                        <SendButton :isSending="isSending" :includeSlot="sent" @click="sendData" :disabled="isDisabled">
                            <div class="flex items-center justify-center"><img src="/images/check.svg" class="mr-2"
                                    width="20" height="20" alt="check" />
                                <span>EMAIL SENT</span>
                            </div>
                        </SendButton>
                    </div>
                    <div v-if="sendError" class="text-red-500 text-center mt-4">
                        {{ sendError }}
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
import MenuBar from '../../components/MenuBar.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
import InputGroup from '../../components/InputGroup.vue';
import SendButton from '../../components/SendButton.vue';
import { sendDataToHubspot } from '../../actions/hubspot';
import { EMAIL_ERRORS } from '../../errors';
import { EMPTY_ERRORS } from '../../errors';
import { SEND_FINAL_DRAFT_ID } from '../../actions/config';
export default {
    components: {
        MenuBar,
        Button,
        Paper,
        ShareButton,
        InputGroup,
        SendButton
    },
    name: 'Second Question',
    methods: {
        openMenu() {
            this.showSendMenu = !this.showSendMenu;
        },
        sendData() {
            if (EMAIL_ERRORS(this.email) || EMPTY_ERRORS(this.email)) {
                this.errors.email = EMAIL_ERRORS(this.email);
            } else {
                if (!this.sent) {
                    this.errors = {};
                    const data = {
                        email: this.email,
                        latest_draft: this.selected_draft
                    }
                    this.isSending = true;
                    sendDataToHubspot( SEND_FINAL_DRAFT_ID, data).then(res => {
                        this.snackbar = true;
                        this.isSending = false;
                        this.sendError = null;
                        this.sent = true;
                    }).catch((err) => {
                        this.isSending = false;
                        this.sendError = err;
                    });
                }
            }
        }
    },
    data() {
        return {
            email: "",
            isSending: false,
            snackbar: false,
            errors: {},
            sendError: null,
            sent: false,
            showSendMenu: false,
        }
    },
    computed: {
        draft() {
            return this.$store.state.draft2;
        },
        selected() {
            if (this.$route.query.question4)
                return this.$route.query.question4.split(",");
        },
        mode() {
            return this.$route.query.question3;
        },
        subject() {
            return this.$route.query.question1;
        },
        isDisabled() {
            return this.email === '';
        },
        selected_draft() {
            const selected_id = this.$route.params.selected;
            if (selected_id === '4') {
                return this.$store.state.draft4;
            } else if (selected_id === '5') {
                return this.$store.state.draft5;
            } else if (selected_id === '6') {
                return this.$store.state.draft6;
            }
        }
    },
}
</script>

<style scoped>
.header-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
}

.mid-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
}

.bottom-text-title {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
}

.bottom-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.line {
    border: 1px solid #D2CACA;
}

.menu-btn {
    right: 16px;
    transition: all 0.7s ease-in-out;
    width: 56px;
    height: 56px;
    position: absolute;
}
.union-circle-btn {
    transform: translateY(-28px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
}

.close-menu-btn {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}

.upper-menu {
    box-shadow: 0px -8px 16px rgba(0, 0, 0, 0.3);
    background-color: white;
    min-height: 50px;
    height: 50px;
    overflow: hidden;
    transition: height 0.7s ease-in-out;
}

.menu-content {
    padding: 52px 24px 0px 24px;
}

.upper-full {
    height: 100% !important;
}
</style>
