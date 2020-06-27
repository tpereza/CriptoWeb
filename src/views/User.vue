<template>
  <div class="home">
    <div class="columns">
      <Profile />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/Profile.vue';
import { mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';


export default {
  name: 'User',
  components: {
    Profile,
  },
  data() {
    return {
      labels: [],
    };
  },
  computed: {
    ...mapState({
      userId: (state) => state.id,
    }),
  },
  methods: {
    ...mapActions({
      image: constants.GET_IMAGE,
    }),
  },
};
</script>
