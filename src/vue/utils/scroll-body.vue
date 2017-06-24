<template>
  <div class="scroll-body" :id="id">
    <slot name="content"></slot>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id: `scroll-body-${Math.round(Math.random() * 1000000)}`,
        clientY: 0
      };
    },
    mounted () {
       // To fix the damn scrolling on iOS
      const viewContainer = document.getElementById(this.id);
      viewContainer.addEventListener('touchstart', (event) => {
        if (event.targetTouches.length === 1) {
          this.clientY = event.targetTouches[0].clientY;
        }
      }, false);
      viewContainer.addEventListener('touchmove', (event) => {
        if (event.targetTouches.length === 1) {
          const clientY = event.targetTouches[0].clientY - this.clientY;
          if (viewContainer.scrollTop === 0 && clientY > 0) {
            event.preventDefault();
          }
          if (viewContainer.scrollHeight - viewContainer.scrollTop <= viewContainer.clientHeight && clientY < 0) {
            event.preventDefault();
          }
        }
      }, false);
    }
  };
</script>
<style lang="sass" type="text/sass" rel="stylesheet/sass" scoped>
  @import '../../sass/general'
  .scroll-body
    padding: 0 15px
    margin: 0 auto
    max-width: $max-width
    max-height: 100vh
    text-align: justify
    overflow-y: auto
    -webkit-overflow-scrolling: touch
    > *
      margin-bottom: 75px
</style>
