<template>
    <nav>
        <div class="nav-bar nav-bar-sm">
            <a href="https://www.ribbonedu.com/" target="_blank"><span>
                    <img src='@/assets/icons/logo.svg' alt="ribbon education" />
                </span>
            </a>
            <div class="">
                <Button class="btn-ghost" v-on:click="showAboutModal">about</Button>
                <Button class="btn-primary" v-on:click="showShareModal">share</Button>
            </div>
        </div>
    </nav>
    <Modal :showModal="isShareModalVisible" @close="closeShareModal" title="Share Ribbon’s AI-Powered Smart Compose Tool">
        <div>
            We’re proud to showcase how AI can help educators communicate with their students. Share this tool with anyone you think may find it useful!
        </div>
        <InputGroup placeHolder="First and last name" title="Name"/>
        <InputGroup placeHolder="Enter your email address" title="Email"/>
        <InputGroup placeHolder="Enter your email address" title="Emails to share with(comma separeted)"/>
        <div class="d-flex mt-5">
            <button type="button" class="btn btn-primary btn-sm w-full" disabled>share</button>
        </div>
    </Modal>
    <AboutModal :showModal="isAboutModalVisible" @close="closeAboutModal"></AboutModal>
</template>
<script>
import Button from './Button.vue';
import AboutModal from './utils/AboutModal.vue';
import Modal from './utils/Modal.vue';
import InputGroup from './InputGroup.vue';
export default {
    name: 'Navbar',
    components: { Button, AboutModal, Modal, InputGroup },
    data() {
        return {
            isAboutModalVisible: false,
            isShareModalVisible: false,
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
        }
    },

}

</script>
<style scoped lang="scss">
@import "@/assets/styles/main.scss";
</style>