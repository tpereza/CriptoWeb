<template>
  <div id="follower">

    <p class="stat-val">{{followersFiltered.length}}</p>
    <p class="stat-key">Seguidores</p>


  </div>
</template>

<script>
import { mapState } from 'vuex';
import QUERY_FOLLOWER from '../graphql/allUserFollow.gql';

export default {
  name: 'follower',
  components: {},
  props: {
    labels: [],
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    followers: [],
  }),
  computed: {
    ...mapState({
      userId: (state) => state.id,
      token: (state) => state.token,
    }),
    followersFiltered() {
      return this.followers.filter((item) => item.userFollowing.id === this.id);
    },
  },
  methods: {
    queryFollowers() {
      this.$apollo.query({
        query: QUERY_FOLLOWER,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((res) => {
          this.followers = res.data.allUserFollow;
        });
    },
  },
  created() {
    this.queryFollowers();
  },
};
</script>
