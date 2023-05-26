<template>
    <button :class="Class" @click="openModal">
        <img src="/images/messageBox.svg" alt="share" />
    </button>
    <Modal :showModal="isModalVisible" @close="closeModal" title="Send yourself this draft">
        <InputGroup placeHolder="Enter your email address" title="Email"/>
        <div class="d-flex mt-">
            <button type="button" class="btn btn-primary btn-sm w-full" @click="shareDraft" disabled>SEND</button>
        </div>
    </Modal>
    <!-- <EmailInputModal :showModal="isModalVisible" @close="closeModal"></EmailInputModal> -->
</template>
<script>
import EmailInputModal from './utils/EmailInputModal.vue';
import Modal from './utils/Modal.vue';
import InputGroup from './InputGroup.vue';
export default {
    name: "ShareButton",
    props: {
        class: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
    computed: {
        Class() {
            return "share-btn " + this.class;
        }
    },
    components: { EmailInputModal, Modal, InputGroup }
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/main.scss";
</style>