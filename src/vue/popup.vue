<template>
  <div class="popup"
       :opened="open">
    <div class="black-veil">
    </div>
    <div class="content">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      open: {
        type: Boolean,
        required: true
      }
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
    pointer-events: none
    &[opened]
      pointer-events: auto
      .black-veil
        opacity: 1
        pointer-events: auto
      .content
        transform: translate(-50%, -50%)
        opacity: 1
    .black-veil
      width: 100%
      height: 100%
      opacity: 0
      pointer-events: none
      @include using-transition(opacity)
      background-color: $black-veil
    .content
      position: absolute
      width: 90vw
      max-width: $max-width
      height: 90vh
      top: 50%
      left: 50%
      background: $background-base
      border-radius: 4px
      color: $text-on-theme
      opacity: 0
      transform: translate(-50%, -100%)
      @include using-transition(all)
</style>
