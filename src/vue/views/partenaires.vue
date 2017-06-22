<template>
  <div class="home">
    <template v-for="section in sections">
      <h2>{{ section.titre }}</h2>
      <p>{{ section.text }}</p>
      <img v-for="url in section.logos"
            class="logo"
            :src="url">
    </template>
  </div>
</template>
<script>
  export default {
    computed: {
      sections () {
        return this.$store.getters.getSection('partenaires');
      }
    },
    methods: {
      style (url) {
        return {
          'background': `url(${url})`
        };
      }
    },
    store: global.store
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .home
    width: 100%
    text-align: justify
    h2
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
