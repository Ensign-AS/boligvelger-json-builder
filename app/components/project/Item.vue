<script setup lang="ts">
import type { Project } from '@@/types/project.type';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <li class="c-list__item">
    <nuxt-link
      :to="`/project/${project.id}`"
      class="c-list__item__name c-btn c-btn--primary c-btn--icon"
    >
      <Icon
        name="fa7-solid:house"
        class="c-btn__icon"
      />
      {{ project.name }}
    </nuxt-link>
  </li>
</template>
