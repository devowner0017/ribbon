<script>
import Button from '../Button.vue';
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
    }
  },
  watch: {
    showModal(newValue) {
      this.dialogVisible = newValue;
    }
  },
  components: {
    Button
  }
}
</script>
<template>
  <div :class="{ 'hidden': !showModal }">
    <div class="fixed w-full h-screen left-0 top-0 modal-background">
      <div class="absolute w-full h-full" @click="closeDialog"></div>
      <div class="confirm-modal modal-wrapper">
        <div class="modal">
          <div class="modal-close">
            <button type="button" class="modal-close-inner" @click="closeDialog">
              <img src="/images/modal-close.svg" alt="close" />
            </button>
          </div>
          <div class="modal-content">
            <div class="grid grid-cols-1 w-full">
              <div class="text-main-content mb-2 text-center"><b>Successfully sent!</b></div>
              <div class="mx-auto">
                <img src="/images/success.svg" alt="success" />
              </div>
              <div class="text-middle-content mb-6 text-center">For more tools like these, check out Ribbon. Ribbon is the first student CRM platform built for online adult education providers tostreamline operations and improve student retention.</div>
              <div class="grid grid-cols-2  w-full">
                <Button class="btn btn-primary ">
                  Book a demo
                </Button>
                <Button class="btn btn-secondary">
                  about ribbon
                </Button>
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

@media screen and (max-width: 640px) {
  .confirm-modal .modal {
    width: 100% !important;
  }

  .confirm-modal {
    padding: 0 20px 0px 20px !important
  }
}

.modal-background {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-modal {
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
