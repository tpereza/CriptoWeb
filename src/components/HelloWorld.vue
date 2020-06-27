<template>
  <div class="hello">
    <!--    <div v-for="label in getAllLabels" :key="label.id">
      {{label.name}}
    </div>-->
    <ApolloMutation
      :mutation="require('../graphql/authenticateUser.gql')"
      :variables="{username, password, dispositivo}"
      @done="login"
    >
      <template v-slot="{ mutate, error }">
        <form v-on:submit.prevent="mutate()">
          <label for="username">User Name</label>
          <input v-model="username" type="text" id="username" />
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" />
          <button @click="mutate()">Log in</button>
        </form>
        <p v-if="error">An error occurred: {{ error }}</p>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      username: 'john',
      password: 'doe',
      dispositivo: 'pc',
    };
  },
  methods: {
    login() {
      // eslint-disable-next-line no-console
      console.log('done mutation');
    },
  },
};
</script>
