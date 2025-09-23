<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { useFilesStore } from '@/stores/files';

/** Pinia store for file management. */
const filesStore = useFilesStore();
const { addFiles } = filesStore;

/** Reference to the drop zone DOM element. */
const dropZoneRef = ref<HTMLElement | null>(null);

/** Reference to the file input DOM element. */
const fileInput = ref<HTMLInputElement | null>(null);

// Handle file selection via click
const onClick = () => {
  fileInput.value?.click();
};

// Handle file selection via input
const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files).filter(
      (file) => file.name.endsWith('.svg') || file.name.endsWith('.json')
    );
    addFiles(newFiles);
  }
};

// Handle files dropped via useDropZone
const onDrop = async (droppedFiles: File[] | null) => {
  if (droppedFiles) {
    const newFiles = Array.from(droppedFiles).filter(
      (file) => file.name.endsWith('.svg') || file.name.endsWith('.json')
    );
    addFiles(newFiles);
  }
};

// useDropZone setup
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <div
    ref="dropZoneRef"
    :class="{ 'is-active': isOverDropZone }"
    class="c-drop-zone"
    @click="onClick"
  >
    <input
      class="c-drop-zone__input"
      ref="fileInput"
      type="file"
      multiple
      accept=".svg,.json"
      @change="onFileChange"
    />
    <Icon
      name="fa7-solid:file-upload"
      class="c-drop-zone__icon"
    />
    <p>Drag and drop .svg or .json files here, or click to select files</p>
  </div>
</template>
