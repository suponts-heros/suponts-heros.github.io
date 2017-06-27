<template>
  <v-touch tag="div"
           @swipeleft="switchPage(pages[1] || '')"
           @swiperight="switchPage(pages[0])"
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
    <div class="item" :show="itemSelected">
      <header><v-touch tag="div" class="go-back" @tap="itemSelected = false"></v-touch>
        {{ (page !== '') ? `${selectedSport.nom} - ${page}` : selectedSport.nom }}
      </header>
      <scroll-body class="page left"  :show="page === pages[0]">
        <div class="body" slot="content">
          <p class="format" v-html="description(page)"></p>
          <div class="where-and-when">
            <v-touch tag="div" class="heure" @tap="showOnPlanning">
              <p class="date"><i class="icon"></i><span class="text">{{ date(page) }}</span></p>
            </v-touch>
            <v-touch tag="div" class="emplacement" @tap="showOnMap">
              <p class="place"><i class="icon"></i><span class="text">{{ place }}</span></p>
          </v-touch>
          </div>
          <h3>Résultats</h3>
          <div class="results">
            <div class="ponts">
              <div class="icon"></div>
              <div class="score">{{ score(page).ponts }}</div>
            </div>
            <div class="supaero">
              <div class="score">{{ score(page).supaero }}</div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </scroll-body>
      <scroll-body class="page right" :show="page === pages[1]">
        <div class="body" slot="content">
          <p class="format" v-html="description(pages[1] || '')"></p>
          <div class="where-and-when">
            <v-touch tag="div" class="heure" @tap="showOnPlanning">
              <p class="date"><i class="icon"></i><span class="text">{{ date(pages[1] || '') }}</span></p>
            </v-touch>
            <v-touch tag="div" class="emplacement" @tap="showOnMap">
              <p class="place"><i class="icon"></i><span class="text">{{ place }}</span></p>
          </v-touch>
          </div>
          <h3>Résultats</h3>
          <div class="results">
            <div class="ponts">
              <div class="icon"></div>
              <div class="score">{{ score(pages[1] || '').ponts }}</div>
            </div>
            <div class="supaero">
              <div class="score">{{ score(pages[1] || '').supaero }}</div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </scroll-body>
      <selector :values="pages"
                class="selector"
                :value="page"
                v-if="showSelector"
                @value="switchPage">
      </selector>
    </div>
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
        page: ''
      };
    },
    computed: {
      planning () {
        return this.$store.getters.getSection('planning') || {};
      },
      sports () {
        return this.$store.getters.getSection('sports') || [];
      },
      format () {
        return this.selectedSport['format'] || {};
      },
      pages () {
        if (this.format.hasOwnProperty('description') && this.format.hasOwnProperty('score')) {
          return [''];
        } else {
          return Object.keys(this.format);
        }
      },
      place () {
        if (this.selectedSport['lieu']) {
          return this.selectedSport['lieu'].charAt(0).toUpperCase() + this.selectedSport['lieu'].slice(1);
        }
        return '';
      },
      showSelector () {
        return this.pages.length > 1;
      }
    },
    methods: {
      description (page) {
        if (this.format.hasOwnProperty('description')) {
          return this.format['description'];
        } else if (Object.keys(this.format).length === 0) {
          return '';
        } else {
          return this.format[page]['description'];
        }
      },
      score (page) {
        if (this.format.hasOwnProperty('score')) {
          return this.format['score'];
        } else if (Object.keys(this.format).length === 0) {
          return {};
        } else {
          return this.format[page]['score'];
        }
      },
      date (page) {
        let date = '';
        let nounToLookFor = this.selectedSport['nom'];
        if (page !== '') {
          nounToLookFor += `-${page}`;
        }
        for (const day in this.planning) {
          if (this.planning.hasOwnProperty(day)) {
            const plan = this.planning[day].find((e) => {
              if (e['sports']) {
                return e['sports'].includes(nounToLookFor);
              }
              return null;
            });
            if (plan) date = `${day} - ${plan['heure']}`;
          }
        }
        return date.charAt(0).toUpperCase() + date.slice(1);
      },
      showSport (sport) {
        this.itemSelected = true;
        if (sport['format'].hasOwnProperty('description')) {
          this.page = '';
        } else if (this.page === '') {
          this.page = Object.keys(sport['format'])[0];
        }
        this.selectedSport = sport;
      },
      switchPage (page) {
        this.page = page;
      },
      showOnMap () {
        setTimeout(() => {
          this.$emit('show', this.place.toLowerCase());
        }, 100);
      },
      showOnPlanning () {
        setTimeout(() => {
          this.$emit('plan', this.date(this.page).toLowerCase());
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
    .menu .body
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
      width: 100%
      left: 50%
      top: 0
      transform: translate(-50%, 100%)
      @include using-transition(transform)
      background: $background-base
      &[show]
        transform: translate(-50%, 0)
      .page
        position: fixed
        width: calc(100% - 30px)
        height: 100%
        left: 50%
        @include using-transition(transform)
        &.left
          transform: translateX(-150vw)
          &[show]
            transform: translateX(-50%)
        &.right
          transform: translateX(150vw)
          &[show]
            transform: translateX(-50%)
      header
        position: relative
        pointer-events: none
        padding: 15px 0
        text-align: center
        color: $text-title
        font-size: $title-text-size
        text-transform: capitalize
        border-radius: 15px
        .go-back
          position: absolute
          pointer-events: auto
          left: 0
          top: 50%
          transform: translateY(-50%)
          width: 70px
          height: 70px
          background: url('../../img/close.svg') center no-repeat
          background-size: 50%
      .scroll-body
        .body
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
        .results
          position: relative
          margin-bottom: 170px
          width: 100%
          text-align: center
          &:after
            content: '-'
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
          > div
            margin: 0 5px
            display: inline-block
            > div
              margin: 0 5px
              &.icon
                width: 70px
                height: 70px
                display: inline-block
                vertical-align: middle
              &.score
                font-size: 30px
                display: inline-block
                vertical-align: middle
            &.ponts .icon
              background: url(../../img/ponts.svg) center no-repeat
              background-size: 100%
            &.supaero .icon
              background: url(../../img/supaero.svg) center no-repeat
              background-size: 100%
</style>
