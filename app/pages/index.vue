<script setup lang="ts">
import { useAnglesStore } from '@/stores/angles';
import { storeToRefs } from 'pinia';

/** Pinia store for angles. */
const anglesStore = useAnglesStore();
const { angles } = storeToRefs(anglesStore);

const projectsStore = useProjectStore();
const { projects } = storeToRefs(projectsStore);
const { getWPData } = projectsStore;

const wp = ref({
  id: 748,
  name: 'Rådhusmarka',
  url: 'https://raadhusmarka.no/',
});
</script>

<template>
  <div style="height: 100%">
    <file-upload-section />
    <button
      type="button"
      @click="getWPData(wp)"
      class="c-btn c-btn--primary"
    >
      Get data
    </button>
    <test-wordpress-section />
  </div>
</template>
