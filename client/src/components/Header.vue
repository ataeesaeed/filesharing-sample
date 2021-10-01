<template>
  <header class="header">
    <div class="logo">
      <router-link :to="user ? 'dashboard' : '/'">
        <img :src="logo" alt="logo" />
      </router-link>
    </div>
    <div class="nav">
      <ul>
        <li v-if="user"><router-link to="/upload">Upload</router-link></li>
        <li v-if="user">
          <router-link to="/manage">Manage Files</router-link>
        </li>
        <li v-if="!user"><router-link to="/enter">Enter</router-link></li>
        <li v-if="user">
          <a class="logout" @click="$emit('logout')">Logout</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import logo from "@/assets/logo.svg";
export default {
  data() {
    return { logo };
  },
  props: {
    user: Object,
  },
};
</script>

<style scoped>
.header {
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-content: center;
}

.header .logo {
  display: flex;
  align-content: center;
  left: 1rem;
  width: 20%;
}

.header .logo img {
  width: 3rem;
}

.header .nav {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.header .nav ul {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.header .nav ul li {
  margin: 0 1rem;
  padding: 0.3rem;
}

.header .nav ul li a {
  text-decoration: none;
  color: #4e5f4f;
}

.header .nav ul li a:hover {
  color: black;
}

.logout {
  cursor: pointer;
}
</style>