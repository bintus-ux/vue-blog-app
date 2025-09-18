// src/types/blog.ts
export interface BlogPost {
  id: number
  title: string
  body: string
  userId?: number
  date?: Date
  author?: string
}

export interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  loading: boolean
  error: string | null
}
