<script setup lang="ts">
import { useProjectStore } from '@/stores/projects';
import { useDropZone } from '@vueuse/core';

const files = ref<File[] | null>(null);

const imageDataUrls = ref<string[]>([]); // Reactive array to store image data URLs

// Watch for changes in files.value
watch(
  () => files.value,
  (newFiles) => {
    if (!newFiles || newFiles.length === 0) {
      imageDataUrls.value = [];
      return;
    }

    // Clear the previous data URLs
    imageDataUrls.value = [];

    // Process each file
    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Add the data URL to the array
        imageDataUrls.value.push(reader.result as string);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
  },
  { immediate: true } // Run immediately if files.value is already set
);

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
  /* if (target.files) {
    const newFiles = Array.from(target.files).filter(
      (file) => file.name.endsWith('.svg') || file.name.endsWith('.json')
    );
    //addFiles(newFiles);
  } */
};

// Handle files dropped via useDropZone
const onDrop = async (droppedFiles: File[] | null) => {
  if (!droppedFiles) return;
  files.value = droppedFiles;
  /* if (droppedFiles) {
    const newFiles = Array.from(droppedFiles).filter(
      (file) => file.name.endsWith('.svg') || file.name.endsWith('.json')
    );
    //addFiles(newFiles);
  } */
};

// useDropZone setup
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const projectStore = useProjectStore();
const projectData = projectStore.getProject(projectStore.latestProjectId);

const response = ref<any>(null);

function uploadToMediaLibrary() {
  if (!files.value) return;
  if (!projectData) return;

  const url = `${projectData.url}/wp-json/wp/v2/media`;
  const appUser = projectData.appUser;
  const appPassword = projectData.appPass;

  const auth = `Basic ${btoa(`${appUser}:${appPassword}`)}`;
  const uploaded = [];

  for (const file of files.value) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: auth,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        response.value = data;
        console.log(data);
        uploaded.push({
          id: data.id,
          url: data.source_url,
          name: data.title.rendered,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(uploaded);
}
</script>

<template>
  <div class="c-section c-section--main">
    <h1>Upload</h1>
    <div
      ref="dropZoneRef"
      class="c-drop-zone"
      :class="{ 'is-active': isOverDropZone }"
    >
      <input
        type="file"
        name=""
        id=""
        class="c-drop-zone__input"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
      />
      <Icon
        name="fa7-solid:file-upload"
        class="c-drop-zone__icon"
      />
      <p>Drag and drop image files here, or click to select files</p>
    </div>
    <img
      v-for="(imageDataUrl, index) in imageDataUrls"
      :key="index"
      :src="imageDataUrl"
      alt="Preview"
      style="max-width: 300px"
    />
    <p v-if="files">
      <button
        type="button"
        class="c-btn c-btn--primary c-btn--icon"
        @click="uploadToMediaLibrary"
      >
        <Icon name="fa7-solid:upload" />
        Upload to media library
      </button>
    </p>
    <pre v-if="response">
      {{ response }}
    </pre>
  </div>
</template>
