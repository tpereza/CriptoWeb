<template>
  <div id="feed-image">
    <div class="container">

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
import SEARCH_FEED from '../graphql/getMultimediaByTag.gql';

export default {
  name: 'feed-image',
  components: {
    Stack,
    StackItem,
  },
  props: {
    tagId: String,
    previous: String,
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
  methods: {
    // eslint-disable-next-line vue/no-async-in-computed-properties,vue/return-in-computed-property
    async updateQuery() {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      const res = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: SEARCH_FEED,
        variables: {
          tagId: this.tagId,
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.images = res.data.getMultimediaByTag;
    },
  },
  created() {
    this.updateQuery();
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
