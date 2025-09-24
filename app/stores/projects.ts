import { defineStore } from 'pinia';
import type { Project } from '@@/types/project.type';

export const useProjectStore = defineStore(
  'project',
  () => {
    const project = ref<Project[]>([]);

    const latestProjectId = computed(() => {
      return project.value[project.value.length - 1]?.id || 0;
    });

    function addProject(data: Project) {
      project.value.push(data);
    }

    function removeProject(id: number) {
      project.value = project.value.filter((project) => project.id !== id);
    }

    function resetProjects() {
      project.value = [];
    }

    async function getWPData(project: Project) {
      const url = `${project.url}/wp-json/wp/v2/project?_fields=name,id`;
      try {
        const response = await $fetch(url);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      project,
      latestProjectId,
      addProject,
      removeProject,
      resetProjects,
      getWPData,
    };
  },
  {
    persist: {
      pick: ['project'],
    },
  }
);
