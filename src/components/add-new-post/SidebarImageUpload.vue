<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body>
      <div class="input-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" ref="file" @change="change" id="featuredMedia">
          <label class="custom-file-label" for="featuredMedia">{{ (file) ? file.name : 'Choose image' }}</label>
        </div>
      </div>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: 'sidebar-image-upload',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Image Upload',
    },
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    change() {
      this.file = this.$refs.file.files[0];
      this.$emit('change', this.file);
    },
  },
};
</script>
