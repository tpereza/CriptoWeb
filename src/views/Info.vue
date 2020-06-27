<template>
  <div class="home">
    <ImageInfo
      :image="otherProp.image"
      :creatorId="Number(otherProp.image.usuario_creador_id)"
      :previous="otherProp.previous"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ImageInfo from '@/components/ImageInfo.vue';

export default {
  name: 'Home',
  components: {
    ImageInfo,
  },
  props: {
    otherProp: {
      type: Object,
      required: true,
    },
  },
};
</script>
