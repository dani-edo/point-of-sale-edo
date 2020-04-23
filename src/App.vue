<template>
  <v-app>
    <v-sheet height="100vh" class="overflow-hidden" style="position: relative;">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <!-- <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title>Warung si Mbok</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <v-container>
          <v-alert
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-store"
          >
            <h1 class="title">Warung si Mbok</h1>
          </v-alert>
          <v-btn color="primary" dark @click.stop="drawer = !drawer">
            Menu
          </v-btn>
          <Home />
        </v-container>
      </v-content>
    </v-sheet>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",

  components: {
    Home,
  },

  data() {
    return {
      drawer: null,
      items: [
        { title: "Cari", icon: "search" },
        { title: "Daftar Produk", icon: "list" },
      ],
      title: "Warung si mbok",
    };
  },
};
</script>

<style scoped>
button {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
.card {
  max-width: calc(100% - 10px);
}
.mdi-store::before {
  font-size: 2rem;
  margin-top: 6px;
}
</style>
