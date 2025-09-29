<script lang="ts" setup>
import { useAnglesStore } from '@/stores/angles';
const anglesStore = useAnglesStore();
const { angles, uniqueShapeIds } = storeToRefs(anglesStore);
</script>

<template>
  <div class="test">
    <h1>Angles</h1>
    <div v-for="id in uniqueShapeIds">
      <test-combiner :shape-id="id" />
    </div>
  </div>
</template>
