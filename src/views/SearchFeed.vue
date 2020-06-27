<template>
  <div class="home">
    <SearchImages :tagId="String(otherProp.selected)" :previous="otherProp.previous" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchImages from '@/components/SearchImages.vue';

export default {
  name: 'SearchFeed',
  components: {
    SearchImages,
  },
  props: {
    otherProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      labels: [],
    };
  },
};
</script>
