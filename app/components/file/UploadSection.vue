<script setup lang="ts">
import { useFilesStore } from '@/stores/files';
import { storeToRefs } from 'pinia';

/** Pinia store for file management. */
const filesStore = useFilesStore();
const { files } = storeToRefs(filesStore);
</script>

<template>
  <section class="c-section c-upload-section">
    <h2>Upload files</h2>
    <file-drop-zone />
    <file-list v-if="files.length > 0" />
    <file-parse-button v-if="files.length > 0" />
  </section>
</template>
