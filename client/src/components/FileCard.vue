<template>
  <v-card>
    <v-img
      :src="cardImage"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="file.name"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-icon color="blue">mdi-download</v-icon> {{file.downloads}}
      <v-spacer></v-spacer>


      <v-btn color="#ec5866" icon @click="$emit('delete', file.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn color="green" icon @click="$emit('show-file', file.id)">
        <v-icon>mdi-eye</v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import cardImage from "@/assets/images/file-card.svg";
export default {
  props: ["file"],
  data() {
    return { cardImage };
  },
};
</script>

<style scoped>
.file-card {
  position: relative;
  display: block;
  height: 100%;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.file-card .card__image {
  width: 100%;
  height: auto;
}

.file-card .container {
  font-size: 1em;
  padding: 0.4rem;
  color: #6a515e;
}

.file-card .container p {
  margin: 0;
}
</style>