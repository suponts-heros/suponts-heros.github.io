<template>
  <div class="root">
    <section>
      <component :is="view"
                 @plan="showDate"
                 @show="showLocation"
                 :specific-open="specificOpen">
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
    <v-menu @view="changeView"></v-menu>
  </div>
</template>
<script>
  import Menu from './menu.vue';
  import Popup from './utils/popup.vue';
  import accueil from './views/accueil.vue';
  import informations from './views/informations.vue';
  import carte from './views/carte.vue';
  import partenaires from './views/partenaires.vue';
  import planning from './views/planning.vue';
  import sports from './views/sports.vue';
  export default {
    data () {
      return {
        view: 'accueil',
        introPopup: true,
        specificOpen: '',
        session: {
          hidePopup: false
        }
      };
    },
    methods: {
      changeView (newView) {
        this.view = newView;
        this.specificOpen = '';
      },
      showLocation (name) {
        this.changeView('carte');
        this.specificOpen = name;
      },
      showDate (name) {
        this.changeView('planning');
        this.specificOpen = name;
      }
    },
    computed: {
      textIntroPopup () {
        return this.$store.getters.getIntroPopup;
      }
    },
    components: {
      'v-menu': Menu,
      'popup': Popup,
      accueil,
      informations,
      carte,
      partenaires,
      planning,
      sports
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
