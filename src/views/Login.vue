<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="UserName"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="showPass ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="loginHandle"
      >
        Login
      </v-btn>
      <router-link to="/register" tag="button">
        <v-btn color="success" class="mr-4"> Register </v-btn>
      </router-link>
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
    nameRules: [
      (v) => !!v || "Name is required",
      (v) =>
        (/^[-_a-zA-Z0-9]{4,10}$/.test(v) && v.length <= 10) ||
        "Name must be less than 10 characters(char or number)",
    ],
    showPass: false,
    password: "Password",
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
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

        if (result.code == 0) 
          this.hinttext="Login failed!"
        else
          this.hinttext="Login success!"
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