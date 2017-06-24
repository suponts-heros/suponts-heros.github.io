<template>
  <div class="planning">
    <top-selector :values="days"
                     :value="day"
                     @value="(v) => day = v">
    </top-selector>
    <scroll-body>
      <v-touch tag="div" class="body" slot="content"
        @swipeleft="goRight"
        @swiperight="goLeft">
        <table>
          <tr v-for="event in planning[day]">
            <td class="hour">{{ event.heure }}</td>
            <td class="text">{{ event.texte }}</td>
          </tr>
        </table>
      </v-touch>
    </scroll-body>
  </div>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
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
    methods: {
      goLeft () {
        const index = this.days.indexOf(this.day);
        if (index > 0) {
          this.day = this.days[index - 1];
        }
      },
      goRight (e) {
        const index = this.days.indexOf(this.day);
        if (index < this.days.length - 1) {
          this.day = this.days[index + 1];
        }
      }
    },
    components: {
      'top-selector': TopSelector,
      'scroll-body': ScrollBody
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .planning
    margin-top: 60px
    .body
      margin-bottom: 115px
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
