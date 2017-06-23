<template>
  <div class="carte-container" :id="mapId">
    <v-touch tag="div"
             class="error"
             :show="error"
             @swipeleft="error = false"
             @tap="error = false">
      {{ errorMessage }}
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
        errorMessage: '',
        userMarker: null,
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
        if (this.userMarker) this.map.removeLayer(this.userMarker);
        const radius = e.accuracy / 2;
        const locationIcon = L.divIcon({
          html: '<div class="circle"></div><div class="point"></div>',
          className: 'user-location',
          iconSize: [radius, radius],
          iconAnchor: [radius / 2, radius / 2]
        });
        this.userMarker = L.marker(e.latlng, { icon: locationIcon });
        this.map.addLayer(this.userMarker);
        if (this.isOutOfBound(e.latlng)) {
          if (this.errorMessage !== 'Tu n\'est pas à proximité du campus') {
            this.errorMessage = 'Tu n\'est pas à proximité du campus';
            this.error = true;
          }
        } else {
          this.error = false;
          setTimeout(() => {
            this.errorMessage = '';
          }, 200);
        }
      },
      isOutOfBound (position) {
        return position['lat'] > 43.574160 ||
          position['lng'] > 1.478854 ||
          position['lat'] < 43.561869 ||
          position['lng'] < 1.468950;
      },
      locationError (e) {
        if (this.userMarker) this.map.removeLayer(this.marker);
        this.errorMessage = 'Impossible de te repérer';
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
      L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(this.map);
      this.map.on('locationfound', this.locationFound);
      this.map.on('locationerror', this.locationError);
      this.map.locate({ maxZoom: 18, watch: true });
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
      top: calc(100% - 1px)
.user-location
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  z-index: 9999 !important
  .circle
    position: absolute
    border-radius: 50%
    border: 2px solid $user-location-color
    @keyframes dissolve
      from
        opacity: 1
        width: 0
        height: 0
        min-width: 0
        min-height: 0
      to
        opacity: 0
        width: 150%
        min-width: 20px
        min-height: 20px
        height: 150%
    animation: 3s dissolve ease infinite
  .point
    width: 15px
    height: 15px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: radial-gradient($user-location-color 50%, rgba(128, 128, 128, 0))
    border-radius: 50%
</style>
