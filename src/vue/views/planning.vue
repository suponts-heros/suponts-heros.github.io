<template>
  <div class="planning">
    <top-selector :values="days"
                     :value="day"
                     @value="(v) => day = v">
    </top-selector>
    <table>
      <tr v-for="event in planning[day]">
        <td class="hour">{{ event.heure }}</td>
        <td class="text">{{ event.texte }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import TopSelector from '../utils/selector.vue';
  export default {
    data () {
      return {
        day: ''
      };
    },
    computed: {
      planning () {
        return this.$store.getters.getSection('planning');
      },
      days () {
        const days = Object.keys(this.planning) || [];
        if (days.length) this.day = days[0];
        return days;
      }
    },
    store: global.store,
    components: {
      'top-selector': TopSelector
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .planning
    padding: 50px 15px 0 15px
    margin: 0 auto
    max-width: $max-width
    text-align: justify
    table
      margin-top: 5px
      tr
        height: 50px
        td
          padding: 5px 10px
          font-size: 13px
          min-height: 50px
          &.hour
            font-family: BoldFont
            text-align: right
</style>
