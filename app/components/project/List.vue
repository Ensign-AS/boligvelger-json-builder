<script setup lang="ts">
import { useProjectStore } from '@/stores/projects';
const projectsStore = useProjectStore();
const { projects } = storeToRefs(projectsStore);
</script>

<template>
  <ul class="c-list c-list--horizontal">
    <project-item
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
    />
  </ul>
</template>
