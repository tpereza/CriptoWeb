<template>
  <div class="tabmenudemo-content">
<!--    <AllFollowerByUser :id= id />-->

    <AllFollowerByUser :id="Number($route.params.id)"
                       :isOther="isOther"/>

  </div>
</template>

<script>
import AllFollowerByUser from '@/components/AllFollowerByUser.vue';

export default {
  components: {
    AllFollowerByUser,
  },
  props: {
    isOther: {
      type: Boolean,
    },
  },
};
</script>
