<template>
    <div class="tabmenudemo-content">
        <AllFollowingByUser :id="Number($route.params.id)"
                            :isOther="isOther"/>
    </div>
</template>

<script>
import AllFollowingByUser from '@/components/AllFollowingByUser.vue';

export default {
  components: {
    AllFollowingByUser,
  },
  props: {
    isOther: {
      type: Boolean,
    },
  },
};
</script>
