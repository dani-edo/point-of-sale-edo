<template>
  <v-app>
    <!-- disable dekstop version -->
    <div class="blank" v-if="dekstop">
      <v-alert
        border="left"
        colored-border
        type="error"
        elevation="2"
        class="centered"
      >
        Please open in mobile version or responsive mode!
      </v-alert>
    </div>

    <v-sheet height="100vh" class="overflow-scroll" style="position: relative;">
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
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
          >
            <!-- <router-link :to="item.link"> -->
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <!-- </router-link> -->
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
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Cari", icon: "search", link: "/" },
        { title: "Daftar Produk", icon: "list", link: "/list" },
      ],
      title: "Warung si mbok",
      dekstop: true,
    };
  },
  created() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth < 768) {
        this.dekstop = false;
      } else {
        this.dekstop = true;
      }
    },
  },
};
</script>

<style scoped>
button.v-btn {
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: #3bbcd4 !important;
  z-index: 99;
}
.card {
  max-width: calc(100% - 10px);
}
.v-alert__icon.v-icon {
  font-size: 2rem;
}
.blank {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: #e0e0e0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-sheet {
  background: #f0f0f0;
}
</style>
