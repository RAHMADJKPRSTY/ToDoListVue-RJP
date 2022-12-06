<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Rhmd</a>
  
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
          <router-link to="/">Home</router-link>
        </li>
      </ul>
      </div>
    </nav>
    
    <br>
    <br>
    <div class="container">
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" onkeyup placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>

    <br>
    <br>

    <div class="container">
      <div class="card">
        <b-button v-b-modal.modal-prevent-closing class="mt-2 mb-2 col-2 ml-4" v-if="$route.name !== 'edit-data'">
          Tambah Data
        </b-button>


        <router-link class="btn btn-warning mt-2 mb-2 col-2 ml-4"  v-if="$route.name == 'edit-data'"
              :to="{name: 'home'}">
              Kembali
              </router-link>
        
        <div class="card-body">
          <b-table striped hover :fields="field" :items="userss" show-empty v-if="$route.name !== 'edit-data'">
            <template v-slot:cell(index)="row">
              <p class="text-center">
                {{ row.index + 1 }}
              </p>
            </template>
            <template v-slot:cell(action)="row">

              <!-- <button
                @click="getOneData(row.item)"
                class="btn btn-warning mr-2">
                Edit
              </button> -->

              
              <router-link class="btn btn-warning mr-2" 
              :to="{name: 'edit-data', params: { id: row.item.key}}">
              Edit
              </router-link>

              <button @click="deleteData(row.item.key)" class="btn btn-danger" >
                Delete
              </button>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <!-- crete data  modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Tambah Data"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="user.name"
            :state="nameState"
         
          />
        </b-form-group>
        <b-form-group
          label="description"
          label-for="description-input"
          invalid-feedback="description is required"
          :state="descriptionState"
        >
          <b-form-input
            id="name-input"
            type="description"
            v-model="user.description"
            :state="descriptionState"
        
          />
        </b-form-group>
        <b-form-group
          label="created_at"
          label-for="description-input"
          invalid-feedback="created_at is required"
          :state="created_atState"
        >
          <b-form-input
            id="name-input"
            type="date"
            v-model="user.created_at"
            :state="created_atState"
           
          />
        </b-form-group>
      </form>
    </b-modal>
    <!-- end create modal -->

    <!-- edit modal -->
    <b-modal
      ref="modal-edit"
      title="Edit Data"
      @ok="handleEdit"
      @cancel="handleCancel"
    >
      <form ref="form" @submit.stop.prevent="handleUpdate">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="user.name"
            :state="nameState"
            required
          />
        </b-form-group>
        <b-form-group
          label="description"
          label-for="description-input"
          invalid-feedback="description is required"
          :state="descriptionState"
        >
          <b-form-input
            id="name-input"
            type="description"
            v-model="user.description"
            :state="descriptionState"
            required
          />
        </b-form-group>
        <b-form-group
          label="created_at"
          label-for="description-input"
          invalid-feedback="created_at is required"
          :state="created_atState"
        >
          <b-form-input
            id="name-input"
            type="number"
            v-model="user.created_at"
            :state="created_atState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <!-- end Edit Modal -->
  </div>
</template>

<script>
import { db } from "./firebaseDb";
export default {
  name: "App",
  data() {
    return {
      userss: [],
      user: {
        name: "",
        description: "",
        created_at: "",
      },
      nameState: null,
      descriptionState: null,
      created_atState: null,

      field: [
        { key: "index", label: "No" },
        { key: "name", label: "Nama" },
        { key: "description", label: "Description" },
        { key: "created_at", label: "Created_at" },
        { key: "action", label: "Action" },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    deleteData(id) {
      if (window.confirm("kamu yakin mau hapus data ini?")) {
        db.collection("userss")
          .doc(id)
          .delete()
          .then(() => {
            alert("data berhasil dihapus");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.created_atState = valid;
      this.descriptionState = valid;

      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleEdit(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleUpdate();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      db.collection("userss")
        .add(this.user)
        .then(() => {
          alert("user berhasil dibuat");

          this.user.name = "";
          this.user.description = "";
          this.user.created_at = "";

          this.loadData();
        })
        .catch((err) => {
          console.log(err);
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    getOneData(data) {
      this.user.key = data.key;
      this.user.name = data.name;
      this.user.description = data.description;
      this.user.created_at = data.created_at;

      this.$refs["modal-edit"].show();
    },
    handleUpdate() {
      db.collection("userss")
        .doc(this.user.key)
        .update(this.user)
        .then(() => {
          alert("data berhasil diubah");
          delete this.user.key;
          this.$refs["modal-edit"].hide();

          // reset form value
          this.user.name = "";
          this.user.description = "";
          this.user.created_at = "";

          this.loadData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCancel() {
      delete this.user.key;
      this.user.name = "";
      this.user.description = "";
      this.user.created_at = "";
    },

    loadData() {
      db.collection("userss").onSnapshot((snapshotChange) => {
        this.userss = [];
        snapshotChange.forEach((doc) => {
          this.userss.push({
            key: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            created_at: doc.data().created_at,
          });
        });
      });
    },
  },
};
</script>
