<template>
  <div class="home">
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
</template>
<script>
  export default {
    data () {
      return {
        news: `On vous attend nombreux pour cette éditions 2017 avec de l’ambiance, du son, de la bonne bouffe,
          du sport (mais pas trop hein), et pleins d’évènements préparés en douce par l’AS pour ravir vos yeux et
          papilles. Rendez vous les 7 et 8 Octobre sur le campus de l’ISAE - Supaéro pour en savoir plus. A bientôt !`,
        results: {
          supaero: 0,
          ponts: 0
        }
      };
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .home
    width: 100%
    text-align: justify
    h2
      text-align: center
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
