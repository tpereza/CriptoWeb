<template>


      <form v-on:submit.prevent="">

        <input @change="onUpload" type="file"/>
        <button @click="mutateNow" class="btn btn-primary">Upload</button>
        <Toast></Toast>
      </form>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Upload',
  props: ['title'],
  data() {
    return {
      image: null,
      messages: [],
    };
  },
  methods: {
    onUpload({ target: { files = [] } }) {
      if (files.length) {
        // eslint-disable-next-line no-console
        console.log(files);
        [this.image] = files;
      }
    },
    doneUpload(data) {
      // eslint-disable-next-line no-console
      console.log(data);
    },
    mutateNow() {
      this.$apollo.mutate({
        // eslint-disable-next-line global-require
        mutation: require('../graphql/updateProfilePhoto.gql'),
        variables: {
          image: this.image,
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((results) => {
          // eslint-disable-next-line no-console
          console.log(results);
          this.$emit('saved', results.data.updateProfilePhoto);
          this.$toast.add({
            severity: 'success',
            summary: 'Foto Cargada',
            detail: 'Foto Cargada',
            life: 3000,
          });
        });
    },

  },
  computed: {
    ...mapState({
      token: (state) => state.token,
      idUser: (state) => String(state.id),
    }),
  },
};

</script>
