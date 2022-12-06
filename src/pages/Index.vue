<template>
    <div id="app">
      
      <div class="container">
    <b-card-body>
      <b-input-group>
        <b-input-group-prepend class="mt-1 ml-5" style="margin-right: -80px">
          <span><i class="bi bi-search"></i></span>
        </b-input-group-prepend>
        <b-form-input
          class="form-control col-10 mx-auto"
          style="border-radius: 20px"
          type="search"
          v-model="searchQuery"
          placeholder="Search name"></b-form-input>
      </b-input-group>
    </b-card-body>
      </div>

      <div class="container">
        <div class="card">
          <div class="card-body">
            <b-table striped hover :fields="field" :items="resultQuery" show-empty v-if="$route.name !== 'edit-data'">
              <template v-slot:cell(index)="row">
                <p class="text-center">
                  {{ row.index + 1 }}
                </p>
              </template>
              <template v-slot:cell(action)="row">

                <router-link class="btn btn-warning mr-2" 
                :to="{name: 'edit-data', params: { id: row.item.key}}">
                Edit
                </router-link>
  
                <button @click="deleteData(row.item.key)" class="btn btn-danger" >
                  Delete
                </button>

                <router-link class="btn btn-success ml-2" 
                :to="{name: 'detail-data', params: { id: row.item.key}}">
                Detail
                </router-link>
              </template>

            </b-table>
          </div>
        </div>
      </div>
      </div>
  </template>
  
  <script>
import { db } from "../firebaseDb";
export default {
  name: "home-layar",
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
      searchQuery: null,

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
      if (window.confirm("Yakin ingin hapus?")) {
        db.collection("userss")
          .doc(id)
          .delete()
          .then(() => {
            this.makeToast("danger");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
    makeToast(variant = null) {
      this.$bvToast.toast("Data deleted", {
        title: `Delete userss`,
        variant: variant,
        solid: true,
      });
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.userss.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.userss;
      }
    },
  },
};
</script>