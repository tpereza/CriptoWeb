<template>
  <div id="app">
      <Navbar v-if="isLogged"/>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      isLogged: (state) => state.logged,
    }),
  },
  created() {
    if (this.isLogged) {
      this.$router.push('Home');
    }
  },
};
</script>
