<template>
  <v-row>
    <v-col>
      <!-- form search :start -->
      <v-card class="search-container">
        <v-form ref="form" class="form-search" @submit.prevent="onSubmit">
          <!-- <v-text-field
            class="text-input"
            label="Cari..."
            clearable
            @click:clear="onClear"
            color="#3bbcd4"
            v-model="input"
            @keyup.native="onInput"
            autocomplete="on"
            hint="*gunakan spasi jika cari tidak berfungsi"
          ></v-text-field> -->
          <input
            class="search-input"
            v-model="input"
            @keyup="onInput"
            placeholder="Cari..."
          />
          <button id="clear-button" @click="onClear" v-show="showClear">
            &#10006;
          </button>
          <!-- <v-btn class="submit-search" type="submit">
            <v-icon>search</v-icon>
          </v-btn> -->
        </v-form>
      </v-card>
      <!-- form search :end -->

      <v-card
        v-for="content in list"
        :key="content.key"
        class="mx-auto product-list"
        max-width="100%"
        outlined
        :ref="content.key"
      >
        <v-list-item three-line>
          <!-- image input :start -->
          <v-list-item-avatar tile>
            <!-- <v-img class="image-set" :src="content.imageUrl"></v-img> -->
            <v-icon class="image-set">launch</v-icon>
          </v-list-item-avatar>
          <!-- image input :end -->
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{
              content.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="price"
              >Rp.{{ content.price }} / {{ content.unit }}</v-list-item-subtitle
            >
            <div class="overline mt-1">{{ content.note }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      input: "",
      showClear: false,
    };
  },
  metaInfo: {
    title: "Warung Mbok Soinem",
    // override the parent template and just use the above title only
    titleTemplate: null,
  },
  computed: {
    ...mapState(["list"]),
  },
  methods: {
    onClear() {
      this.showClear = false;
      this.input = "";
      this.list.map((e) => {
        this.$refs[e.key][0].$el.classList.remove("hide");
      });
    },
    onInput(e) {
      this.input = e.target.value;
      // show/hide element by search :start
      if (this.input !== '') {
        this.list.map((e) => {
          if (
            e.name.toLowerCase().includes(this.input.toLowerCase()) ||
            e.name.includes(this.input.toLowerCase())
          ) {
            this.$refs[e.key][0].$el.classList.remove("hide");
          } else {
            this.$refs[e.key][0].$el.classList.add("hide");
          }
        });
        this.showClear = true;
      } else {
        this.onClear();
      }
      // show/hide element by search :end
    },
    onSubmit() {
      console.log("submit");
    },
  },
};
</script>

<style scoped>
.form-search {
  display: flex;
}
.submit-search {
  background-color: #3bbcd4 !important;
  color: white;
  margin: auto 15px;
}
.search-container {
  left: 12px;
  bottom: 10px;
}
.price {
  color: #3bbcd4 !important;
  font-weight: bold;
}
.v-application .overline {
  text-transform: unset;
}
.v-avatar {
  margin-bottom: 16px !important;
  margin-top: 10px !important;
  margin-left: -10px;
  margin-right: 0px !important;
}
</style>
