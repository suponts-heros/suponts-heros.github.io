<template>
  <div class="popup"
       :open="open">
    <div class="black-veil" :id="idBlackVeil">
    </div>
    <div class="content" :id="id">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id: `popup-${Math.round(Math.random() * 100000)}`,
        idBlackVeil: `black-veil-popup-${Math.round(Math.random() * 100000)}`
      };
    },
    props: {
      open: {
        type: Boolean,
        required: true
      }
    },
    mounted () {
      // To fix the damn scrolling on iOS
      const content = document.getElementById(this.id);
      const blackVeil = document.getElementById(this.idBlackVeil);
      blackVeil.addEventListener('touchmove', (event) => {
        if (event.targetTouches.length === 1) event.preventDefault();
      }, false);
      content.addEventListener('touchmove', (event) => {
        if (event.targetTouches.length === 1) event.preventDefault();
      }, false);
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../sass/general'
  .popup
    z-index: 100
    position: fixed
    width: 100%
    height: 100%
    overflow: hidden
    pointer-events: none
    &[open]
      pointer-events: auto
      .black-veil
        opacity: 1
        pointer-events: auto
      .content
        transform: translate(-50%, -50%) scale(1)
        opacity: 1
    .black-veil
      width: 100%
      height: 100%
      opacity: 0
      pointer-events: none
      overflow: hidden
      @include using-transition(opacity)
      background-color: $black-veil
    .content
      position: absolute
      width: 90vw
      overflow: hidden
      max-width: 600px;
      max-height: 90vh;
      padding-bottom: 150px;
      top: 50%
      left: 50%
      background: $background-base
      border-radius: 4px
      color: $text-on-theme
      opacity: 0
      transform: translate(-50%, -50%) scale(0.8)
      @include using-transition(all)
</style>
