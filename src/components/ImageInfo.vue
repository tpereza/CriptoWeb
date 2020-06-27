<template>
  <div id="ImageInfo">
    <div class="container">
      <div class="row" style="paddin">
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
        <div class="col-4">
          <stack :column-min-width="500" :gutter-width="5" :gutter-height="5" monitor-images-loaded>
            <stack-item style="transition: transform 300ms">
              <img class="feed" :src="image.url" :alt="image.descripcion"/>
            </stack-item>
          </stack>
        </div>
        <div class="col-6">
          <p>Descripción: {{ image.descripcion }}</p>
          <p>Nombre: {{ user.firstName }}</p>
          <p>Apellido: {{ user.lastName }}</p>
          <p>Username: {{ user.username }}</p>
        </div>
        <div class="col-2">
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
      </div>
    </div>
  </div>
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid';
import { mapState } from 'vuex';
import DELETE_FOLLOW from '../graphql/deleteFollow.gql';
import CREATE_FOLLOW from '../graphql/createUserFollow.gql';
import USER_FOLLOWING from '../graphql/usersFollowingByFollower.gql';
import ALL_FOLLOWS from '../graphql/allUserFollow.gql';

export default {
  name: 'ImageInfo',
  components: {
    Stack,
    StackItem,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
    creatorId: {
      type: Number,
      required: true,
    },
    previous: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    user: {},
    follows: [],
    followId: Number,
  }),
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
          if (this.previous === 'UsersFeed') {
            this.$router.push('UsersFeed');
          } else {
            this.$router.push('TagFeed');
          }
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
          if (this.previous === 'UsersFeed') {
            this.$router.push('UsersFeed');
          } else {
            this.$router.push('TagFeed');
          }
        });
    },
  },
  async created() {
    const userId = Number(this.userId);
    const { creatorId } = this;
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
    this.followId = allFollows.data.allUserFollow.find(
      (element) => element.userFollower.id === userId && element.userFollowing.id === creatorId,
    ).id;
  },
};
</script>
<style>
  #ImageInfo {
    margin-top: 5vh;
  }
</style>
