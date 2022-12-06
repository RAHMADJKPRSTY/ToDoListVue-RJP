<template>
    <div class="card">
    
      <form ref="form" @submit.stop.prevent="handleSubmit" class="card-body" >
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            placeholder="Masukkan Nama"
            v-model="user.name"
            :state="nameState"
         
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
            placeholder="Masukkan Deskripsi"
            v-model="user.description"
            :state="descriptionState"
        
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
           
          />
        </b-form-group>
        <b-form-group>
          <input type="submit" value="Simpan" class="btn btn-success">
        </b-form-group>
      </form>
    </div>
</template>

<script>

import { db } from "@/firebaseDb";
export default {
    name: "add-data",
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
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.descriptionState = valid;
            this.created_atState = valid;
            return valid;
        },
        makeToast(variant = null) {
            this.$bvToast.toast("Data successfully created", {
                title: `Create userss`,
                variant: variant,
                solid: true,
            });
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
                    this.makeToast("success");
                    this.user.name = "";
                    this.user.description = "";
                    this.user.created_at = "";
                    this.nameState = null;
                    this.descriptionState = null;
                    this.created_atState = null;
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