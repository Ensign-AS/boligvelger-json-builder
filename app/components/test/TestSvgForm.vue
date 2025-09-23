<script setup lang="ts">
import type { SvgShape } from '@@/types/svgtypes.type';
import { useSvgParser } from '@/composables/useSvgParser';

const { parseSvg } = useSvgParser();

const svg = ref<string>();
const parsed = ref<SvgShape[]>([]);

/* const parsedSvg = computed(() => {
  if (!svg.value) return null;
  return parseSvg(svg.value);
}); */

function updateParsed() {
  if (svg.value) {
    parsed.value = parseSvg(svg.value);
  }
}
</script>

<template>
  <div class="test-svg-form">
    <div>
      <h1>Input</h1>
      <textarea
        v-model="svg"
        rows="20"
        cols="80"
      />
      <button
        v-if="svg"
        @click="updateParsed"
      >
        Parse
      </button>
    </div>
    <div class="output">
      <h1>Output</h1>
      <pre
        v-if="parsed.length > 0"
        class="_parsed"
      >
        {{ parsed }}
      </pre>
    </div>
  </div>
</template>

<style scoped>
.test-svg-form {
  display: flex;
  gap: 2em;
}

textarea {
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 4px;
  padding: 0.5em 1em;
  display: block;
  margin-block: 1em;
}

._parsed {
  max-width: 100ch;
  white-space: pre-wrap;
}

.output {
  max-height: 100vh;
  overflow: auto;
}
</style>
