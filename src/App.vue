<template>
  <v-app>
    <!-- disable dekstop version :start -->
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
    <!-- disable dekstop version :end -->

    <!-- loader overlay :start -->
    <div class="text-center">
      <v-overlay :value="loader">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <!-- loader overlay :end -->

    <!-- navbar :start -->
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
    <!-- navbar :end -->

    <v-sheet
      height="100vh"
      class="overflow-scroll v-sheet-background"
      style="position: relative;"
    >
      <!-- title :start -->
      <v-alert
        color="cyan"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-store"
        class="caption"
      >
        <h1 class="title">Warung si Mbok</h1>
      </v-alert>
      <!-- title :end -->

      <!-- content :start -->
      <v-content>
        <v-container>
          <v-btn color="primary" dark @click.stop="drawer = !drawer">
            Menu
          </v-btn>
          <router-view></router-view>
        </v-container>
      </v-content>
      <!-- content :end -->
    </v-sheet>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Home",
  data: () => {
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
  computed: {
    ...mapState(["loader"])
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
  z-index: 1;
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
  z-index: 2;
  background: #e0e0e0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-sheet-background.v-sheet {
  background: #f0f0f0;
}
.overflow-scroll {
  overflow: scroll;
}
.caption {
  position: fixed;
  z-index: 1;
  margin: 12px;
  width: calc(100% - 24px);
  left: 0;
}
.v-content {
  margin-top: 70px;
}
</style>

<style>
html {
  scroll-behavior: smooth;
}
.v-overlay {
  z-index: 99!important;
}
</style>
