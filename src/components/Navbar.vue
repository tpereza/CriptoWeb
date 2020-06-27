<template>
  <b-navbar toggleable="lg" type="light" variant="light" sticky="sticky">
    <ApolloQuery
      :query="require('../graphql/getAllLabels.gql')"
      :context="{ headers: { Authorization: token } }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="data" class="result apollo" style="display : none">
          {{ (labels = data.getAllLabels) }}
        </div>
      </template>
    </ApolloQuery>
    <b-navbar-brand @click="$router.push('TagFeed')">
      <img width="40vw" height="40vh" src="../assets/Logo.png" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="$router.push({ path:'/tagfeed' })">Inicio</b-nav-item>
        <b-nav-item @click="$router.push({ path: '/usersfeed' })">Siguiendo</b-nav-item>
      </b-navbar-nav>

      <div class="search">
        <b-nav-form>
          <autocomplete placeholder="Buscar" style="width: 70vw;" :source="labels" @selected="Save">
          </autocomplete>
        </b-nav-form>
      </div>
      <!-- Right aligned nav items -->
      <b-navbar-nav>
        <b-avatar class="align-top" button @click="avatarView" size="md"></b-avatar>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content> </template>
         <!-- <b-dropdown-item @click="$router.push('Profile')">Perfil</b-dropdown-item>-->
          <b-dropdown-item @click="$router.push({ path: `/profile/multimedia/${userId}` })">
            Perfil
          </b-dropdown-item>
          <b-dropdown-item href="/">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Autocomplete from 'vuejs-auto-complete';
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  components: {
    Autocomplete,
  },
  data: () => ({
    logo: '/assets/images/Logo.png',
    sticky: true,
    labels: [],
  }),
  computed: {
    ...mapState({
      userId: (state) => String(state.id),
      token: (state) => state.token,
    }),
  },
  methods: {
    avatarView() {
      // eslint-disable-next-line no-console
      console.log('routing to avatar view');
    },
    Save(select) {
      this.$router
        .push({
          name: 'SearchFeed',
          params: {
            selected: select.value,
            otherProp: {
              selected: select.value,
              previous: 'TagsFeed',
            },
          },
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {});
    },
  },
};
</script>

<style>
.search {
  width: 70vw;
  margin-right: 2vw;
}

.search > input {
  background-image: url('http://www.clker.com/cliparts/z/1/T/u/9/2/search-icon-hi.png');
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: 20px;
  width: 70vw !important;
}
</style>
