<template>
  <v-row>
    <v-col>
      <v-card
        v-for="content in list"
        :key="content.key"
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
              >Rp.{{ content.price }} / {{ content.unit }}</v-list-item-subtitle
            >
            <div class="overline mt-1">{{ content.note }}</div>
          </v-list-item-content>
          <v-card-actions class="flex-column">
            <v-btn variant="primary" class="primary">Edit</v-btn>
            <v-btn variant="danger" class="error">Del</v-btn>
          </v-card-actions>
        </v-list-item>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        <v-btn
          @click="createNewData"
          class="floating-button"
          fab
          small
          dark
          color="primary"
          v-on="on"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Buat Baru</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="px-0 py-0" cols="12">
                <v-text-field
                  label="Nama"
                  hint="Nama produk harus jelas"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="px-0 py-0" cols="6">
                <v-text-field
                  label="Harga"
                  type="number"
                  hint="Tidak perlu ditambah titik atau koma"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="px-0 py-0" cols="6">
                <v-select
                  :items="['Buah', 'Kotak', 'Kilo', 'Ons']"
                  label="Satuan"
                  class="ml-1"
                  required
                ></v-select>
              </v-col>
              <v-col class="px-0 py-0" cols="12">
                <v-text-field
                  label="Catatan (opsional)"
                  hint="Keterangan agar lebih jelas"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";

export default {
  name: "List",
  data() {
    return {
      input: "",
      list: [],
      dialog: false,
    };
  },
  mounted() {
    this.getFirebaseData();
  },
  methods: {
    onKeyup() {
      console.log(this.input);
    },
    getFirebaseData() {
      firebase
        .database()
        .ref("/")
        .on("value", (snapshot) => {
          Object.entries(snapshot.val()).map((e, i) => {
            console.log(e, i);
            e[1].key = e[0];
            this.list.push(e[1]);
          });
        });
    },
    createNewData() {},
  },
};
</script>

<style scoped>
.text-input {
  padding: 1rem 1rem 0;
}
.price {
  color: #3bbcd4 !important;
  font-weight: bold;
}
.v-application .overline {
  text-transform: unset;
}
.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
  margin-left: 5px;
}
.flex-column button {
  margin: 5px;
}
.v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
.floating-button {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
