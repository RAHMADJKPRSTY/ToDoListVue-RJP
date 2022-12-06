<template>
    <div class="card">
    <div class="card-body">

      
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
          label="Description"
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
          label="Created_at"
          label-for="description-input"
          invalid-feedback="created_at is required"
          :state="created_atState"
        >
          <b-form-input
            id="name-input"
            type="date"
            v-model="user.created_at"
            :state="created_atState"
            required
            
          />
        </b-form-group>
        <b-form-group>
          <input type="submit" value="Simpan" class="btn btn-success">
        </b-form-group>
      </form>
    </div>
    </div>
  </template>

<script>
import { db } from "@/firebaseDb";
export default {
    name: "edit-data",
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
        };
    },
    created() {
        let dbRef = db.collection("userss").doc(this.$route.params.id);
        dbRef
            .get()
            .then((doc) => {
                this.user = doc.data();
                console.log(this.user);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.created_atState = valid;
            this.descriptionState = valid;
            return valid;
        },
        getOneData(data) {
            this.user.key = data.key;
            this.user.name = data.name;
            this.user.description = data.description;
            this.user.created_at = data.created_at;
            this.$refs["modal-edit"].show();
        },
        makeToast(variant = null) {
            this.$bvToast.toast("Data successfully edited", {
                title: `Edit userss`,
                variant: variant,
                solid: true,
            });
        },
        handleUpdate() {
            if (!this.checkFormValidity()) {
                return;
            }
            db.collection("userss")
                .doc(this.$route.params.id)
                .update(this.user)
                .then(() => {
                    this.makeToast("warning");
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
            this.$router.push({ name: "home-layar" });
        },
    },
};
</script>