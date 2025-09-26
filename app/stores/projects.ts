import { defineStore } from 'pinia';
import type { Project, ProjectData } from '@@/types/project.type';

export const useProjectStore = defineStore(
  'project',
  () => {
    const projects = ref<Project[]>([]);
    const fetchingProjects = ref<boolean>(false);

    const WPProjectId = ref<number>();

    const latestProjectId = computed(() => {
      return projects.value[projects.value.length - 1]?.id || 0;
    });

    function addProject(data: Project) {
      projects.value.push(data);
    }

    function addProjectData(id: number, data: ProjectData[]) {
      const projectIndex = projects.value.findIndex(
        (project) => project.id === id
      );
      if (projects.value[projectIndex]) {
        projects.value[projectIndex].projects = data;
      }
    }

    function getProject(id: number) {
      return projects.value.find((project) => project.id === id);
    }

    function removeProject(id: number) {
      projects.value = projects.value.filter((project) => project.id !== id);
    }

    function resetProjects() {
      projects.value = [];
    }

    async function getWPData(project: Project) {
      fetchingProjects.value = true;
      const url = `${project.url}/wp-json/wp/v2/project?_fields=name,id`;
      try {
        const response = await $fetch<ProjectData[]>(url);
        if (response) {
          addProjectData(project.id, response);
        }
        fetchingProjects.value = false;
      } catch (error) {
        console.log(error);
        fetchingProjects.value = false;
      }
    }

    return {
      projects,
      fetchingProjects,
      WPProjectId,
      latestProjectId,
      getProject,
      addProject,
      removeProject,
      resetProjects,
      getWPData,
    };
  },
  {
    persist: true,
  }
);
