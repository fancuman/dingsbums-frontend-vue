<template>
  <GmapMap
    :center="{ lat, lng }"
    :zoom="14"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <!-- <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  /> -->
  </GmapMap>
</template>

<script>
export default {
  data: () => ({
    lat: 10,
    lng: 10,
  }),
  mounted: async function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  },
};
</script>

<style>
</style>