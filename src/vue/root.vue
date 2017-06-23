<template>
  <div class="root">
    <section id="view-container">
      <component :is="view">
      </component>
    </section>
    <popup :open="introPopup">
      <div slot="body"
           class="intro-popup">
        <p>{{ textIntroPopup }}</p>
        <v-touch tag="div" class="hide-popup"
                @tap="session.hidePopup = !session.hidePopup">
          <div class="checkbox"
               :checked="session.hidePopup">
          </div>
          <label>Ne plus afficher cette boîte de dialogue</label>
        </v-touch>
        <v-touch tag="button" class="button"
                @tap="introPopup = false">
          Compris
        </v-touch>
      </div>
    </popup>
    <slide-menu @view="(v) => view = v"></slide-menu>
  </div>
</template>
<script>
  import SlideMenu from './slide-menu.vue';
  import Popup from './popup.vue';
  import accueil from './views/accueil.vue';
  import informations from './views/informations.vue';
  import carte from './views/carte.vue';
  import partenaires from './views/partenaires.vue';
  export default {
    data () {
      return {
        view: 'accueil',
        introPopup: true,
        session: {
          hidePopup: false
        }
      };
    },
    computed: {
      textIntroPopup () {
        return this.$store.getters.getIntroPopup;
      }
    },
    components: {
      'slide-menu': SlideMenu,
      'popup': Popup,
      accueil,
      informations,
      carte,
      partenaires
    },
    watch: {
      session: {
        deep: true,
        handler (session) {
          localStorage['session'] = JSON.stringify(session);
        }
      }
    },
    store: global.store,
    mounted () {
      // To fix the damn scrolling on iOS
      const viewContainer = document.getElementById('view-container');
      let _clientY = null;
      viewContainer.addEventListener('touchstart', (event) => {
        if (event.targetTouches.length === 1) {
          _clientY = event.targetTouches[0].clientY;
        }
      }, false);
      viewContainer.addEventListener('touchmove', (event) => {
        if (event.targetTouches.length === 1) {
          const clientY = event.targetTouches[0].clientY - _clientY;
          if (viewContainer.scrollTop === 0 && clientY > 0) {
            event.preventDefault();
          }
          if (viewContainer.scrollHeight - viewContainer.scrollTop <= viewContainer.clientHeight && clientY < 0) {
            event.preventDefault();
          }
        }
      }, false);
      // Get session
      if (localStorage['session']) {
        this.session = JSON.parse(localStorage['session']);
        if (this.session.hidePopup) {
          this.introPopup = false;
        }
      }
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
  height: 100%
  width: 100%
  overflow: hidden
  background: $background-base
  color: $text-default
  font-size: $default-text-size
  font-family: DefaultFont, sans-serif
  section
    position: fixed
    top: 0
    left: 50%
    transform: translateX(-50%)
    height: 100%
    display: block
    width: 100%
    overflow-y: auto
    -webkit-overflow-scrolling: touch
    > *
      padding-bottom: 75px
  .intro-popup
    color: $text-default
    font-family: DefaultFont, sans-serif
    p
      padding: 0 20px
      text-align: justify
    .hide-popup
      padding: 3px 0
      position: absolute
      bottom: 75px
      width: 80%
      max-width: 250px
      left: 50%
      transform: translateX(-50%)
      label
        display: inline-block
        max-width: 80%
        text-align: left
        float: left
        vertical-align: top
      .checkbox
        display: inline-block
        width: 15px
        height: 15px
        border: 1px solid $text-default
        border-radius: 4px
        float: left
        margin: 5px 15px 5px 5px
        background: $background-base
        @include using-transition(background)
        &:after
          content: 'x'
          color: $text-on-theme
          font-family: BoldFont
          position: absolute
          width: 100%
          font-size: 15px
          line-height: 13px
          text-align: center
          opacity: 0
          @include using-transition(opacity)
        &[checked]
          position: relative
          background: $background-theme
          &:after
            opacity: 1
    button
      position: absolute
      bottom: 15px
      left: 50%
      transform: translateX(-50%)
      font-family: DefaultFont, sans-serif
      font-size: 20px
      color: $text-on-theme
      width: 80%
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
