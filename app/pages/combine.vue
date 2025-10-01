<script lang="ts" setup>
import { useAnglesStore } from '@/stores/angles';
const anglesStore = useAnglesStore();
const { angles, uniqueShapeIds } = storeToRefs(anglesStore);
</script>

<template>
  <div class="c-section c-section--main">
    <h1>Match shapes to properties or sections</h1>
    <p>
      For each shape ID choose if it is a property or a section, then select the
      property or section in the drop down.
    </p>
    <combine-shape-and-wordpress
      :shape-id="id"
      v-for="id in uniqueShapeIds"
    />
    <p>
      <nuxt-link
        to="/output"
        class="c-btn c-btn--tertiary c-btn--icon"
        >Continue <Icon name="fa7-solid:arrow-right"
      /></nuxt-link>
    </p>
  </div>
</template>
