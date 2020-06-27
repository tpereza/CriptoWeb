<template>
  <Login v-if="!isLogged"></Login>
</template>

<script>
import { mapState } from 'vuex';
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  computed: {
    ...mapState({
      isLogged: (state) => state.logged,
    }),
  },
};
</script>
