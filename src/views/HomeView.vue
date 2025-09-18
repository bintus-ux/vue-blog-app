<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <div class="container">
      <section class="hero">
        <h1>Welcome to Vue Blog</h1>
        <p>A modern blog built with Vue.js to showcase the framework's capabilities</p>
        <router-link to="/blog" class="btn-primary">Explore Posts</router-link>
      </section>

      <section class="featured-posts">
        <h2>Featured Posts</h2>
        <div class="posts-grid">
          <BaseCard v-for="post in featuredPosts" :key="post.id" class="post-card">
            <h3>{{ post.title }}</h3>
            <p>{{ truncateText(post.body, 100) }}</p>
            <router-link :to="`/blog/${post.id}`" class="btn-secondary">Read More</router-link>
          </BaseCard>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BaseCard from '@/components/ui/BaseCard.vue'

const blogStore = useBlogStore()

const featuredPosts = computed(() => {
  return blogStore.posts.slice(0, 3)
})

onMounted(() => {
  if (blogStore.posts.length === 0) {
    blogStore.fetchPosts()
  }
})

const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
</script>

<style scoped>
.home-view {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.featured-posts {
  margin-bottom: 3rem;
}

.featured-posts h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card h3 {
  margin-top: 0;
}

.post-card p {
  flex-grow: 1;
  margin-bottom: 1rem;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
}

.btn-secondary:hover {
  background-color: #3498db;
  color: white;
}
</style>
