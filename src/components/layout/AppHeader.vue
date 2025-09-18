<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        <h1>Vue Blog</h1>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
        <router-link to="/admin" class="nav-link">Admin</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic can go here
</script>

<style scoped>
.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
