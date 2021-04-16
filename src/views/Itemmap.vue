<template>
  <div>
    <GmapMap
      v-if="mapDisplay"
      :center="center"
      :zoom="14"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-for="(m, index) in mappedItems"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="markerClick(index)"
      />
      <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 },
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open = false"
      >
        <div v-html="infoWindow.template"></div>
      </gmap-info-window>
    </GmapMap>
    <p v-for="(item, index) in mappedItems" :key="index">{{ item }}</p>
    <button @click="research">search</button>
    <button @click="emptyItems">emptyItems</button>
    <button @click="redisplay">redisplay</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    mapDisplay: true,
    center: { lat: 10, lng: 10 },
    markers_fake: [
      {
        position: {
          lat: -33.695088999999996,
          lng: 151.2918732,
          name: "item1",
          description: "desc1",
        },
      },
      {
        position: {
          lat: -33.69208999999996,
          lng: 151.2958732,
          name: "item2",
          description: "desc1",
        },
      },
    ],
    infoWindow: {
      position: { lat: 0, lng: 0 },
      open: false,
      template: "",
    },
  }),
  computed: {
    ...mapGetters(["mappedItems"]),
    // ...mapState({
    //   markers: (state) => {
    //     let markers = [];
    //     let dynamicItems = [
    //       {
    //         coordinates: [151.2918732, -33.695088999999996],
    //         name: "item1",
    //         description: "desc1",
    //       },
    //       {
    //         coordinates: [151.2958732, -33.69208999999996],
    //         name: "item2",
    //         description: "desc1",
    //       },
    //     ];
    //     if (state.item.items.length) dynamicItems = state.item.items;
    //     console.log("state items:", state.item.items);
    //     dynamicItems.forEach(({ coordinates, name, description }, index) => {
    //       markers.push({
    //         position: {
    //           lng: coordinates[0],
    //           lat: coordinates[1],
    //           name,
    //           description,
    //         },
    //         key: index,
    //       });
    //     });

    //     return markers;
    //   },
    // }),
  },
  mounted: async function () {
    // await this.getAllItems();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;
      });
    }

    console.log("mounted");
  },
  methods: {
    ...mapActions(["getAllItems"]),
    ...mapMutations(["emptyItems", "redisplay"]),
    markerClick(index) {
      const { lat, lng, name, description } = this.markers[index].position;
      this.infoWindow.position = { lat: lat, lng: lng };
      this.infoWindow.template = `<b>${name}</b><br>${description}<br>`;
      this.infoWindow.open = true;
    },
    research: async function () {
      this.mapDisplay = false;
      await this.getAllItems();
      this.mapDisplay = true;
      console.log("getAllItems:", this.items);
    },
  },
};
</script>

<style>
</style>