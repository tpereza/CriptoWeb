<template>
  <div id="countMultimedia">
    <p class="stat-val">{{multimedia.length}}</p>
    <p class="stat-key">Multimedia</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QUERY_MULTIMEDIA from '../graphql/getMultimediaByUser.gql';

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
    multimedia: [],
  }),
  computed: {
    ...mapState({
      iduser: (state) => String(state.id),
      token: (state) => state.token,
    }),
  },
  watch: {
    id() {
      this.queryMultimedia();
    },
  },
  methods: {
    queryMultimedia() {
      this.$apollo.query({
        query: QUERY_MULTIMEDIA,
        fetchPolicy: 'no-cache',
        variables: {
          id: String(this.id),
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((res) => {
          this.multimedia = res.data.getMultimediaByUser;
        });
    },
  },
  created() {
    this.queryMultimedia();
  },
};
</script>
