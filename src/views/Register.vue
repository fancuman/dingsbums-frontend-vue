<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="UserName"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
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
      @click="registerHandle"
    >
      Register
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
  </v-form>
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
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showPass: false,
    password: "Password",
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    ...mapActions(["register"]),
    validate() {
      this.$refs.form.validate();
    },
    registerHandle: async function () {
      try {
        const result = await this.register({
          username: this.name,
          password: this.password,
        });
        console.log("result:", result);
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