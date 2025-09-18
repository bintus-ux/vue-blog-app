<!-- src/views/PostView.vue -->
<template>
  <div class="post-view">
    <div class="container">
      <router-link to="/blog" class="back-link">← Back to Blog</router-link>

      <BaseSpinner v-if="loading" />

      <div v-else-if="error" class="error-message">
        <p>Error loading post: {{ error }}</p>
        <button @click="fetchPost(Number($route.params.id))" class="btn-primary">Try Again</button>
      </div>

      <article v-else-if="post" class="blog-post">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span v-if="post.date">Published: {{ formatDate(post.date) }}</span>
          <span v-if="post.author">By: {{ post.author }}</span>
        </div>
        <p>{{ post.body }}</p>
      </article>

      <div v-else class="not-found">
        <h2>Post not found</h2>
        <p>The post you're looking for doesn't exist.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const route = useRoute()
const blogStore = useBlogStore()

const post = computed(() => blogStore.currentPost)
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

const fetchPost = (id: number): void => {
  blogStore.fetchPost(id)
}

onMounted(() => {
  const postId = Number(route.params.id)
  if (postId) {
    fetchPost(postId)
  }
})

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchPost(Number(newId))
    }
  },
)

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.post-view {
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #3498db;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.error-message {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}

.blog-post {
  line-height: 1.6;
}

.blog-post h1 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;
}

.not-found {
  text-align: center;
  padding: 3rem 0;
}
</style>
