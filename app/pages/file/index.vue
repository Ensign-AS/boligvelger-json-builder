<script setup lang="ts">
import { useFilesStore } from '@/stores/files';
import { storeToRefs } from 'pinia';

/** Pinia store for file management. */
const filesStore = useFilesStore();
const { files } = storeToRefs(filesStore);

const numberOfFiles = computed(() => {
  return files.value.length;
});
</script>

<template>
  <section class="c-section c-section--main c-section--gap">
    <h1>Upload files</h1>
    <file-drop-zone />
    <div v-if="numberOfFiles">
      <h3>{{ numberOfFiles }} files</h3>
      <file-list />
      <hr />
      <file-parse-button />
    </div>
  </section>
</template>
