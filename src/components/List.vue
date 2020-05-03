<template>
  <v-row>
    <v-col>
      <!-- form search :start -->
      <v-card class="search-container">
        <input
          class="search-input"
          v-model="input"
          @keyup="onInput"
          placeholder="Cari..."
        />
        <button id="clear-button" @click="onClear" v-show="show.showClear">
          &#10006;
        </button>
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
          <v-card-actions class="flex-column actions">
            <v-btn
              variant="primary"
              class="primary"
              @click="editProduct(content.key)"
              ><v-icon>edit</v-icon></v-btn
            >
            <v-btn
              variant="danger"
              class="error"
              @click="deleteProduct(content.key, content.image_name)"
              ><v-icon>delete</v-icon></v-btn
            >
          </v-card-actions>
        </v-list-item>
      </v-card>
    </v-col>

    <!-- Modal create :start -->
    <v-dialog v-model="condition.modal_create" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        <v-btn class="floating-button" fab small dark color="primary" v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-form @submit.prevent="createFirebaseData">
          <v-card-title>
            <span class="headline">Buat Produk</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="px-0 py-0" cols="12">
                  <!-- <v-text-field
                    ref="name"
                    label="Nama"
                    hint="*gunakan spasi jika kata terakhir hilang"
                    v-model="data_create.name"
                    :rules="rules.form_rules"
                    @keyup="capitalize"
                  ></v-text-field> -->

                  <div
                    data-v-264bddce=""
                    class="v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted"
                  >
                    <div class="v-input__control">
                      <div class="v-input__slot">
                        <div class="v-text-field__slot">
                          <label
                            for="name"
                            class="v-label v-label--active theme--light"
                            style="left: 0px; right: auto; position: absolute;"
                            >Nama</label
                          ><input
                            id="name"
                            ref="name"
                            v-model="data_create.name"
                            @change="capitalize"
                            placeholder="Nama..."
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="v-text-field__details">
                        <div class="v-messages theme--light">
                          <div
                            class="v-messages__wrapper error"
                            v-show="show.name_error"
                          >
                            Wajib diisi
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col class="px-0 py-0" cols="6">
                  <v-text-field
                    ref="price"
                    label="Harga"
                    type="number"
                    v-model="data_create.price"
                    hint="*tidak perlu ditambah titik atau koma"
                    :rules="rules.form_rules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="px-0 py-0" cols="6">
                  <v-select
                    ref="unit"
                    :items="[
                      'buah',
                      'kotak',
                      'kg',
                      'ons',
                      'bungkus',
                      'botol',
                      'biji',
                    ]"
                    label="Satuan"
                    v-model="data_create.unit"
                    class="ml-1"
                    :rules="rules.form_rules"
                    required
                  ></v-select>
                </v-col>
                <v-col class="px-0 py-0" cols="12">
                  <v-text-field
                    label="Catatan (opsional)"
                    hint="misal: beli 1 dapat 5"
                    v-model="data_create.note"
                  ></v-text-field>
                </v-col>

                <!-- image input :start -->
                <!-- <v-col>
                  <v-file-input
                    ref="image"
                    :rules="rules.image_rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Foto Produk"
                    required
                    @change="handleImage"
                  ></v-file-input>
                </v-col> -->
                <!-- image input :end -->
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="condition.modal_create = false"
              >Batal</v-btn
            >
            <v-btn color="blue darken-1" text type="submit">Simpan</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Modal create :end -->

    <!-- modal delete confirmation :start -->
    <v-dialog v-model="condition.modal_delete" max-width="290">
      <v-card>
        <!-- <v-card-title class="headline">?</v-card-title> -->

        <v-card-text class="pt-5">
          Apakah anda yakin ingin menghapus produk ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="condition.modal_delete = false"
          >
            Batal
          </v-btn>

          <v-btn variant="danger" class="error" @click="deleteConfirmed()">
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- modal delete confirmation :end -->
  </v-row>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { mapActions, mapState } from "vuex";

export default {
  name: "List",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Edit Produk",
  },
  data() {
    return {
      input: "",
      imageInput: [],
      show: {
        showClear: false,
        name_error: false,
      },
      condition: {
        modal_create: false,
        modal_delete: false,
        edit_product: false,
      },
      key: {
        edit_key: "",
        delete_confirmation_key: "",
        delete_image_name: "",
      },
      data_create: {
        name: "",
        price: null,
        unit: "",
        note: "",
        image_name: "",
      },
      rules: {
        form_rules: [(value) => !!value || "Wajib diisi."],
        // image input :start
        // image_rules: [
        //   (value) => !!value || "Required.",
        //   (value) =>
        //     !value ||
        //     value.size < 2000000 ||
        //     "Avatar size should be less than 2 MB!",
        // ],
        // image input :end
      },
    };
  },
  computed: {
    ...mapState(["list"]),
  },
  methods: {
    // image input :start
    // handleImage(e) {
    //   this.imageInput = e;
    // },
    // image input :end
    createFirebaseData() {
      // Error check
      var hasError = false;
      Object.entries(this.$refs).forEach((e) => {
        if (e[0] === "price" || e[0] === "unit") {
          if (e[1].hasError) {
            hasError = true;
          }
        } else if (e[0] === "name") {
          if (this.$refs[e[0]].value === "") {
            hasError = true;
          }
        }

        return hasError;
      });

      if (!hasError) {
        this.loading(true);
        if (!this.condition.edit_product) {
          // Edit Product
          var databaseRef = firebase.database().ref("/"),
            firebaseKey = databaseRef.push().key,
            updates = {};
        } else {
          // Create Product
          databaseRef = firebase.database().ref("/");
          firebaseKey = this.key.edit_key;
          updates = {};
        }
        const image_name = firebaseKey + this.imageInput.name;
        this.data_create.image_name = image_name;
        updates["/" + firebaseKey] = this.data_create;
        databaseRef.update(updates);

        // Storage image upload :start
        // const storageRef = firebase
        //   .storage()
        //   .ref("product_picture/" + image_name);
        // const task = storageRef.put(this.imageInput);
        // task.on(
        //   "state_changed",
        //   (snapshot) => {
        //     console.log(snapshot);
        //     const percentage =
        //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log("uploadProgress", percentage);
        //   },
        //   (error) => {
        //     console.log("error", error);
        //   },
        //   () => {
        //     console.log("complete");
        this.getFirebaseData();
        //   }
        // );
        // Storage image upload :end

        this.condition.modal_create = false;
        this.condition.edit_product = false;
        this.emptyData();
        this.loading(false);
      } else {
        // console.log(this.$refs)
        Object.entries(this.$refs).forEach((e) => {
          if (e[0] === "price" || e[0] === "unit") {
            this.$refs[e[0]].validate(true);
          } else if (e[0] === "name") {
            if (this.$refs[e[0]].value === "") {
              this.show.name_error = true;
            }
          }
          // if (this.$refs[e[0]].$vnode.data.ref === "price") {
          // console.log(this.$refs[e[0]].$vnode.data.ref)
          // }
        });
      }
    },
    editProduct(key) {
      const databaseRef = firebase.database().ref("/" + key);
      databaseRef.on("value", (snapshot) => {
        const snap_val = snapshot.val();
        this.data_create = snap_val;
      });
      this.condition.modal_create = true;
      this.condition.edit_product = true;
      this.key.edit_key = key;
    },
    deleteProduct(key, image) {
      this.condition.modal_delete = true;
      this.key.delete_confirmation_key = key;
      this.key.delete_image_name = image;
    },
    deleteConfirmed() {
      this.loading(true);
      firebase
        .database()
        .ref("/" + this.key.delete_confirmation_key)
        .remove();
      // image input :start
      // firebase
      //   .storage()
      //   .ref("product_picture/" + this.key.delete_image_name)
      //   .delete()
      //   .then(() => {
      //     console.log("deleted succesfully");
      this.getFirebaseData();
      // this.loading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.loading(false);
      //   });
      // image input :end
      this.key.delete_confirmation_key = this.key.delete_image_name = "";
      this.condition.modal_delete = false;
    },
    emptyData() {
      this.data_create.name = this.data_create.unit = this.data_create.note =
        "";
      this.data_create.price = null;
    },
    ...mapActions(["loading", "getFirebaseData"]),
    capitalize(e) {
      this.data_create.name = e.target.value;
      this.data_create.name = this.data_create.name.replace(
        /(\b[a-z](?!\s))/g,
        function(x) {
          return x.toUpperCase();
        }
      );
      this.show.name_error = false;
    },
    onClear() {
      this.show.showClear = false;
      this.input = "";
      this.list.map((e) => {
        this.$refs[e.key][0].$el.classList.remove("hide");
      });
    },
    onInput(e) {
      this.input = e.target.value;
      // show/hide element by search :start
      if (this.input !== "") {
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
        this.show.showClear = true;
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
.text-input {
  padding: 0;
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
button.v-btn.floating-button {
  position: fixed;
  bottom: 12px;
  left: 12px;
  background-color: #3bbcd4 !important;
  z-index: 1;
}
.actions {
  margin-right: -16px;
}
.actions button {
  min-width: unset !important;
}
.search-container {
  left: 61px;
  bottom: 12px;
}
.search-container .v-text-field.v-text-field--solo .v-input__control {
  min-height: unset !important;
}
.search-container .v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none !important;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  margin: 0 !important;
}
.theme--light.v-text-field:not(.v-input--has-state):hover
  > .v-input__control
  > .v-input__slot:before {
  border-color: #278de6;
  /* border-width: 0.5px; */
}
.v-messages__wrapper.error {
  color: red;
  background-color: unset !important;
}
</style>
