import type { Section } from '@@/types/section.type';
import type { Project } from '@@/types/project.type';
import { defineStore } from 'pinia';

export const useSectionsStore = defineStore('sections', () => {
  const sections = ref<Section[]>([]);
  const fetchingSections = ref<boolean>(false);

  function addSection(section: Section) {
    sections.value.push(section);
  }

  async function getSections(project: Project) {
    fetchingSections.value = true;
    resetSections();
    const url = `${project.url}wp-json/wp/v2/section?_fields=id,name&per_page=100`;
    try {
      const response = await $fetch<Section[]>(url);
      if (response) {
        response.forEach((section) => {
          addSection(section);
        });
      }
      fetchingSections.value = false;
    } catch (error) {
      fetchingSections.value = false;
      console.log(error);
    }
  }

  function resetSections() {
    sections.value = [];
  }

  return {
    sections,
    fetchingSections,
    addSection,
    getSections,
    resetSections,
  };
});
