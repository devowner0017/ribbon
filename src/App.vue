<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen  flex flex-col">
    <header>
      <Navbar />
    </header>
    <RouterView />
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  name: 'Question 1',
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      if (event.keyCode === 116) { // 116 is the keycode for F5
        event.preventDefault(); // prevent the default F5 behavior (refreshing the page)
        window.location.reload(); // manually reload the page
        window.location.href="/";
      }
    }
  }


}
</script>

