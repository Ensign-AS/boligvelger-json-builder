<script setup lang="ts">
import { useFilesStore } from '@/stores/files';
const filesStore = useFilesStore();
const { parseFiles } = filesStore;
</script>

<template>
  <button
    type="button"
    class="c-btn c-btn--primary"
    @click="parseFiles"
  >
    Parse
  </button>
</template>
