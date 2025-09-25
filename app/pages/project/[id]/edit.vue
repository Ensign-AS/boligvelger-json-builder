<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/projects';
const projectsStore = useProjectStore();
const { projects } = storeToRefs(projectsStore);

const route = useRoute();
const projectId = Number(route.params.id);
const project = computed(() => {
  return projects.value.find((project) => project.id === projectId);
});
</script>

<template>
  <section
    class="c-section c-section--main"
    v-if="project"
  >
    <h1>Edit project</h1>
    <p>Edit the project below.</p>
    <project-edit />
    <NuxtLink
      :to="`/project/${projectId}`"
      class="c-btn c-btn--secondary c-btn--icon"
    >
      <Icon
        name="fa7-solid:arrow-left"
        class="c-btn__icon"
      />
      Back to project
    </NuxtLink>
  </section>
  <project-missing v-else />
</template>
