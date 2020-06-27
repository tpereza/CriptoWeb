<template>
  <div class="home">
    <UsersImages />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersImages from '@/components/UsersImages.vue';
import { mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'UsersFeed',
  components: {
    UsersImages,
  },
  data() {
    return {
      componentKey: 0,
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
