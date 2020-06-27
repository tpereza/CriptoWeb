<template>
  <div>
    <div class="content-section introduction">
      <div class="feature-intro">
         <Profile :id="Number($route.params.id)" :isOther="isOther"/>
      </div>
    </div>
    <div class="content-section implementation">
      <TabMenu :model="items" />
        <router-view/>
    </div>

  </div>
</template>

<script>
import Profile from '@/components/Profile.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Profile,
  },
  props: {
    isOther: {
      type: Boolean,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.updateItems();
  },
  methods: {
    updateItems() {
      this.items = [
        {
          label: 'Multimedia',
          icon: 'pi pi-fw pi-image',
          to: '/profile/multimedia/'.concat(this.$route.params.id),
        },
        {
          label: 'Siguiendo',
          icon: 'pi pi-fw pi-camera',
          to: '/profile/siguiendo/'.concat(this.$route.params.id),
        },
        {
          label: 'Seguidores',
          icon: 'pi pi-fw pi-camera',
          to: '/profile/seguidores/'.concat(this.$route.params.id),
        },
      ];
    },

  },
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },
};
</script>
