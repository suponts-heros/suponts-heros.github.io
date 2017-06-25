<template>
  <v-touch tag="div" class="planning"
        @swipeleft="goRight"
        @swiperight="goLeft">
    <selector :values="days"
                     :value="day"
                     @value="(v) => day = v">
    </selector>
    <scroll-body>
      <div class="body" slot="content">
        <h2>{{ day }}</h2>
        <table>
          <tr v-for="event in planning[day]"
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
        console.log(array);
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
      goLeft () {
        const index = this.days.indexOf(this.day);
        if (index > 0) {
          this.day = this.days[index - 1];
        }
      },
      goRight () {
        const index = this.days.indexOf(this.day);
        if (index < this.days.length - 1) {
          this.day = this.days[index + 1];
        }
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
  .planning .body
      margin-bottom: 115px
      h2
        text-align: center
        color: $text-title
        font-size: $title-text-size
        text-transform: capitalize
      table
        border-collapse: collapse
        tr
          height: 50px
          td
            padding: 5px 10px
            font-size: 13px
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
