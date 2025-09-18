<!-- src/views/BlogView.vue -->
<template>
  <div class="blog-view">
    <div class="container">
      <h1>Blog Posts</h1>

      <BaseSpinner v-if="loading" />

      <div v-else-if="error" class="error-message">
        <p>Error loading posts: {{ error }}</p>
        <button @click="fetchPosts" class="btn-primary">Try Again</button>
      </div>

      <div v-else class="posts-list">
        <BlogList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogList from '@/components/blog/BlogList.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

export default {
  name: 'BlogView',
  components: {
    BlogList,
    BaseSpinner,
  },
  setup() {
    const blogStore = useBlogStore()

    const posts = computed(() => blogStore.posts)
    const loading = computed(() => blogStore.loading)
    const error = computed(() => blogStore.error)

    const fetchPosts = () => {
      blogStore.fetchPosts()
    }

    onMounted(() => {
      if (blogStore.posts.length === 0) {
        fetchPosts()
      }
    })

    return {
      posts,
      loading,
      error,
      fetchPosts,
    }
  },
}
</script>

<style scoped>
.blog-view {
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.error-message {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}

.posts-list {
  margin-top: 2rem;
}
</style>
