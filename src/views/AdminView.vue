<!-- src/views/AdminView.vue -->
<template>
  <div class="admin-view">
    <div class="container">
      <h1>Admin Panel</h1>

      <div class="admin-content">
        <section class="add-post-section">
          <h2>Add New Post</h2>
          <form @submit.prevent="handleSubmit" class="post-form">
            <div class="form-group">
              <label for="title">Title</label>
              <input id="title" v-model="newPost.title" type="text" required class="form-input" />
            </div>

            <div class="form-group">
              <label for="content">Content</label>
              <textarea
                id="content"
                v-model="newPost.body"
                required
                rows="6"
                class="form-textarea"
              ></textarea>
            </div>

            <button type="submit" class="btn-primary" :disabled="submitting">
              {{ submitting ? 'Adding...' : 'Add Post' }}
            </button>

            <div v-if="submitError" class="error-message">
              {{ submitError }}
            </div>

            <div v-if="submitSuccess" class="success-message">Post added successfully!</div>
          </form>
        </section>

        <section class="existing-posts">
          <h2>Existing Posts ({{ posts.length }})</h2>
          <div class="posts-list">
            <div v-for="post in posts" :key="post.id" class="post-item">
              <h3>{{ post.title }}</h3>
              <p>{{ truncateText(post.body, 100) }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import type { BlogPost } from '@/types/blog'

interface NewPost {
  title: string
  body: string
}

const blogStore = useBlogStore()
const newPost = ref<NewPost>({
  title: '',
  body: '',
})
const submitting = ref<boolean>(false)
const submitError = ref<string>('')
const submitSuccess = ref<boolean>(false)

const posts = computed(() => blogStore.posts)

onMounted(() => {
  if (blogStore.posts.length === 0) {
    blogStore.fetchPosts()
  }
})

const handleSubmit = async (): Promise<void> => {
  submitting.value = true
  submitError.value = ''
  submitSuccess.value = false

  try {
    blogStore.addPost(newPost.value)
    submitSuccess.value = true
    newPost.value = { title: '', body: '' }

    // Clear success message after 3 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  } catch (error) {
    submitError.value = (error as Error).message
  } finally {
    submitting.value = false
  }
}

const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
</script>

<style scoped>
.admin-view {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.admin-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.add-post-section,
.existing-posts {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.form-textarea {
  resize: vertical;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}

.success-message {
  color: #27ae60;
  margin-top: 1rem;
}

.posts-list {
  margin-top: 1rem;
}

.post-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.post-item:last-child {
  border-bottom: none;
}

.post-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.post-item p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .admin-content {
    grid-template-columns: 1fr;
  }
}
</style>
