<script lang="ts" setup>
import { useAnglesStore } from '@/stores/angles';
const anglesStore = useAnglesStore();
const { angles, uniqueShapeIds } = storeToRefs(anglesStore);
</script>

<template>
  <div class="c-section c-section--main">
    <h1>Angles</h1>
    <combine-shape-and-wordpress
      :shape-id="id"
      v-for="id in uniqueShapeIds"
    />
  </div>
</template>
