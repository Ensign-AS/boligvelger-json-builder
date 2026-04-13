import type { Section } from "@@/types/section.type";
import type { Project } from "@@/types/project.type";
import { defineStore } from "pinia";

export const useSectionsStore = defineStore("sections", () => {
  // State
  const sections = ref<Section[]>([]);
  const fetchingSections = ref<boolean>(false);

  /**
   * Add a section to the sections array
   * @param section
   */
  function addSection(section: Section) {
    sections.value.push(section);
  }

  /**
   * Get all sections from a project
   * @param project
   */
  async function getSections(project: Project) {
    // Change state to fetching sections
    fetchingSections.value = true;

    // Variables to get multiple pages from WordPress
    let page = 1;
    let hasMorePages = true;

    // Reset the sections array
    resetSections();

    while (hasMorePages) {
      const url = `${project.url}wp-json/wp/v2/section?_fields=id,name&per_page=100&page=${page}`;
      try {
        const response = await $fetch<Section[]>(url);
        if (response) {
          response.forEach((section) => {
            addSection(section);
          });
        }
        // If the response has 100 properties, there are more pages to fetch
        if (response.length === 100) {
          //  Increment the page number to fetch the next page
          page += 1;
        } else {
          // If the response has less than 100 properties, there are no more pages to fetch
          // Change state to not fetching properties
          hasMorePages = false;
          fetchingSections.value = false;
        }
      } catch (error) {
        hasMorePages = false;
        fetchingSections.value = false;
        console.log(error);
      }
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
