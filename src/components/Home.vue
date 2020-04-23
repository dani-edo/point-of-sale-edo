<template>
  <v-row>
    <v-col>
      <v-card class="search-container">
        <v-form ref="form">
          <v-text-field class="text-input" label="Cari..."></v-text-field>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.text-input {
  padding: 1rem 1rem 0;
}
.search-container {
  position: fixed;
  left: 10px;
  bottom: 10px;
}
</style>
