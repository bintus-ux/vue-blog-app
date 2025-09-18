<!-- src/components/blog/BlogList.vue -->
<template>
  <div class="blog-list">
    <div v-for="post in posts" :key="post.id" class="blog-item">
      <BaseCard>
        <div class="blog-item-content">
          <h2>{{ post.title }}</h2>
          <p>{{ truncateText(post.body, 150) }}</p>
          <div class="blog-item-actions">
            <router-link :to="`/blog/${post.id}`" class="btn-secondary">Read More</router-link>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard.vue'

export default {
  name: 'BlogList',
  components: {
    BaseCard,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    truncateText(text, length) {
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    },
  },
}
</script>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-item-content {
  padding: 20px;
}

.blog-item h2 {
  margin-top: 0;
  color: #2c3e50;
}

.blog-item p {
  color: #666;
  line-height: 1.6;
}

.blog-item-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
