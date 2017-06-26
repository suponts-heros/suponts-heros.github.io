<template>
  <v-touch tag="div"
           @swipeleft="goRight"
           @swiperight="goLeft"
            class="sports">
    <scroll-body class="menu" :show="!itemSelected">
      <div class="body" slot="content">
        <v-touch tag="div"
                 class="sport"
                 v-for="sport in sports"
                 :key="sport"
                 @tap="showSport(sport)">
          <div class="icon" :icon="sport.nom"></div>
          <div class="text">{{ sport.nom }}</div>
        </v-touch>
      </div>
    </scroll-body>
    <scroll-body class="item" :show="itemSelected">
      <div class="body" slot="content">
        <v-touch tag="div" class="go-back" @tap="itemSelected = false"></v-touch>
        <h2>{{ (selection !== '') ? `${selectedSport.nom} - ${selection}` : selectedSport.nom }}</h2>
        <p class="format" v-html="determineFormat"></p>
        <div class="where-and-when">
          <v-touch tag="div" class="heure" @tap="plan">
            <p class="date"><i class="icon"></i><span class="text">{{ determineDate }}</span></p>
          </v-touch>
          <v-touch tag="div" class="emplacement" @tap="show">
            <p class="place"><i class="icon"></i><span class="text">{{ determinePlace }}</span></p>
        </v-touch>
        </div>
        <h3>Résultats</h3>
        <div class="results">
          <div class="ponts">
            <div class="icon"></div>
            <div class="score">{{ determineResults.ponts }}</div>
          </div>
          <div class="supaero">
            <div class="icon"></div>
            <div class="score">{{ determineResults.supaero }}</div>
          </div>
        </div>
      </div>
    </scroll-body>
    <selector :values="determineSelector"
              class="selector"
              :show="itemSelected"
              :value="selection"
              @value="(v) => selected = v">
    </selector>
  </v-touch>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  import Selector from '../utils/selector.vue';
  export default {
    data () {
      return {
        itemSelected: false,
        selectedSport: {},
        selected: ''
      };
    },
    computed: {
      planning () {
        return this.$store.getters.getSection('planning') || {};
      },
      determineDate () {
        let date = '';
        let nounToLookFor = this.selectedSport.nom;
        if (this.selectedSport['femmes'] && this.selectedSport['hommes']) {
          nounToLookFor += `-${this.selection}`;
        }
        for (const day in this.planning) {
          if (this.planning.hasOwnProperty(day)) {
            const plan = this.planning[day].find((e) => {
              if (e['sports']) {
                return e['sports'].includes(nounToLookFor);
              }
              return null;
            });
            if (plan) date = `${day} - ${plan.heure}`;
          }
        }
        return date.charAt(0).toUpperCase() + date.slice(1);
      },
      determinePlace () {
        if (this.selectedSport.lieu) {
          return this.selectedSport.lieu.charAt(0).toUpperCase() + this.selectedSport.lieu.slice(1);
        }
        return '';
      },
      sports () {
        return this.$store.getters.getSection('sports') || [];
      },
      determineSelector () {
        if (this.selectedSport['femmes'] && this.selectedSport['hommes']) {
          return ['femmes', 'hommes'];
        } else {
          this.selection = '';
          return [];
        }
      },
      determineFormat () {
        if (this.selectedSport['hommes'] && this.selectedSport['femmes']) {
          return this.selectedSport[this.selection]['format'];
        } else {
          return this.selectedSport['format'];
        }
      },
      determineResults () {
        if (this.selectedSport['hommes'] && this.selectedSport['femmes']) {
          return this.selectedSport[this.selection]['score'] || {};
        } else {
          return this.selectedSport['score'] || {};
        }
      },
      selection () {
        return (this.determineSelector.includes(this.selected)) ? this.selected
          : (this.determineSelector.length) ? this.determineSelector[0]
            : '';
      }
    },
    methods: {
      showSport (sport) {
        this.itemSelected = true;
        this.selectedSport = sport;
      },
      goLeft () {
        const index = this.determineSelector.indexOf(this.selection);
        if (index > 0) {
          this.selected = this.determineSelector[index - 1];
        }
      },
      goRight () {
        const index = this.determineSelector.indexOf(this.selection);
        if (index < this.determineSelector.length - 1) {
          this.selected = this.determineSelector[index + 1];
        }
      },
      show () {
        setTimeout(() => {
          this.$emit('show', this.determinePlace.toLowerCase());
        }, 100);
      },
      plan () {
        setTimeout(() => {
          this.$emit('plan', this.determineDate.toLowerCase());
        }, 100);
      }
    },
    store: global.store,
    components: {
      'scroll-body': ScrollBody,
      'selector': Selector
    }
  };
</script>
<style lang="sass" type="text/sass" rel="stylesheet/sass" scoped>
  $existing-icons: volley basket foot tennis natation waterpolo handball petanque rugby escalade pompoms aviron
  @import '../../sass/general'
  .sports
    position: fixed
    top: 10px
    left: 50%
    transform: translateX(-50%)
    height: calc(100% - 10px)
    overflow: hidden
    display: block
    width: 100%
    .menu
      position: fixed
      width: calc(100% - 30px)
      height: 100%
      left: 50%
      transform: translateX(-150vw)
      @include using-transition(transform)
      &[show]
        transform: translateX(-50%)
      .body
        text-align: center
        .sport
          margin: 20px 15px
          text-align: center
          display: inline-block
          position: relative
          color: $text-default
          font-size: 15px
          min-width: 60px
          min-height: 60px
          .text
            text-transform: capitalize
          .icon
            width: 50px
            height: 50px
            display: inline-block
            @each $icon in $existing-icons
              &[icon='#{$icon}']
                background: url('../../img/#{$icon}.svg') center no-repeat
                background-size: 100%
    .item
      position: fixed
      height: 100%
      width: calc(100% - 30px)
      transform: translateX(150vw)
      left: 50%
      @include using-transition(transform)
      &[show]
        transform: translateX(-50%)
      .go-back
        position: absolute
        top: -5px
        left: 0
        width: 70px
        height: 70px
        background: url('../../img/back-arrow.svg') center no-repeat
        background-size: 50%
      .where-and-when
        .heure, .emplacement
          display: block
          vertical-align: top
          white-space: nowrap
          .place, .date
            .text
              font-size: 20px
              display: inline-block
            .icon
              width: 40px
              height: 40px
              display: inline-block
              vertical-align: middle
              margin-right: 10px
          .place .icon
            background: url('../../img/show-location.svg') center no-repeat
            background-size: 100%
          .date .icon
            background: url('../../img/show-planning.svg') center no-repeat
            background-size: 100%
      .format
        font-size: 17px
      h3
        text-align: center
      h2
        text-align: center
        color: $text-title
        font-size: $title-text-size
        text-transform: capitalize
      .results
        margin-bottom: 100px
        width: 100%
        text-align: center
        > div
          display: inline-block
          .icon
            width: 100px
            height: 100px
          .score
            font-size: 30px
          &.ponts .icon
            background: url(../../img/ponts.svg) center no-repeat
            background-size: 80%
          &.supaero .icon
            background: url(../../img/supaero.svg) center no-repeat
            background-size: 80%
    .selector
      transform: translateX(100vw)
      @include using-transition(transform)
      &[show]
        transform: translateX(0)
</style>
