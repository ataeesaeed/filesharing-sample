<template>
  <v-app>
    <Loading :active="loading" :is-full-page="true" />
    <vue-snotify></vue-snotify>
    <v-app-bar app color="white" dark>
      <Header :user="currentUser" @logout="onLogout" />
    </v-app-bar>

    <v-main>
      <router-view
        v-on:set-loading="loading = true"
        v-on:unset-loading="loading = false"
        v-on:logged-in="onLogin"
      />
    </v-main>
  </v-app>
</template>

<script>
import services from "@/_services";
import Header from '@/components/Header.vue'
import Loading from "vue-loading-overlay";

export default {
  name: "App",

  components: {
    Loading,
    Header
  },

  data: () => ({
    loading: false, 
    currentUser: services.authenticationService?.currentUserValue,
  }),
  methods: {
    onLogin() {
      this.currentUser = services.authenticationService?.currentUserValue;
    },
    onLogout() {
      services.authenticationService.logout();
      this.currentUser = null;
      this.$router.push("/");
    },
  },
};
</script>
