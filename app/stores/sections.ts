import type { Section } from '@@/types/section.type';
import { defineStore } from 'pinia';

export const useSectionsStore = defineStore('sections', () => {
  const sections = ref<Section[]>([]);

  function addSection(section: Section) {
    sections.value.push(section);
  }

  return {
    sections,
    addSection,
  };
});
