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
          <p class="card-text">{{article.content}}</p>
          <div class="text-right">
            <a href="#" class="btn btn-info">Edit</a>
            <a href="#" class="btn btn-danger">Delete</a>
          </div>
        </div>
        <div class="card-footer text-muted">
          <footer class="blockquote-footer">author <cite title="Source Title">{{article.author.username}}</cite></footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  created () {
    this.$store.dispatch('getAllArticles')
  },
  computed: {
    articles () {
      return this.$store.state.listArticles
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
</style>
