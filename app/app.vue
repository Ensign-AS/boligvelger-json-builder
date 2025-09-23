<script setup lang="ts">
import { useAnglesStore } from '@/stores/angles';
import { storeToRefs } from 'pinia';

/** Pinia store for angles. */
const anglesStore = useAnglesStore();
const { angles } = storeToRefs(anglesStore);
</script>

<template>
  <div style="height: 100%">
    <TheHeader />
    <file-upload-section />
  </div>
</template>
