<template>
  <div class="container-fluid col-5 align-self-center background">
    <b-card>
      <div class="mx-auto center">
        <h1>Bienvenido a Pinart</h1>
        <img alt="Vue logo" src="../assets/Logo.png"/>
        <h4>Inicia sesión para continuar</h4>
      </div>
      <ApolloMutation
        :mutation="require('../graphql/authenticateUser.gql')"
        :variables="{username, password, dispositivo}"
        @done="onLogin"
        v-if="loginForm"
      >
        <template v-slot="{ mutate, error }">
          <form v-on:submit.prevent="">
            <div class="form-group">
              <input v-model="username" class="form-control control" type="text" id="username"
                     placeholder="Username">
            </div>
            <div class="form-group">
              <input v-model="password" class="form-control control" type="password" id="password"
                     placeholder="Password">
            </div>
            <button @click="mutate()" class="btn btn-primary"> Log in</button>
            <button @click="setForm" class="btn btn-link"> Register</button>
          </form>
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
      <ApolloMutation
        :mutation="require('../graphql/registerUser.gql')"
        :variables="{firstName, lastName, username, password, correo}"
        @done="onRegister"
        v-else
      >
        <template v-slot="{ mutate, error }">
          <form v-on:submit.prevent="">
            <div class="form-group">
              <input v-model="firstName" class="form-control control" type="text" id="r-firstName"
                     placeholder="First name">
            </div>
            <div class="form-group">
              <input v-model="lastName" class="form-control control" type="text" id="r-lastName"
                     placeholder="Last name">
            </div>
            <div class="form-group">
              <input v-model="correo" class="form-control control" type="email" id="r-mail"
                     placeholder="Mail">
            </div>
            <div class="form-group">
              <input v-model="username" class="form-control control" type="text" id="r-username"
                     placeholder="Username">
            </div>
            <div class="form-group">
              <input v-model="password" class="form-control control" type="password" id="r-password"
                     placeholder="Create a password">
            </div>
            <button @click="mutate()" class="btn btn-primary"> Register</button>
            <button @click="setForm" class="btn btn-link"> log in</button>
          </form>
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      correo: null,
      dispositivo: 'pc',
      loginForm: true,
    };
  },
  methods: {
    ...mapActions({
      login: constants.SESSION_LOGIN,
      setForm() {
        this.clearForm();
        this.loginForm = !this.loginForm;
      },
      clearForm() {
        this.username = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.correo = null;
      },
    }),
    onLogin(data) {
      if (data.data.authenticateUser.token) {
        this.login(data.data.authenticateUser);
      }
      this.clearForm();
      this.$router.push('TagFeed');
    },
    onRegister(data) {
      if (data.data.registerUser.id === 0) {
        this.loginBackground();
        this.setForm();
        this.clearForm();
      } else {
        // eslint-disable-next-line no-alert
        alert('Ha ocurrido un error en el registro');
      }
    },
    loginBackground() {
      this.$apollo.mutate({
        // eslint-disable-next-line global-require
        mutation: require('../graphql/authenticateUser.gql'),
        variables: {
          username: this.username,
          password: this.password,
          dispositivo: this.dispositivo,
        },
      })
        .then((data) => this.onLogin(data));
    },
  },
};
</script>
<style scoped>
  .center {
    display: block;
    margin-bottom: 5%;
  }

  .control {
    width: 50%;
  }

  .background {
    margin-top: 3%;
    margin-bottom: 10%;
  }
</style>
