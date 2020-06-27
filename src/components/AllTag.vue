<template>
  <div id="all-tag">
    <div class="container">
      <ApolloQuery
        :query="require('../graphql/getAllLabels.gql')"
        :context="{ headers : {Authorization : token}}"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <div
            v-if="data"
            class="result apollo"
            style="display: none"
          >{{ label = data.getAllLabels }}
          </div>
        </template>
      </ApolloQuery>
      <MultiSelect v-model="selectedLabels" :options="label" :filter="true"
                   optionLabel="name" placeholder="Seleccion Etiquetas"/>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'All-tag',
  components: {},
  data: () => ({
    selectedLabels: [],
    label: [],
  }),
  computed: {
    ...mapState({
      id: (state) => state.id,
      token: (state) => state.token,
    }),
  },
};
</script>
