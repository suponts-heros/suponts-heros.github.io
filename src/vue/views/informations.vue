<template>
  <scroll-body class="informations">
    <div class="body" slot="content">
      <h2>Contacts d'urgences</h2>
      <ul>
        <li v-for="contact in contacts">
          <a :href="`tel:${contact.telephone}`">
            <span class="call-icon"></span>
            {{ contact.nom }}
          </a>
        </li>
      </ul>
      <template v-for="section in other">
        <h2>{{ section.titre }}</h2>
        <p>{{ section.contenu }}</p>
      </template>
    </div>
  </scroll-body>
</template>
<script>
  import ScrollBody from '../utils/scroll-body.vue';
  export default {
    computed: {
      contacts () {
        return this.$store.getters.getSection('informations')['contacts d\'urgence'];
      },
      other () {
        return this.$store.getters.getSection('informations')['autres informations'];
      }
    },
    store: global.store,
    components: {
      'scroll-body': ScrollBody
    }
  };
</script>
<style lang="sass" type="text/sass" scoped>
  @import '../../sass/general'
  .informations
    .body
      h2
        text-align: center
        color: $text-title
        font-size: $title-text-size
      ul
        padding-left: 0
        list-style: none
        li
          line-height: 40px
          a
            display: inline-block
            width: 100%
            text-decoration: none
            color: inherit
            .call-icon
              float: left
              width: 40px
              height: 40px
              background: url(../../img/call-icon.svg) center no-repeat
              background-size: 80%
</style>
