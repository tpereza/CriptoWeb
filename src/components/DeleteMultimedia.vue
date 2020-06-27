<template id="deletemultimedia">
  <b-button @click="mutateNow" variant="danger" >
    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
  </b-button>
</template>


<script>
import { mapState } from 'vuex';


export default {
  name: 'DeleteMultimedia',
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onCancel() {
      this.$emit('cancelled', 'someValue');
    },
    mutateNow() {
      this.$apollo.mutate({
        // eslint-disable-next-line global-require
        mutation: require('../graphql/deleteMultimedia.gql'),
        variables: {
          idMultimedia: this.image.id,
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((results) => {
          // eslint-disable-next-line no-console
          // console.log(results);
          this.$emit('saved', results.data.deleteMultimedia);
          // this.$router.push(this.$router.fullPath);
        });
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },
};
</script>
