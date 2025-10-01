<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFilesStore } from '@/stores/files';
const filesStore = useFilesStore();
const { parseFiles } = filesStore;

const router = useRouter();

function goToProjects() {
  parseFiles();
  router.push('/project');
}
</script>

<template>
  <button
    type="button"
    class="c-btn c-btn--primary c-btn--icon"
    @click="goToProjects"
  >
    Parse and go to projects
    <Icon name="fa7-solid:arrow-right" />
  </button>
</template>
