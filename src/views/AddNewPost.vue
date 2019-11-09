<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Blog Posts</span>
        <h3 class="page-title">Add New Post</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="9" md="12">
        <d-card class="card-small mb-3">
          <d-card-body>
            <d-form class="add-new-post">
              <d-input size="lg" class="mb-3" v-model="post.title" placeholder="Your Post Title" />
              <anp-editor @update="updateContent"/>
            </d-form>
          </d-card-body>
        </d-card>
      </d-col>

      <!-- Sidebar Widgets -->
      <d-col lg="3" md="12">
        <anp-sidebar-actions @publish="publishPost"/>
        <anp-sidebar-image-upload @change="handleFeaturedMediaUpload" @ />
        <anp-sidebar-categories />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import 'quill/dist/quill.snow.css';

import SidebarActions from '@/components/add-new-post/SidebarActions.vue';
import SidebarImageUpload from '@/components/add-new-post/SidebarImageUpload.vue';
import SidebarCategories from '@/components/add-new-post/SidebarCategories.vue';
import Editor from '@/components/add-new-post/Editor.vue';

import { db, storage } from '../services/firebase';

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default {
  components: {
    anpEditor: Editor,
    anpSidebarActions: SidebarActions,
    anpSidebarImageUpload: SidebarImageUpload,
    anpSidebarCategories: SidebarCategories,
  },
  data() {
    return {
      file: '',
      post: {
        date: '',
        modified: '',
        slug: '',
        publish: true,
        private: false,
        template: 'default',
        comments_status: false,
        sticky: false,
        type: 'post',
        link: '',
        title: '',
        content: '',
        featured_media: '',
        author: '',
        meta: {},
        categories: [],
        tags: [],
      },
    };
  },
  computed: {
    title() {
      return this.post.title; // watching below
    },
  },
  watch: {
    title() {
      this.post.slug = slugify(this.post.title);
    },
  },
  methods: {
    async publishPost() {
      const currentDate = Date.now();
      if (!this.post.date) {
        this.post.date = currentDate;
      }
      this.post.modified = currentDate;

      await this.uploadImage();

      this.addPost();
    },
    addPost() {
      db.collection('posts')
        .add(this.post)
        .then((docRef) => {
          console.log(`Doc written: ${docRef}`);
        }).catch((err) => {
          console.error(err);
        });
    },
    updateContent(content) {
      this.post.content = content;
    },
    handleFeaturedMediaUpload(file) {
      this.file = file;
    },
    uploadImage() {
      // Create a root reference
      const storageRef = storage.ref(`posts/${this.file.name}`);

      const uploadTask = storageRef.put(this.file);

      uploadTask.on('state_changed', () => {
        console.log('Uploading!');
      }, (error) => {
        // Handle unsuccessful upload
        console.log(error);
      }, () => {
        // Handle successful upload and complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.post.featured_media = downloadURL;
        });
      });
    },
  },
};
</script>
