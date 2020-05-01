<template>
  <v-row>
    <v-col>
      <v-card class="search-container">
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-text-field
            class="text-input"
            v-model="input"
            label="Cari..."
            @keyup="onKeyup"
          ></v-text-field>
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
          <!-- <v-list-item-avatar tile size="80">
            <v-img class="image-set" :src="content.imageUrl"></v-img>
          </v-list-item-avatar> -->
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
  computed: {
    ...mapState(["list"]),
  },
  methods: {
    onKeyup() {
      // show/hide element by search :start
      if (this.input !== "") {
        this.list.map((e) => {
          if (
            e.name.toLowerCase().includes(this.input) ||
            e.name.includes(this.input)
          ) {
            this.$refs[e.key][0].$el.classList.remove("hide");
          } else {
            this.$refs[e.key][0].$el.classList.add("hide");
          }
        });
      } else {
        this.list.map((e) => {
          this.$refs[e.key][0].$el.classList.remove("hide");
        });
      }
      // show/hide element by search :end
    },
  },
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
  z-index: 1;
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
</style>
