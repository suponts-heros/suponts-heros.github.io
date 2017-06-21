<template>
  <div class="slide-menu"
       :opened="open">
    <div class="black-veil"
         @click="open=false">
    </div>
    <div class="content">
      <div class="toggle"
           @click="open=!open">
      </div>
      <div class="item" v-for="item in items"
           @click="selectItem(item)">
        <div :class="`icon ${ item.class }`"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        open: false,
        items: [
          { 'title': 'Accueil', 'class': 'home' },
          { 'title': 'Informations', 'class': 'info' }
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
    &[opened]
      pointer-events: auto
      .black-veil
        opacity: 1
      .content
        transform: none
        .toggle
          background: url(../img/chevron-down.svg) no-repeat center
          background-size: 50%
          background-color: inherit
    .black-veil
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
      &:before
        content: ''
        position: absolute
        top: 0
        left: 0
        height: 80px
        width: 100%
        border-radius: 50%
        background-color: inherit
        transform: translateY(-50%)
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
        background: url(../img/menu.svg) no-repeat center
        background-size: 50%
        background-color: inherit
        pointer-events: auto
      > .item
        margin: 15px
        display: inline-block
        position: relative;
        color: $text-on-theme
        font-size: 15px
        .icon
          width: 70px
          height: 70px
        > .home.icon
          background: url(../img/home.svg) center no-repeat
          background-size: 80%
        > .info.icon
              background: url(../img/info.svg) center no-repeat
              background-size: 80%
</style>
