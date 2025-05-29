<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="bg-white px-8 py-8 rounded shadow-lg w-full max-w-sm border-t-8 border-blue-500"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Radiology System</h1>
        <p class="text-gray-600">Secure Login</p>
      </div>

      <!-- Vuetify Form -->
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          density="compact"
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="compact"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="[rules.required]"
        ></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          :disabled="!formValid"
        >
          Login
        </v-btn>
      </v-form>

      <!-- Additional Links -->
      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-blue-600 hover:underline"
          >Forgot Password?</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import axiosClient from "@/webClient/API"; // Adjust the import path as necessary
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    formValid() {
      return this.email && this.password;
    },
  },
  methods: {
    submitForm() {
      if (this.formValid) {
        // Handle login logic here
        console.log("Logging in with:", this.email, this.password);
        // Redirect or perform login action
        axiosClient.axiosClient
          .post("auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log("Login successful:", response.data);
            // Store token or user data as needed
            localStorage.setItem("accessToken", response.data.access_token);
            // Redirect to dashboard or home page
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            console.error("Login failed:", error);
            // Handle error (e.g., show notification)
          });
      } else {
        console.error("Form is invalid");
      }
    },
  },
};
</script>
