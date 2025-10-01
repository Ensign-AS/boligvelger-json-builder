<script setup lang="ts">
import { useAnglesStore } from '@/stores/angles';
const anglesStore = useAnglesStore();
const { angles } = storeToRefs(anglesStore);
const { copyToClipboard } = anglesStore;
</script>

<template>
  <div class="c-section c-section--main">
    <h1>Output</h1>
    <p>
      Click the button to copy data to the clipboard for pasting into WordPress.
    </p>
    <p>
      <button
        type="button"
        class="c-btn c-btn--primary c-btn--icon"
        @click="copyToClipboard"
      >
        <Icon name="fa7-solid:clipboard-check" />
        Copy to clipboard
      </button>
    </p>
    <pre>{{ angles }}</pre>
  </div>
</template>
