<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Remove Item </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="onAccept()">Remove</v-btn>
        <v-btn color="lightgray" text @click="onCancel()"> Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "message", "onAccept", "onCancel"],
};
</script>