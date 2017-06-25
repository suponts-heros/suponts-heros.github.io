<template>
  <div class="bottom-selector">
    <v-touch tag="button"
             :selected="button === value"
             :key="button"
             @tap="$emit('value', button)"
             v-for="button in values">
      {{ button }}
    </v-touch>
  </div>
</template>
<script>
  export default {
    data () {
      return {};
    },
    props: {
      values: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style lang="sass" type="text/sass" rel="stylesheet/sass" scoped>
  @import '../../sass/general'
  .bottom-selector
    width: 100%
    position: fixed
    z-index: 11
    bottom: 0
    left: 0
    background: $background-base-2
    text-align: center
    display: flex
    justify-content: space-around
    overflow: hidden
    button
      background: none
      border: none
      color: $text-default
      font-size: 15px
      padding: 15px 5px 55px 5px
      text-transform: capitalize
      overflow: hidden
      @include using-transition(all)
      opacity: 0.4
      outline: none
      &[selected]
        opacity: 1
        color: $background-theme
        font-family: BoldFont

</style>
