<script setup lang="ts">
import { useProjectStore } from '@/stores/projects';
const projectsStore = useProjectStore();
const { latestProjectId } = storeToRefs(projectsStore);
const { addProject } = projectsStore;

const projectName = ref<string>('');
const projectUrl = ref<string>('');
const projectDescription = ref<string>('');
const projectAppUser = ref<string>('');
const projectAppPass = ref<string>('');

function onSubmit() {
  addProject({
    id: latestProjectId.value + 1,
    name: projectName.value,
    url: projectUrl.value,
    description: projectDescription.value,
    appUser: projectAppUser.value,
    appPass: projectAppPass.value,
  });
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="c-new-project"
  >
    <label
      for="projectName"
      class="c-new-project__label"
    >
      Project name*
    </label>
    <input
      type="text"
      v-model="projectName"
      id="projectName"
      class="c-new-project__input"
      required
    />
    <label
      for="projectUrl"
      class="c-new-project__label"
    >
      Project url*
    </label>
    <input
      type="url"
      v-model="projectUrl"
      id="projectUrl"
      class="c-new-project__input"
      required
    />
    <label
      for="projectDescription"
      class="c-new-project__label"
    >
      Project description
    </label>
    <textarea
      v-model="projectDescription"
      id="projectDescription"
      class="c-new-project__input"
    />
    <label
      for="projectAppUser"
      class="c-new-project__label"
    >
      App user
    </label>
    <input
      type="text"
      v-model="projectAppUser"
      id="projectAppUser"
      class="c-new-project__input"
    />
    <label
      for="projectAppPass"
      class="c-new-project__label"
    >
      App pass
    </label>
    <input
      type="text"
      v-model="projectAppPass"
      id="projectAppPass"
      class="c-new-project__input"
    />
    <button
      type="submit"
      class="c-btn c-btn--primary c-new-project__button"
    >
      Add project
    </button>
  </form>
</template>
