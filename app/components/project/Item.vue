<script setup lang="ts">
import type { Project } from '@@/types/project.type';
import { useProjectStore } from '@/stores/projects';
const projectsStore = useProjectStore();
const { removeProject } = projectsStore;

defineProps<{
  project: Project;
}>();
</script>

<template>
  <li class="c-list__item">
    <span class="c-list__item__name">{{ project.name }}</span>
    <button
      class="c-btn c-btn--icon c-list__item__button"
      @click="removeProject(project.id)"
    >
      <Icon
        name="fa7-solid:trash"
        class="c-list__item__icon"
      />
    </button>
  </li>
</template>
