<template>
<div>
  <div class="container" v-for="(article, i) in articles" :key="i">
    <div class="card text-justify">
      <div class="card-body">
        <h4 class="card-title text-center">{{article.title}}</h4>
        <img class="content-center" :src="article.img">
        <p class="content card-text">{{article.content}}</p>
        Category: <p>{{article.category}}</p>
        <div class="text-right" v-if="id == article.author._id">
          <a href="#" class="btn btn-info" data-toggle="modal" data-target="#modalEdit" @click="modalEdit(article)">Edit</a>
          <a href="#" class="btn btn-danger" @click="remove(article._id)">Delete</a>
        </div>
      </div>
      <div class="card-footer text-muted content">
        author: <a href="">{{article.author.username}}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getByCategory', 'Game')
  },
  computed: {
    articles () {
      return this.$store.state.listByCategory
    }
  }
}
</script>

<style>

</style>
