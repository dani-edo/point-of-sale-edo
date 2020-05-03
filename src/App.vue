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

    <!-- navbar :start (hide temporary) -->
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item> -->
    <!-- <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar> -->

    <!-- <v-list-item-content>
          <v-list-item-title>Warung si Mbok</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    <!-- <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        > -->
    <!-- <router-link :to="item.link"> -->
    <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content> -->
    <!-- </router-link> -->
    <!-- </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- navbar :end (hide temporary) -->

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
        <h1 class="title">Warung Mbok Soinem</h1>
      </v-alert>
      <!-- title :end -->

      <!-- content :start -->
      <v-content>
        <v-container>
          <!-- navar hide temporary :start -->
          <!-- <v-btn
            color="primary"
            class="menu-button"
            dark
            @click.stop="drawer = !drawer"
          >
            <v-icon>menu</v-icon>
          </v-btn> -->
          <!-- navar hide temporary :end -->
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            color="primary"
            class="menu-button"
            dark
            :to="item.link"
            v-show="item.show"
            :ref="item.icon"
            @click="handleClick"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
          <router-view></router-view>
        </v-container>
      </v-content>
      <!-- content :end -->
    </v-sheet>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Warung Mbok Soinem",
    // all titles will be injected into this template
    titleTemplate: "%s | Warung Mbok Soinem",
  },
  data: () => {
    return {
      drawer: null,
      items: [
        { title: "Cari", icon: "search", link: "/", show: false },
        { title: "Daftar Produk", icon: "list", link: "/list", show: true },
      ],
      title: "Warung si mbok",
      dekstop: true,
    };
  },
  computed: {
    ...mapState(["loader"]),
  },
  mounted() {
    this.getFirebaseData();
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
    ...mapActions(["getFirebaseData"]),
    handleClick() {
      this.items[0].show = !this.items[0].show;
      this.items[1].show = !this.items[1].show;
    },
  },
};
</script>

<style scoped>
a.v-btn.menu-button {
  min-width: 45px;
  padding: 0 10px;
  position: fixed;
  right: 25px;
  top: 25px;
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
  padding-right: 4rem;
}
.v-content {
  margin-top: 70px;
}
</style>

<style>
html {
  scroll-behavior: smooth;
}
/* .v-overlay {
  z-index: 99 !important;
} */
.product-list {
  margin-bottom: 1rem;
}
.v-application .headline {
  white-space: normal !important;
  font-size: 1.3rem !important;
}
.hide {
  display: none !important;
}
#clear-button {
  color: #f65153;
  font-size: 1.5rem;
  position: absolute;
  right: 10px;
  top: 3px;
  text-shadow: 0px 1px 3px #0000006e;
}
#clear-button:focus {
  outline: none;
}
.search-input {
  padding: 0.5rem 1.8rem 0.5rem 1rem;
}
.search-input:focus {
  outline: none;
}
.search-container {
  position: fixed!important;
  left: 61px;
  bottom: 12px;
  z-index: 1!important;
  max-width: calc(100% - 24px)!important;
  border-left: 8px solid #3bbcd4!important;
}
</style>
