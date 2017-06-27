<template>
  <v-touch tag="div" class="planning"
        @swipeleft="switchPage(days[1])"
        @swiperight="switchPage(days[0])">
    <selector :values="days"
                     :value="day"
                     @value="(v) => switchPage(v)">
    </selector>
    <scroll-body class="page left" :show="day === days[0]">
      <div class="body" slot="content" :id="`page-${days[0]}`">
        <h2>{{ days[0] }}</h2>
        <table>
          <tr v-for="event in planning[days[0]]"
              :id="(specificOpenParsed.heure === event.heure && specificOpenParsed.day === day) ?
              highlightId : false">
            <td class="hour">{{ event.heure }}</td>
            <td class="text">{{ event.texte }}</td>
          </tr>
        </table>
      </div>
    </scroll-body>
    <scroll-body class="page right" :show="day === days[1]">
      <div class="body" slot="content" :id="`page-${days[1]}`">
        <h2>{{ days[1] }}</h2>
        <table>
          <tr v-for="event in planning[days[1]]"
              :id="(specificOpenParsed.heure === event.heure && specificOpenParsed.day === day) ?
              highlightId : false">
            <td class="hour">{{ event.heure }}</td>
            <td class="text">{{ event.texte }}</td>
          </tr>
        </table>
      </div>
    </scroll-body>
  </v-touch>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  import Selector from '../utils/selector.vue';
  export default {
    data () {
      return {
        highlightId: `highlight-id-${Math.round(Math.random() * 1000000)}`,
        day: ''
      };
    },
    props: {
      specificOpen: {
        type: String
      }
    },
    computed: {
      specificOpenParsed () {
        const array = this.specificOpen.split(' - ');
        return {
          day: array[0],
          heure: array[1]
        };
      },
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
      switchPage (day) {
        this.day = day;
        document.getElementById(`page-${day}`).scrollIntoView();
      }
    },
    components: {
      'selector': Selector,
      'scroll-body': ScrollBody
    },
    mounted () {
      if (this.specificOpen !== '') {
        this.day = this.specificOpenParsed.day;
        setTimeout(() => {
          document.getElementById(this.highlightId).scrollIntoView();
        }, 200);
      }
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .planning
    .page
      position: fixed
      width: calc(100% - 30px)
      height: 100%
      left: 50%
      @include using-transition(transform)
      &.left
        transform: translateX(-150vw)
        &[show]
          transform: translateX(-50%)
      &.right
        transform: translateX(150vw)
        &[show]
          transform: translateX(-50%)
    .body
      margin-bottom: 115px
      h2
        text-align: center
        color: $text-title
        font-size: $title-text-size
        text-transform: capitalize
      table
        width: 100%;
        border-collapse: collapse
        tr
          height: 50px
          td
            text-align: left
            padding: 5px 10px
            font-size: 17px
            min-height: 50px
            &.hour
              font-family: BoldFont
              text-align: right
        tr[id] td
          background: $light-background-theme
          border-radius: 0
          &:last-child
            border-bottom-right-radius: 4px
            border-top-right-radius: 4px
          &:first-child
            border-bottom-left-radius: 4px
            border-top-left-radius: 4px

</style>
