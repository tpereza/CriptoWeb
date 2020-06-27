<template>
  <div id="UserFollow">

    <ApolloQuery
      :query="require('../graphql/userById.gql')"
      :variables="{ creatorId }"
      :context="{ headers: { Authorization: token } }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="data" class="result apollo" style="display : none">
          {{ (user = data.userById) }}
        </div>
      </template>
    </ApolloQuery>
    <b-button
      v-if="follows.some((res) => res.id === creatorId)"
      variant="secondary"
      v-on:click="Unfollow(followId, token)"
    >Dejar de Seguir
    </b-button
    >
    <b-button v-else variant="info" v-on:click="Follow(userId, creatorId, token)"
    >Seguir
    </b-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DELETE_FOLLOW from '../graphql/deleteFollow.gql';
import CREATE_FOLLOW from '../graphql/createUserFollow.gql';
import USER_FOLLOWING from '../graphql/usersFollowingByFollower.gql';
import ALL_FOLLOWS from '../graphql/allUserFollow.gql';

export default {
  name: 'FollowUser',
  components: {},
  props: {
    creatorId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    user: {},
    follows: [],
    userFollows: [],
    followId: Number,
  }),
  watch: {
    userFollows() {
      if (this.follows.some((res) => res.id === this.creatorId)) {
        this.followId = this.userFollows.find(
          (element) => element.userFollower.id === this.userId
            && element.userFollowing.id === this.creatorId,
        ).id;
      }
    },
  },
  computed: {
    ...mapState({
      userId: (state) => Number(state.id),
      token: (state) => state.token,
    }),
  },
  methods: {
    Unfollow(followId, token) {
      this.$apollo
        .mutate({
          mutation: DELETE_FOLLOW,
          variables: { followId },
          context: { headers: { Authorization: token } },
        })
        .then(() => {
          console.log('unfollowed');
          this.$emit('updated');
        });
    },
    Follow(userFollower, userFollowing, token) {
      this.$apollo
        .mutate({
          mutation: CREATE_FOLLOW,
          variables: {
            userFollower,
            userFollowing,
          },
          context: { headers: { Authorization: token } },
        })
        .then(() => {
          console.log('followed');
          this.$emit('updated');
        });
    },
  },
  async created() {
    const userId = Number(this.userId);
    // const { creatorId } = this;
    const { token } = this;
    const result = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: USER_FOLLOWING,
      variables: { userId },
      context: { headers: { Authorization: token } },
    });
    const allFollows = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: ALL_FOLLOWS,
      variables: { userId },
      context: { headers: { Authorization: token } },
    });
    this.follows = result.data.usersFollowingByFollower;
    this.userFollows = allFollows.data.allUserFollow;
    /* this.followId = allFollows.data.allUserFollow.find(
      (element) => element.userFollower.id === userId && element.userFollowing.id === creatorId,
    ).id; */
  },
};
</script>
