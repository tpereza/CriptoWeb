<template>
  <div id="countFollowing">
      <p class="stat-val">{{following.length}}</p>
      <p class="stat-key">Siguiendo</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import QUERY_FOLLOWING from '../graphql/usersFollowingByFollower.gql';

export default {
  name: 'user-following',
  props: {
    labels: [],
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    following: [],
  }),
  computed: {
    ...mapState({
      userId: (state) => state.id,
      token: (state) => state.token,
    }),
  },
  watch: {
    id() {
      this.queryFollowing();
    },
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
