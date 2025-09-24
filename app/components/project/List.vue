<script setup lang="ts">
import { useProjectStore } from '@/stores/projects';
const projectsStore = useProjectStore();
const { project } = storeToRefs(projectsStore);
</script>

<template>
  <ul class="c-list">
    <project-item
      v-for="(projectItem, index) in project"
      :key="index"
      :project="projectItem"
    />
  </ul>
</template>
