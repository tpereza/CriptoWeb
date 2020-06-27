<template>
  <div class="container-fluid col-8 align-self-center background">
    <h1>Bienvenido a PinArt</h1>
    <br>
    <h3>¿ Cuáles son tus gustos ?</h3>
    <div class="cards-list">

      <div v-for="(label, idx) in dbLabels" class="card" :key="`label-${idx}`"
           :class="{card_selected: label.selected}" @click="setSelected(idx)">
        <div class="card_image">
          <img src="../assets/Logo.png" alt="">
        </div>
        <div class="card_title title-white">
          <p>{{label.name}}</p>
        </div>
      </div>
    </div>
    <br>
    <div class="col-md-4 text-center">
      <button type="button" class="btn btn-primary" @click="addUserLabels"> Agregar etiquetas
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserTags',
  data() {
    return {
      selected: true,
      dbLabels: null,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
      id: (state) => state.id,
    }),
  },
  methods: {
    getLabels() {
      this.$apollo.query({
        // eslint-disable-next-line global-require
        query: require('../graphql/getAllLabels.gql'),
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((data) => {
          this.dbLabels = data.data.getAllLabels.map((l) => {
            // eslint-disable-next-line no-param-reassign
            l.selected = false;
            return l;
          });
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    },
    addUserLabels() {
      const labels = this.dbLabels.filter((lab) => lab.selected)
        .map((lab) => lab.id);
      this.$apollo.mutate({
        // eslint-disable-next-line global-require
        mutation: require('../graphql/addLabelUser.gql'),
        variables: {
          idUser: this.id,
          idLabel: labels,
        },
        context: {
          headers: {
            Authorization: this.token,
          },
        },
      })
        .then((res) => {
          if (res.data.addLabelUser.id) {
            this.$router.push('TagsFeed');
          }
        });
    },
    setSelected(idx) {
      // eslint-disable-next-line no-console
      console.log(idx);
      this.dbLabels[idx].selected = !this.dbLabels[idx].selected;
      this.$forceUpdate();
    },
  },
  created() {
    this.getLabels();
  },
};
</script>

<style scoped>
  .cards-list {
    z-index: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .card {
    margin: 30px auto;
    width: 300px;
    height: 300px;
    border-radius: 40px;
    box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25), -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
    cursor: pointer;
    transition: 0.4s;
  }

  .card .card_image {
    width: inherit;
    height: inherit;
    border-radius: 40px;
  }

  .card .card_image img {
    width: inherit;
    height: inherit;
    border-radius: 40px;
    object-fit: cover;
  }

  .card .card_title {
    text-align: center;
    border-radius: 0px 0px 40px 40px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 30px;
    margin-top: -80px;
    height: 40px;
  }

  .card:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }

  .card_selected {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }

  .card_selected .card_image {
    border-color: #03DAC5;
    border-style: solid;
    border-width: medium;
  }

  .title-white {
    color: white;
  }

  .title-black {
    color: black;
  }

  @media all and (max-width: 500px) {
    .card-list {
      /* On small screens, we are no longer using row direction but column */
      flex-direction: column;
    }
  }


  /*
  .card {
    margin: 30px auto;
    width: 300px;
    height: 300px;
    border-radius: 40px;
    background-image: url('https://i.redd.it/b3esnz5ra34y.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-repeat: no-repeat;
  box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
    transition: 0.4s;
  }
  */
</style>
