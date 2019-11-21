<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Table of posts</span>
        <h3 class="page-title">Blog Posts</h3>
      </div>
    </div>

    <!-- Dynamic Row of Posts -->
    <!--<d-row>-->
      <!--<d-col v-for="(post, idx) in posts" :key="idx" lg="3" md="6" sm="12" class="mb-4">-->
        <!--<d-card class="card-small card-post card-post&#45;&#45;1">-->
          <!--<div class="card-post__image" :style="{ backgroundImage: 'url(\'' + post.featured_media + '\')' }">-->
            <!--<d-badge pill :class="['card-post__category', 'bg-' + post.template ]">Hardcode Category</d-badge>-->
            <!--&lt;!&ndash;<div class="card-post__author d-flex">&ndash;&gt;-->
              <!--&lt;!&ndash;<a href="#" class="card-post__author-avatar card-post__author-avatar&#45;&#45;small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by {{ post.author }}</a>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--</div>-->
          <!--<d-card-body>-->
            <!--<h5 class="card-title">-->
              <!--<a href="#" class="text-fiord-blue">{{ post.title }}</a>-->
            <!--</h5>-->
            <!--<p class="card-text d-inline-block mb-3" v-html="post.content"></p>-->
            <!--<p class="text-muted">{{ new Date(post.date).toLocaleDateString() }}</p>-->
          <!--</d-card-body>-->
        <!--</d-card>-->
      <!--</d-col>-->
    <!--</d-row>-->

    <!--Table of Posts-->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom d-flex justify-content-between">
            <h6 class="m-0">All Created Posts</h6>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0" id="table">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Cover</th>
                  <th scope="col" class="border-0">Title</th>
                  <th scope="col" class="border-0">Author</th>
                  <th scope="col" class="border-0">Categories</th>
                  <th scope="col" class="border-0">Updated date</th>
                  <th scope="col" class="border-0">Status</th>
                  <th scope="col" class="border-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="n in 4">
                  <tr v-for="(post, idx) in posts" :key="idx" class="noselect">
                    <td class="text-truncate"><img :src="post.featured_media" alt="Cover image" class="rounded-circle border border-light" width="48px"></td>
                    <td class="text-truncate">{{ post.title }}</td>
                    <td class="text-truncate">{{ post.author }}</td>
                    <td class="text-truncate"><d-badge outline pill theme="secondary" class="mr-2" v-for="category in post.categories" :key="category">{{ category }}</d-badge></td>
                    <td class="text-truncate">{{ new Date(post.date).toLocaleDateString() }}</td>
                    <td class="text-truncate">{{ post.publish ? 'Publish' : 'Draft' }}</td>
                    <td class="text-truncate">
                      <span class="cursor-pointer px-2" @click="handleEdit(post.id)">
                        <span class="text-light"><i class="material-icons">edit</i></span>
                      </span>
                      <span class="cursor-pointer px-2" @click="handleDelete(post.id)">
                        <span class="text-danger"><i class="material-icons">delete</i></span>
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </d-container>
</template>

<script>
// First Row of Posts
import { db } from '../services/firebase';

const collectionPosts = db.collection('posts');

export default {
  data() {
    return {
      posts: [],
    };
  },
  // created() {
  //   console.log(this.posts);
  // },
  firestore: {
    posts: collectionPosts,
  },
  methods: {
    handleDelete(id) {
      alert(`Delete post id: ${id}`); // eslint-disable-line no-alert
    },
    handleEdit(id) {
      alert(`Editing post id: ${id}`); // eslint-disable-line no-alert
    },
  },
  created() {
    collectionPosts.get().then(() => {
      // do something
    });
  },
};
</script>

<style>
  td {
    vertical-align: middle !important;
  }
  i {
    font-size: 20px !important;
  }
</style>
