<template>
  <div class="dashboard">
    <router-link class="image" to="/upload">
      <img :src="file" alt="upload" />
      <p>Upload New File</p>
    </router-link>
    <router-link class="image" to="/manage">
      <img :src="files" alt="manage" />
      <p>File Manager</p>
    </router-link>
  </div>
</template>

<script>
import files from "@/assets/images/files.svg";
import file from "@/assets/images/file.svg";
export default {
  data() {
    return {
      file,
      files,
    };
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  background: url("../../assets/images/dashboard-image.svg"), #8cc5d4;
  background-size: 20%;
  background-position: left 10% bottom 10%;
  background-repeat: no-repeat;
}

@media (max-width: 580px) {
  .dashboard {
    align-items: center;
    flex-direction: column;
  }
}

.dashboard a {
  text-decoration: none;
}

.dashboard .image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: #fff;
  opacity: 0.9;
  border-radius: 1rem;
  margin: 2rem;
  text-align: center;
  width: 30%;
  height: 40%;
  min-height: 10rem;
  min-width: 15rem;
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
  overflow: hidden;
  box-shadow: 0 .5rem 1rem -0.2rem rgba(0, 0, 0, 0.3);
}

.dashboard .image:hover {
  opacity: 1;
  cursor: pointer;
  transform: scale(1.01);
}

.dashboard .image img {
  width: auto;
  height: auto;
  max-width: 60%;
  max-height: 60%;
  margin: auto;
}
</style>