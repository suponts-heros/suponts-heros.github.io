<template>
  <scroll-body class="sports">
    <div class="body" slot="content">

    </div>
  </scroll-body>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  export default {
    data () {
      return {};
    },
    store: global.store,
    components: {
      'scroll-body': ScrollBody
    }
  };
</script>
<style lang="sass" type="text/sass" rel="stylesheet/sass" scoped>
  .sports
</style>
