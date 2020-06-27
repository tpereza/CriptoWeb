<template>
  <div id="following">
    <div class="container">
      <b-card-group deck>
        <div v-for="user in following" :key="user.id">
          <UserData :id="user.id"/>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserData from './UserData.vue';
import QUERY_FOLLOWING from '../graphql/usersFollowingByFollower.gql';

export default {
  name: 'user-following',
  components: {
    UserData,
  },
  props: {
    labels: [],
    id: {
      type: Number,
      required: true,
    },
    isOther: {
      type: Boolean,
    },
  },
  data: () => ({
    following: [],
  }),
  computed: {
    ...mapState({
      // userId: (state) => state.id,
      token: (state) => state.token,
    }),
  },
  methods: {
    queryFollowing() {
      this.$apollo.query({
        query: QUERY_FOLLOWING,
        fetchPolicy: 'no-cache',
        variables: {
          userId: this.id,
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((res) => {
          this.following = res.data.usersFollowingByFollower;
        });
    },
  },
  created() {
    this.queryFollowing();
  },
};
</script>
