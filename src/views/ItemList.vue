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
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    hinttext: "",
    snackbar: false,
    timeout: 2000,
  }),
  methods: {
    ...mapActions(["login"]),
    validate() {
      this.$refs.form.validate();
    },
    loginHandle: async function () {
      try {
        const result = await this.login({
          username: this.name,
          password: this.password,
        });
        console.log("result:", result);

        if (result.code == 0) this.hinttext = "Login failed!";
        else this.hinttext = "Login success!";
        this.snackbar = true;
      } catch (error) {
        console.log("error:", error);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>