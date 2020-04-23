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
        v-for="(content, index) in list"
        :key="index"
        class="mx-auto"
        max-width="100%"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-avatar tile size="80">
            <v-img class="image-set" :src="content.imageUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{
              content.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="price"
              >Rp.{{ content.price }}</v-list-item-subtitle
            >
            <div class="overline mt-1">OVERLINE</div>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      input: "",
      list: [
        {
          name: "Micin",
          desc: "beli 3 dapet q",
          price: 5000,
          imageUrl: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
        },
        {
          name: "Micin",
          desc: "beli 3 dapet q",
          price: 5000,
          imageUrl: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
        },
        {
          name: "Micin",
          desc: "beli 3 dapet q",
          price: 5000,
          imageUrl: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
        },
      ],
    };
  },
  methods: {
    onKeyup() {
      console.log(this.input);
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
}
.price {
  color: #3bbcd4 !important;
  font-weight: bold;
}
</style>
