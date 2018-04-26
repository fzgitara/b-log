<template>
<div>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#"><img src="../assets/logo.png"> B-log</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <button id="nav-button" type="button" class="btn btn-dark d-block d-md-none" data-toggle="modal" data-target="#modalAdd" v-if="token">Add Article</button>
      <button id="nav-button" type="button" class="btn btn-dark d-block d-md-none" @click="logout" v-if="token">Logout</button>
      <button id="nav-button" type="button" class="btn btn-dark d-block d-md-none" data-toggle="modal" data-target="#modalRegister" v-if="!token">Register</button>
      <button id="nav-button" type="button" class="btn btn-dark d-block d-md-none" data-toggle="modal" data-target="#modalLogin" v-if="!token">Login</button>
    </div>
      <button id="nav-button" type="button" class="btn btn-dark d-none d-md-block" data-toggle="modal" data-target="#modalAdd" v-if="token">Add Article</button>
      <button id="nav-button" type="button" class="btn btn-dark d-none d-md-block" @click="logout" v-if="token">Logout</button>
      <button id="nav-button" type="button" class="btn btn-dark d-none d-md-block" data-toggle="modal" data-target="#modalRegister" v-if="!token">Register</button>
      <button id="nav-button" type="button" class="btn btn-dark d-none d-md-block" data-toggle="modal" data-target="#modalLogin" v-if="!token">Login</button>
  </nav>
  <!-- MODAL LOGIN-->
  <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputName1">Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" style="color: white !important; border-color: gray !important;">Close</button>
          <button type="button" class="btn btn-ligth" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL REGISTER-->
  <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputName1">Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" style="color: white !important; border-color: gray !important;">Close</button>
          <button type="button" class="btn btn-ligth" @click="register">Register</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL ADD -->
  <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Article</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="title" placeholder="Title">
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea rows="5" class="form-control" v-model="content" placeholder="Content"></textarea>
              </div>
              <div class="form-group">
                <label>Category</label>
                <input type="text" class="form-control" v-model="category" placeholder="Category">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="create">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      username: '',
      password: '',
      title: '',
      content: '',
      category: ''
    }
  },
  methods: {
    register () {
      let payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    login () {
      let payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    },
    logout () {
      this.$store.dispatch('logout')
    },
    create () {
      let payload = {
        title: this.title,
        content: this.content,
        category: this.category
      }
      this.$store.dispatch('create', payload)
    }
  }
}
</script>

<style>
img {
  max-width: 2rem;
}
.card {
  margin: 2rem 0rem;
}
</style>
