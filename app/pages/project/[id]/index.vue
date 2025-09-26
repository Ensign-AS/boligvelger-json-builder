<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/projects';
import { usePropertiesStore } from '@/stores/properties';
const projectsStore = useProjectStore();
const { projects, fetchingProjects, WPProjectId } = storeToRefs(projectsStore);
const { getWPData } = projectsStore;

const propertiesStore = usePropertiesStore();
const { fetchingProperties, properties } = storeToRefs(propertiesStore);
const { getProperties } = propertiesStore;

const sectionsStore = useSectionsStore();
const { fetchingSections, sections } = storeToRefs(sectionsStore);
const { getSections } = sectionsStore;

const route = useRoute();
const projectId = Number(route.params.id);
const project = computed(() => {
  return projects.value.find((project) => project.id === projectId);
});
</script>

<template>
  <section
    class="c-section c-section--main"
    v-if="project"
  >
    <h1>
      <a
        :href="project.url"
        target="_blank"
      >
        {{ project.name }}
      </a>
    </h1>
    <p v-if="project.description">{{ project.description }}</p>
    <p v-if="project.appUser && project.appPass">
      App user: {{ project.appUser }}<br />
      App pass: {{ project.appPass }}
    </p>
    <div>
      <h3>Project data</h3>
      <p v-if="project.projects && project.projects.length > 0">
        Choose which project from which to fetch properties and sections.
      </p>
      <p v-else>Click to add project data fromt he WordPress website.</p>
      <ul
        v-if="project.projects && project.projects.length > 0"
        class="c-horizontal-list"
      >
        <li
          v-for="(projectData, index) in project.projects"
          :key="index"
        >
          <label
            :for="`project-${projectData.id}`"
            class="c-btn c-btn--icon"
            :class="{
              'c-btn--primary': projectData.id === WPProjectId,
              'c-btn--secondary': projectData.id !== WPProjectId,
            }"
          >
            <input
              type="radio"
              :id="`project-${projectData.id}`"
              name="project"
              :value="projectData.id"
              v-model="WPProjectId"
              class="c-btn__input c-btn__input--radio"
            />
            <Icon
              name="fa7-regular:circle-dot"
              v-if="projectData.id === WPProjectId"
              class="c-btn__icon"
            />
            <Icon
              name="fa7-regular:circle"
              v-else
              class="c-btn__icon"
            />
            {{ projectData.name }}
          </label>
        </li>
      </ul>
      <p class="c-horizontal-list">
        <button
          type="button"
          @click="getWPData(project)"
          class="c-btn c-btn--icon"
          :class="{
            'c-btn--primary':
              !project.projects || project.projects?.length === 0,
            'c-btn--tertiary': project.projects && project.projects.length > 0,
          }"
        >
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon a-rotate"
            v-if="fetchingProjects"
          />
          <Icon
            name="fa7-solid:download"
            class="c-btn__icon"
            v-else-if="!project.projects || project.projects?.length === 0"
          />
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon"
            v-else
          />
          <template v-if="!project.projects || project.projects?.length === 0">
            Get project data
          </template>
          <template v-else> Update project data </template>
        </button>
        <button
          v-if="WPProjectId"
          type="button"
          class="c-btn c-btn--icon c-btn--primary"
          @click="getProperties(project, WPProjectId)"
        >
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon a-rotate"
            v-if="fetchingProperties"
          />
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon"
            v-else-if="properties.length > 0"
          />
          <Icon
            name="fa7-solid:house"
            class="c-btn__icon"
            v-else
          />
          Get properties
        </button>
        <button
          type="button"
          class="c-btn c-btn--primary c-btn--icon"
          @click="getSections(project)"
        >
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon a-rotate"
            v-if="fetchingSections"
          />
          <Icon
            name="fa7-solid:sync"
            class="c-btn__icon"
            v-else-if="sections.length > 0"
          />
          <Icon
            name="fa7-solid:building"
            class="c-btn__icon"
            v-else
          />
          Get Sections
        </button>
      </p>
    </div>

    <hr />

    <div class="c-horizontal-list">
      <nuxt-link
        to="/project"
        class="c-btn c-btn--secondary c-btn--icon"
      >
        <Icon
          name="fa7-solid:arrow-left"
          class="c-btn__icon"
        />
        Back to projects
      </nuxt-link>
      <nuxt-link
        :to="`/project/${project.id}/edit`"
        class="c-btn c-btn--secondary c-btn--icon"
      >
        <Icon
          name="fa7-solid:pen"
          class="c-btn__icon"
        />
        Edit project
      </nuxt-link>
      <a
        :href="project.url"
        target="_blank"
        class="c-btn c-btn--tertiary c-btn--icon"
      >
        <Icon
          name="fa7-solid:external-link"
          class="c-btn__icon"
        />
        Open website in new tab
      </a>
    </div>
  </section>
  <project-missing v-else />
</template>
