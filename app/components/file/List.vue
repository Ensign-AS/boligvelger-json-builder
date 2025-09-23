<script setup lang="ts">
import { useFilesStore } from '@/stores/files';
import { storeToRefs } from 'pinia';

/** Pinia store for file management. */
const filesStore = useFilesStore();
const { files } = storeToRefs(filesStore);
</script>

<template>
  <ul class="c-list">
    <file-item
      v-for="(file, index) in files"
      :key="index"
      :file="file"
    />
  </ul>
</template>
