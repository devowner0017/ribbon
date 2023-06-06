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
    window.addEventListener('load', this.handleload);
  },
  beforeDestroy() {
    window.removeEventListener('load', this.handleload);
  },
  methods: {
    handleload(event) {  
      event.preventDefault();
      this.$router.push('/');
      window.removeEventListener('unload', this.handleload);
      
    }
  },
}
</script>

