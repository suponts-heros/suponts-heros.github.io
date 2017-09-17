<template>
  <v-touch tag="div"  class="slide-menu"
       :opened="open"
       @swipedown="open=false">
    <v-touch tag="div" class="black-veil"
         @tap="open=false">
    </v-touch>
    <div class="content">
      <v-touch tag="div" class="curve" @tap="open=!open"></v-touch>
      <v-touch tag="div" class="toggle"
           @tap="open=!open">
        <i class="closed"></i>
        <i class="opened"></i>
      </v-touch>
      <v-touch tag="div"
               class="item"
               v-for="item in items"
               :key="item.class"
               @tap="selectItem(item)">
        <div :class="`icon ${ item.class }`"></div>
        <div class="title">{{ item.title }}</div>
      </v-touch>
    </div>
  </v-touch>
</template>
<script>
  export default {
    data () {
      return {
        open: false,
        items: [
          { 'title': 'Accueil', 'class': 'accueil' },
          { 'title': 'Informations', 'class': 'informations' },
          { 'title': 'Planning', 'class': 'planning' },
          { 'title': 'Sports', 'class': 'sports' },
          { 'title': 'Carte', 'class': 'carte' },
          { 'title': 'Partenaires', 'class': 'partenaires' }
        ]
      };
    },
    methods: {
      selectItem (item) {
        this.open = false;
        this.$emit('view', item.class);
      }
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../sass/general'
  .slide-menu
    z-index: 99
    position: fixed
    width: 100%
    height: 100%
    pointer-events: none
    overflow: hidden
    &[opened]
      .black-veil
        opacity: 1
        pointer-events: auto
      .content
        transform: none
        .toggle
          i.closed
            opacity: 1
          i.opened
            opacity: 0
    .black-veil
      position: fixed
      pointer-events: none
      overflow: hidden
      width: 100%
      height: 100%
      opacity: 0
      @include using-transition(opacity)
      background-color: $black-veil
    .content
      position: absolute
      width: 100%
      bottom: 0
      text-align: center
      background-color: $background-theme
      color: $text-on-theme
      font-family: DefaultFont
      transform: translateY(100%)
      @include using-transition(transform)
      pointer-events: auto
      .curve
        position: absolute
        top: 0
        left: 0
        height: 80px
        width: 100%
        transform: translateY(-50%)
        pointer-events: none
        touch-action: auto !important
        &:before
          content: ''
          position: absolute
          left: 0
          top: 0
          height: 80px
          width: 100%
          border-radius: 50%
          background-color: $background-theme
      .toggle
        position: absolute
        top: 0
        left: 50%
        transform: translateX(-50%)
        margin-top: -60px
        width: 40px
        height: 40px
        border-radius: 50%
        border: 1px solid $border-default-color
        background-color: inherit
        i
          position: absolute
          display: block
          width: 100%
          height: 100%
          @include using-transition(opacity)
          &.closed
            opacity: 0
            background: url(../img/chevron-down.svg) no-repeat center
            background-size: 50%
          &.opened
            opacity: 1
            @include using-transition(opacity)
            background: url(../img/menu.svg) no-repeat center
            background-size: 50%

      > .item
        margin: 15px
        text-align: center
        display: inline-block
        position: relative
        color: $text-on-theme
        font-size: 17px
        min-width: 90px
        min-height: 90px
        .icon
          width: 50px
          height: 50px
          display: inline-block
          &.accueil
            background: url(../img/home.svg) center no-repeat
            background-size: 100%
          &.informations
            background: url(../img/info.svg) center no-repeat
            background-size: 100%
          &.carte
            background: url(../img/map.svg) center no-repeat
            background-size: 100%
          &.partenaires
            background: url(../img/sponsors.svg) center no-repeat
            background-size: 100%
          &.planning
            background: url(../img/planning.svg) center no-repeat
            background-size: 100%
          &.sports
            background: url(../img/sports.svg) center no-repeat
            background-size: 100%
</style>
