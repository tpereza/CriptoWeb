<template>
  <div id="follower">
    <div class="container">
      <b-card-group deck>
      <div v-for="item in followersFiltered" :key="item.id">
        <UserData :id="item.userFollower.id"/>
        <!--        <div v-if="!isOther">
                  <button>Seguir</button>
                </div>-->
      </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserData from './UserData.vue';
import QUERY_FOLLOWER from '../graphql/allUserFollow.gql';

export default {
  name: 'follower',
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
    queryFollower() {
      this.$apollo.query({
        query: QUERY_FOLLOWER,
        fetchPolicy: 'no-cache',
        variables: {
          userId: this.userId,
        },
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
    this.queryFollower();
  },
};
</script>
