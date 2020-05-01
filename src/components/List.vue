<template>
  <v-row>
    <v-col>
      <v-card
        v-for="content in list"
        :key="content.key"
        class="mx-auto product-list"
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
          <v-card-actions class="flex-column actions">
            <v-btn
              variant="primary"
              class="primary"
              disabled
              @click="editProduct(content.key)"
              >Edit</v-btn
            >
            <v-btn
              variant="danger"
              class="error"
              @click="deleteProduct(content.key, content.image_name)"
              >Del</v-btn
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
                  <v-text-field
                    ref="name"
                    label="Nama"
                    hint="Nama produk harus jelas"
                    v-model="data_create.name"
                    :rules="rules.form_rules"
                  ></v-text-field>
                </v-col>
                <v-col class="px-0 py-0" cols="6">
                  <v-text-field
                    ref="price"
                    label="Harga"
                    type="number"
                    v-model="data_create.price"
                    hint="Tidak perlu ditambah titik atau koma"
                    :rules="rules.form_rules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="px-0 py-0" cols="6">
                  <v-select
                    ref="unit"
                    :items="['Buah', 'Kotak', 'Kilo', 'Ons']"
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
                    hint="Keterangan agar lebih jelas"
                    v-model="data_create.note"
                  ></v-text-field>
                </v-col>
                <v-col>
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
                </v-col>
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
  data() {
    return {
      imageInput: [],
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
        form_rules: [(value) => !!value || "Required."],
        image_rules: [
          (value) => !!value || "Required.",
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Avatar size should be less than 2 MB!",
        ],
      },
    };
  },
  computed: {
    ...mapState(["list"]),
  },
  methods: {
    handleImage(e) {
      this.imageInput = e;
    },
    createFirebaseData() {
      // Error check
      var hasError = false;
      Object.entries(this.$refs).forEach((e) => {
        if (e[1].hasError) {
          hasError = true;
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
        const storageRef = firebase
          .storage()
          .ref("product_picture/" + image_name);
        const task = storageRef.put(this.imageInput);
        task.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
            const percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("uploadProgress", percentage);
          },
          (error) => {
            console.log("error", error);
          },
          () => {
            console.log("complete");
            this.getFirebaseData();
          }
        );
        // Storage image upload :end

        this.condition.modal_create = false;
        this.condition.edit_product = false;
        this.emptyData();
        this.loading(false);
      } else {
        Object.entries(this.$refs).forEach((e) => {
          this.$refs[e[0]].validate(true);
        });
      }
    },
    editProduct(key) {
      const databaseRef = firebase.database().ref("/" + key);
      databaseRef.once("value", (snapshot) => {
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
      firebase
        .storage()
        .ref("product_picture/" + this.key.delete_image_name)
        .delete()
        .then(() => {
          console.log("deleted succesfully");
          this.getFirebaseData();
          this.loading(false);
        })
        .catch((error) => {
          console.log(error);
          this.loading(false);
        });
      this.key.delete_confirmation_key = this.key.delete_image_name = "";
      this.condition.modal_delete = false;
    },
    emptyData() {
      this.data_create.name = this.data_create.unit = this.data_create.note =
        "";
      this.data_create.price = null;
    },
    ...mapActions(["loading"]),
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
button.v-btn.floating-button {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background-color: #3bbcd4 !important;
  z-index: 1;
}
.actions {
  margin-right: -16px;
}
</style>
