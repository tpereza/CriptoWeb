<template>
  <div id="userdata">

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

    <b-card
      :img-src="user.profiles[0].foto"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <template v-slot:header>
        <a  href="#" @click="$router.push({ path:`/otherprofile/multimedia/${user.id}`})">
          {{fullName}}
        </a>
      </template>

      <b-card-body>
        <b-card-sub-title class="mb-2">{{user.username}}</b-card-sub-title>
       </b-card-body>

       <FollowUser :creatorId="Number(user.id)"
                   :key="componentKey"
                   @updated="forceRerender"/>

    </b-card>
  </div>


</template>

<script>
import { mapState } from 'vuex';
import FollowUser from '@/components/FollowUser.vue';

export default {
  name: 'datauser',
  components: {
    FollowUser,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    componentKey: 0,
    user: {
      id: '',
      firstName: '',
      lastName: '',
      profiles: [
        {},
      ],
    },
  }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
    fullName() {
      return this.user.firstName.concat(' ', this.user.lastName);
    },
  },
};
</script>
