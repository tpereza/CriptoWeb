<template>

  <div id="profile">
    <div class="container">
      <ApolloQuery
        :query="require('../graphql/getUserById.gql')"
        :variables="{ id }"
        :context="{ headers : {Authorization : token}}"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <div
            v-if="data"
            class="result apollo"
            style="display: none"
          >{{ user = data.userById }}
          </div>
        </template>
      </ApolloQuery>

         <div class="container profile">
           <Toast></Toast>
            <div class="section profile-heading">
              <div class="columns is-mobile is-multiline">
                <div class="column is-2">
                    <img v-if="user.profiles[0].foto" v-bind:src="user.profiles[0].foto"
                         class="user__header" >
                    <div v-else class="user__avatar"></div>

<!--               <span class="user__header-right">
                  <img class="user__header-right" v-bind:src="user.profiles[0].foto"
                       alt="Foto de perfil">
                </span>-->
                </div>
                <div class="column is-4-tablet is-10-mobile name">
                  <p>
                    <span class="title is-bold">{{user.firstName +' ' + user.lastName}}</span>
                    <br/>
                    <a v-if="!isOther" class="button is-primary is-outlined"
                       @click="edit" id="edit-preferences"
                       style="margin: 5px 0">
                      Editar Perfil
                    </a>
                    <a v-if="isOther" class="button is-primary is-outlined"
                       @click="$router.push({ path: `/profile/multimedia/${myid}` })" id="volver"
                       style="margin: 5px 0">
                       Volver a mi Perfil
                    </a>
                    <br/>
                    <FollowUser v-if="isOther" :creatorId="Number(id)"
                                :key="componentKey"
                                @updated="forceRerender"/>
                  </p>
                  <p>
                    <ProfileEdit @cancelled="onCancel" @saved="onSave"
                                 v-if="editing" :profile="user.profiles[0]" />
                  </p>

                  <div v-if="!editing">
                    <p class="tagline">
                      {{user.profiles[0].fechaNacimiento}}
                    </p>
                    <p class="tagline">
                      {{user.profiles[0].genero}}
                    </p>
                    <p class="tagline">
                      {{user.profiles[0].descripcion}}
                    </p>
                  </div>

                  <br/>
                  <b-button v-if="!isOther"  v-b-modal.modal-no-backdrop>
                    Agregar Multimedia
                  </b-button>
                  <b-modal id="modal-no-backdrop"
                           hide-backdrop content-class="shadow" title="Subir Multimedia">
                    <p class="my-2">
                      <UploadMultimedia />
                    </p>
                  </b-modal>
                </div>
                <div class="column is-2-tablet is-4-mobile has-text-centered">
                  <CountFollowing :id="id"/>
                </div>
                <div class="column is-2-tablet is-4-mobile has-text-centered">
                  <CountFollower :id="id" />
                </div>
                <div class="column is-2-tablet is-4-mobile has-text-centered">
                  <CountMultimedia :id="id" />
                </div>
              </div>
            </div>
          </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UploadMultimedia from '@/components/UploadMultimedia.vue';
import CountFollowing from '@/components/CountFollowing.vue';
import CountMultimedia from '@/components/CountMultimedia.vue';
import CountFollower from '@/components/CountFollower.vue';
import ProfileEdit from '@/components/ProfileEdit.vue';
import FollowUser from '@/components/FollowUser.vue';

export default {
  name: 'profile',
  components: {
    ProfileEdit,
    UploadMultimedia,
    CountFollowing,
    CountMultimedia,
    CountFollower,
    FollowUser,
  },
  props: {
    labels: [],
    id: {
      type: Number,
      required: true,
    },
    isOther: {
      type: Boolean,
      required: true,
    },
  },
  data: () => (
    {
      componentKey: 0,
      editing: false,
      user: {
        profiles: [
          {},
        ],
      },
    }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    edit() {
      this.editing = true;
    },
    onSave(value) {
      this.editing = false;
      this.$toast.add({
        severity: 'success',
        summary: value,
        detail: value,
        life: 3000,
      });
    },
    onCancel() {
      this.editing = false;
    },
  },
  computed: {
    ...mapState({
      myid: (state) => state.id,
      token: (state) => state.token,
    }),
  },
};
</script>
