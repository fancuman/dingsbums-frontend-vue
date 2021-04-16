<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="description"
        :rules="nameRules"
        label="Description"
        required
      ></v-text-field>
      <v-text-field v-model="lat" label="Latitude" required></v-text-field>
      <v-text-field v-model="log" label="Longitude" required></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="addHandle">
        AddItem
      </v-btn>
      <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ hinttext }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import is from "@/service/item";
export default {
  data: () => ({
    valid: true,
    name: "",
    description: "",
    nameRules: [(v) => !!v || "Name is required"],
    hinttext: "",
    snackbar: false,
    timeout: 2000,
    lat: -33.807602,
    log: 151.190196,
  }),
  methods: {
    // ...mapActions(["create"]),
    addHandle: async function () {
      try {
        const result = await is.create({
          name: this.name,
          description: this.description,
          coordinates: { log: this.log, lat: this.lat },
        });
        console.log("result:", result);

        if (result.code == 0) this.hinttext = "create failed!";
        else this.hinttext = "Create success!";
        this.snackbar = true;
      } catch (error) {
        console.log("error:", error);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
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