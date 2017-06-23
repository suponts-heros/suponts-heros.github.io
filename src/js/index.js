import Vue from 'vue';
import Vuex from 'vuex';
import VueTouch from 'vue-touch';
Vue.use(Vuex);
Vue.use(VueTouch, { name: 'v-touch' });
import Root from '../vue/root.vue';

global.store = new Vuex.Store({
  state: {
    content: {}
  },
  getters: {
    getContent (state) {
      return state.content;
    },
    getSection: (state, getters) => (name) => {
      try {
        return state.content['sections'][name];
      } catch (e) {
        return {};
      }
    },
    getAllSections (state) {
      return state.content['sections'];
    },
    getIntroPopup (state) {
      return state.content['popup d\'accueil'];
    }
  },
  mutations: {
    setContent (state, newContent) {
      if (newContent) {
        localStorage['content'] = JSON.stringify(newContent);
      }
      state.content = JSON.parse(localStorage['content']);
    }
  },
  actions: {
    requestContent (state, callback) {
      const request = new XMLHttpRequest();
      request.overrideMimeType('application/json');
      request.open('GET', 'content.json', true);
      request.addEventListener('readystatechange', () => {
        let newContent = null;
        try {
          newContent = JSON.parse(request.responseText);
        } catch (t) {}
        state.commit('setContent', newContent);
        callback();
      });
      request.send();
    }
  }
});

global.vm = new Vue({
  el: '#app-container',
  data () {
    return {
      loading: true
    };
  },
  components: {
    'root': Root
  },
  store: global.store,
  mounted () {
    this.$store.dispatch('requestContent', () => {
      setTimeout(() => {
        this.loading = false;
      }, 200);
    });
  }
});
