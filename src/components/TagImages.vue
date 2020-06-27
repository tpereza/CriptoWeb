<template>
  <div id="feed-image">
    <div class="container">
      <ApolloQuery
        :query="require('../graphql/getTagsFeed.gql')"
        :variables="{ userId }"
        :context="{ headers: { Authorization: token } }"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <div v-if="data" class="result apollo" style="display: none">
            {{ (images = data.getTagsFeed) }}
          </div>
        </template>
      </ApolloQuery>
      <stack :column-min-width="200" :gutter-width="5" :gutter-height="5" monitor-images-loaded>
        <stack-item v-for="(image, i) in images" :key="i" style="transition: transform 300ms">
          <a
            @click="
              $router.push({
                name: 'ImageInfo',
                params: {
                  otherProp: {
                    image: image,
                    previous: 'TagsFeed',
                  },
                },
              })
            "
          >
            <img class="feed" :src="image.url" :alt="image.__typename" />
          </a>
        </stack-item>
      </stack>
    </div>
  </div>
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid';
import { mapState } from 'vuex';
import TAGS_FEED from '../graphql/getUsersFeed.gql';

export default {
  name: 'feed-image',
  components: {
    Stack,
    StackItem,
  },
  props: {
    labels: [],
  },
  data: () => ({
    images: [],
  }),
  computed: {
    ...mapState({
      userId: (state) => String(state.id),
      token: (state) => state.token,
    }),
  },
  async created() {
    const userId = String(this.userId);
    const { token } = this;
    const result = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: TAGS_FEED,
      variables: { userId },
      context: { headers: { Authorization: token } },
    });
    this.images = result.data.getUsersFeed;
  },
};
</script>
<style>
#feed-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2vh;
}
.container {
  width: 100vw;
  margin: 0 auto;
  margin-left: 0;
  margin-right: 0;
  max-width: 100vw;
  padding-left: 2vw;
  padding-right: 2vw;
}
.feed {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
</style>
