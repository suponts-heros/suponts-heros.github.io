<template>
  <scroll-body class="partenaires">
    <div class="body" slot="content">
      <template v-for="section in sponsors">
        <h2>{{ section.titre }}</h2>
        <p>{{ section.texte }}</p>
        <img v-for="url in section.logos"
              class="logo"
              :src="url">
      </template>
        <h2>{{ as.titre }}</h2>
        <p>{{ as.texte }}</p>
        <img class="logo" :src="require('../../img/logo-as-2017.png')">
    </div>
  </scroll-body>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  export default {
    computed: {
      partenaires () {
        return this.$store.getters.getSection('partenaires');
      },
      sponsors () {
        return this.partenaires['les sponsors'] || [];
      },
      as () {
        return this.partenaires['l\'AS'] || {};
      }
    },
    methods: {
      style (url) {
        return {
          'background': `url(${url})`
        };
      }
    },
    store: global.store,
    components: {
      'scroll-body': ScrollBody
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .partenaires
    font-size: $default-text-size
    .body h2
      text-align: center
      color: $text-title
      font-size: $title-text-size
      margin-top: 30px
      &:first-child
        margin-top: 15px
  .logo
    display: block
    width: 80vw
    max-width: 250px
    margin: 30px auto
</style>
