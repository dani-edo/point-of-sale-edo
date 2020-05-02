<template>
  <v-row>
    <v-col>
      <v-card class="search-container">
        <v-form ref="form" class="form-search" @submit.prevent="onSubmit">
          <v-text-field
            class="text-input"
            label="Cari..."
            clearable
            @click:clear="onClear"
            color="#3bbcd4"
            :value="input"
            @input="onInput"
            autocomplete="off"
            hint="*gunakan spasi jika cari tidak berfungsi"
          ></v-text-field>
          <!-- <v-btn class="submit-search" type="submit">
            <v-icon>search</v-icon>
          </v-btn> -->
        </v-form>
      </v-card>

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
      this.list.map((e) => {
        this.$refs[e.key][0].$el.classList.remove("hide");
      });
    },
    onInput(e) {
      if (e !== "submit") {
        this.input = e;
      }
      // show/hide element by search :start
      if (this.input !== null) {
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
      } else {
        this.onClear();
      }
      console.log(this.input);
      // show/hide element by search :end
    },
    onSubmit() {
      this.onInput("submit");
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
.text-input {
  padding: 1rem 1rem 0.5rem;
}
.search-container {
  position: fixed;
  left: 12px;
  bottom: 10px;
  z-index: 1;
  max-width: calc(100% - 24px);
  border: 3px solid #3bbcd4;
}
.price {
  color: #3bbcd4 !important;
  font-weight: bold;
}
.v-application .overline {
  text-transform: unset;
}
.hide {
  display: none !important;
}
.v-avatar {
  margin-bottom: 16px !important;
  margin-top: 10px !important;
  margin-left: -10px;
  margin-right: 0px !important;
}
</style>
