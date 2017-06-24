<template>
  <scroll-body class="accueil">
    <div class="body" slot="content">
      <h2>News</h2>
      <p>{{ news }}</p>
      <h2>Résultats</h2>
      <div class="results">
        <div class="ponts">
          <div class="icon"></div>
          <div class="score">{{ results.ponts }}</div>
        </div>
        <div class="supaero">
          <div class="icon"></div>
          <div class="score">{{ results.supaero }}</div>
        </div>
      </div>
    </div>
  </scroll-body>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  export default {
    computed: {
      news () {
        return this.$store.getters.getSection('accueil')['news'] || '';
      },
      results () {
        return this.$store.getters.getSection('accueil')['resultats'] || { ponts: 0, supaero: 0 };
      }
    },
    components: {
      'scroll-body': ScrollBody
    },
    store: global.store
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .accueil
    h2
      text-align: center
      color: $text-title
      font-size: $title-text-size
    .results
      width: 100%
      text-align: center
      > div
        display: inline-block
        margin: 0 15px
        .icon
          width: 100px
          height: 100px
        .score
          font-size: $title-text-size
        &.ponts .icon
            background: url(../../img/ponts.svg) center no-repeat
            background-size: 80%
        &.supaero .icon
            background: url(../../img/supaero.svg) center no-repeat
            background-size: 80%

</style>
