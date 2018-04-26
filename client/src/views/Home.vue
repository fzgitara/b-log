<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">B-log</h1>
        <p class="lead">Share everything from everyone</p>
      </div>
    </div>
    <div class="container" v-for="(article, i) in articles" :key="i">
      <div class="card text-justify">
        <div class="card-body">
          <h4 class="card-title text-center">{{article.title}}</h4>
          <p class="content card-text">{{article.content}}</p>
          <a href="">{{article.category}}</a>
          <div class="text-right" v-if="id == article.author._id">
            <a href="#" class="btn btn-info" data-toggle="modal" data-target="#modalEdit" @click="modalEdit(article._id)">Edit</a>
            <a href="#" class="btn btn-danger" @click="remove(article._id)">Delete</a>
          </div>
        </div>
        <div class="card-footer text-muted content">
          <footer class="blockquote-footer">author <cite title="Source Title">{{article.author.username}}</cite></footer>
        </div>
      </div>
    </div>
    <!-- MODAL EDIT -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Article</h5>
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
            <button type="button" class="btn btn-primary" @click="update">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      id: localStorage.getItem('id'),
      articleId: '',
      title: '',
      content: '',
      category: ''
    }
  },
  created () {
    this.$store.dispatch('getAllArticles')
  },
  computed: {
    articles () {
      return this.$store.state.listArticles
    }
  },
  methods: {
    remove (payload) {
      this.$store.dispatch('remove', payload)
    },
    modalEdit (payload) {
      this.articleId = payload
    },
    update () {
      let payload = {
        id: this.articleId,
        title: this.title,
        content: this.content,
        category: this.category
      }
      this.$store.dispatch('update', payload)
    }
  }
}
</script>

<style scoped>
.jumbotron {
  margin-top: 3rem;
}
.btn {
  margin: 0px 5px;
}
.content {
  font-size: 20px;
}
</style>
