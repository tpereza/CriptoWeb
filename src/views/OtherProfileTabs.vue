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
  beforeUpdate() {
    this.updateItems();
  },
  methods: {
    updateItems() {
      this.items = [
        {
          label: 'Multimedia',
          icon: 'pi pi-fw pi-image',
          to: '/otherprofile/multimedia/'.concat(this.$route.params.id),
        },
        {
          label: 'Siguiendo',
          icon: 'pi pi-fw pi-camera',
          to: '/otherprofile/siguiendo/'.concat(this.$route.params.id),
        },
        {
          label: 'Seguidores',
          icon: 'pi pi-fw pi-camera',
          to: '/otherprofile/seguidores/'.concat(this.$route.params.id),
        },
      ];
    },

  },
};

</script>
