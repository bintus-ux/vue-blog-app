// src/stores/blog.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import type { BlogPost, BlogState } from '@/types/blog'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const currentPost = ref<BlogPost | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const { fetchData } = useApi()

  const fetchPosts = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchData<BlogPost[]>('https://jsonplaceholder.typicode.com/posts')
      posts.value = data.slice(0, 10).map((post) => ({
        ...post,
        date: new Date(),
        author: 'Vue Developer',
      }))
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const fetchPost = async (id: number): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchData<BlogPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      currentPost.value = {
        ...data,
        date: new Date(),
        author: 'Vue Developer',
      }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const addPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
    const newPost: BlogPost = {
      id: posts.value.length + 1,
      ...post,
      userId: 1,
    }
    posts.value.unshift(newPost)
    return newPost
  }

  return {
    posts,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchPost,
    addPost,
  }
})
