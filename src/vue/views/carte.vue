<template>
  <div class="carte-container" :id="mapId">
    <v-touch tag="div"
             class="error"
             :show="error"
             @swipeleft="error = false"
             @tap="error = false">
      Impossible de te repérer
    </v-touch>
  </div>
</template>
<script>
  import 'leaflet';
  export default {
    data () {
      return {
        mapId: `find-my-fleet-${Math.round(Math.random() * 1000000)}`,
        map: null,
        layer: null,
        error: false,
        pins: []
      };
    },
    methods: {
      refresh (markers) {
        if (this.layer && this.map) this.map.removeLayer(this.layer);
        const layer = [];
        markers.forEach((e) => {
          layer.push(
            L.marker(e['position'], {
              icon: L.icon({
                iconUrl: require('../../img/location.svg'),
                iconSize: [35, 40],
                iconAnchor: [19, 33],
                popupAnchor: [0, -18]
              })
            }).bindPopup(e['nom'], {
              className: 'custom-marker-popup'
            })
          );
        });
        this.layer = L.layerGroup(layer);
        if (this.map) {
          this.map.addLayer(this.layer);
          this.map.setZoom(this.zoom);
        }
      },
      locationFound (e) {
        this.error = false;
        const radius = e.accuracy / 2;
        L.circle(e.latlng, radius).addTo(this.map);
      },
      locationError (e) {
        this.error = true;
      }
    },
    computed: {
      view () {
        return this.$store.getters.getSection('carte')['position de depart'];
      },
      zoom () {
        return this.$store.getters.getSection('carte')['zoom de depart'] || 10;
      },
      markers () {
        return this.$store.getters.getSection('carte')['marqueurs'];
      }
    },
    store: global.store,
    mounted () {
      // Initialize map
      this.map = L.map(this.mapId).setView(this.view, this.zoom);
      // Create the terrain
      L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(this.map);
      this.map.on('locationfound', this.locationFound);
      this.map.on('locationerror', this.locationError);
      this.map.locate({ setView: true, maxZoom: 10 });
      this.refresh(this.markers);
    }
  };
</script>
<style lang="sass" type="text/sass">
@import '../../sass/general'
@import '../../../node_modules/leaflet/dist/leaflet.css'
.carte-container
  width: 100%
  height: 100%
  position: fixed !important
  margin: 0 -15px
  padding-bottom: 10px !important
  .error
    position: absolute
    bottom: 80px
    left: 50%
    width: 80%
    max-width: 300px
    z-index: 999
    text-align: center
    font-size: 20px
    background: $warning-background
    color: $text-on-theme
    border-radius: 4px
    padding: 5px 15px
    transform: translateX(-100%)
    border: 1px solid #ddd
    @include using-transition(all)
    opacity: 0
    &[show]
      opacity: 1
      transform: translateX(-50%)
  .custom-marker-popup
    .leaflet-popup-content-wrapper
      border-radius: 4px
      text-align: center
      color: $text-default
      padding: 5px
      font-size: 20px
    .leaflet-popup-tip-container
      top: calc(100% - 1px);
</style>
