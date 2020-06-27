<template>
    <div class="tabmenudemo-content">
        <MultimediaByUser :id="Number($route.params.id)"
                          :isOther="isOther"
                          :key="componentKey"
                          @updated="forceRerender"/>
    </div>
</template>

<script>
import MultimediaByUser from '@/components/MultimediaByUser.vue';

export default {
  components: {
    MultimediaByUser,
  },
  props: {
    isOther: {
      type: Boolean,
    },
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
