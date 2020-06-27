<template>
  <div class="home">
    <TagImages/>
  </div>
</template>

<script>
// @ is an alias to /src
import TagImages from '@/components/TagImages.vue';
import { mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Feed',
  components: {
    TagImages,
  },
  data() {
    return {
      labels: [],
    };
  },
  computed: {
    ...mapState({
      isImage: (state) => state.image,
      userId: (state) => state.id,
      token: (state) => state.token,
    }),
  },
  methods: {
    ...mapActions({
      image: constants.GET_IMAGE,
    }),
    checkUserLabels() {
      this.$apollo.query({
        // eslint-disable-next-line global-require
        query: require('../graphql/userLabels.gql'),
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
        // eslint-disable-next-line no-return-assign
        .then((data) => {
          if (!data.data.userLabels.relatedLabels) {
            this.$router.push('UserTags');
          } else {
            this.labels = data.data.userLabels.relatedLabels;
          }
        });
    },
  },
  created() {
    this.checkUserLabels();
  },
};
</script>
