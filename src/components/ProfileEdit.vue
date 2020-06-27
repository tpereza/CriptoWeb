<template id="profile-edit">


      <form v-on:submit.prevent="">
        <div class="form-group">
          <input v-model="profile.fechaNacimiento" class="form-control control"
                 type="date" id="fechaNacimiento"
                 placeholder="Fecha de nacimiento">
        </div>
        <div class="form-group">

          <p>Genero:</p>
          <input type="radio" id="masculino"  v-model="profile.genero"  value="Masculino">
          <label for="masculino">Masculino</label><br>
          <input type="radio" id="femenino"  v-model="profile.genero" value="Femenino">
          <label for="femenino">Femenino</label><br>
          <input type="radio" id="otro"  v-model="profile.genero" value="Otro">
          <label for="otro">Otro</label>
        </div>
        <div class="form-group">
          <input v-model="profile.descripcion" class="form-control control"
                 type="text" id="descripcion"
                 placeholder="Descripcion">
        </div>

        <UploadPhotoProfile @saved="onPhotoSave" />
        <button  @click="mutateNow"  class="btn btn-primary">Save</button>
        <button  @click="onCancel"  class="btn btn-primary">Cancel</button>

      </form>

</template>


<script>
import { mapState } from 'vuex';
import UploadPhotoProfile from '@/components/UploadPhotoProfile.vue';


export default {
  name: 'ProfileEdit',
  components: {
    UploadPhotoProfile,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
  },
  methods: {
    onEdit(data) {
      if (data) {
        console.log('profile saved');
        this.$emit('saved', 'someValue');
      }
    },
    onCancel() {
      this.$emit('cancelled', 'someValue');
    },
    onPhotoSave(value) {
      console.log(value);
      this.profile.foto = value;
    },
    mutateNow() {
      this.$apollo.mutate({
        // eslint-disable-next-line global-require
        mutation: require('../graphql/updateProfile.gql'),
        variables: {
          userId: this.profile.userId,
          countryId: this.profile.countryId,
          fechaNacimiento: this.profile.fechaNacimiento,
          genero: this.profile.genero,
          foto: this.profile.foto,
          descripcion: this.profile.descripcion,
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
          this.$emit('saved', results.data.updateProfile);
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
