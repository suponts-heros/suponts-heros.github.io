<template>
  <div class="root">
    <section>
      <component :is="view">
      </component>
    </section>
    <popup :open="introPopup">
      <div slot="body"
           class="intro-popup">
        <button class="button"
                @click="introPopup = false">
          Compris
        </button>
      </div>
    </popup>
    <slide-menu @view="(v) => view = v"></slide-menu>
  </div>
</template>
<script>
  import SlideMenu from './slide-menu.vue';
  import Popup from './popup.vue';
  import home from './views/home.vue';
  import info from './views/info.vue';
  export default {
    data () {
      return {
        introPopup: false,
        view: 'home'
      };
    },
    components: {
      'slide-menu': SlideMenu,
      'popup': Popup,
      'home': home,
      'info': info
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
@import '../sass/general'
@font-face
  src: url(../fonts/OpenSans-Light.ttf)
  font-family: DefaultFont
@font-face
  src: url(../fonts/OpenSans-Semibold.ttf)
  font-family: BoldFont
.root
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100vw
  overflow: hidden
  background: $background-base
  color: $text-default
  font-size: $default-text-size
  section
    position: absolute
    top: 0
    left: 50%
    transform: translateX(-50%)
    height: 100vh
    width: calc(100% - 30px)
    display: block
    padding: 0 15px
    max-width: $max-width
    overflow-y: auto
    font-family: DefaultFont, sans-serif
    > *
      padding-bottom: 75px
  .intro-popup
    button
      position: absolute
      bottom: 15px
      left: 50%
      transform: translateX(-50%)
      font-family: DefaultFont
      font-size: 20px
      color: $text-on-theme
      width: 80vw
      max-width: 250px
      border: 1px solid $border-default-color
      border-radius: 4px
      background: $button-theme
      padding: 7px 0
      display: block
      user-select: none
      outline: none
      cursor: pointer
      &:active
        box-shadow: inset 1px 1px 10px #676767
</style>
