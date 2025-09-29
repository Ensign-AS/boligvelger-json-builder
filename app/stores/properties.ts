import type { Project } from '@@/types/project.type';
import type { Property, WPProperty } from '@@/types/property.type';
import { defineStore } from 'pinia';

export const usePropertiesStore = defineStore('properties', () => {
  const properties = ref<Property[]>([]);
  const fetchingProperties = ref<boolean>(false);

  function addProperty(property: Property) {
    properties.value.push(property);
  }

  function updateProperty(property: Property) {
    const index = properties.value.findIndex((p) => p.id === property.id);
    if (index > -1) {
      properties.value[index] = property;
    }
  }

  async function getProperties(project: Project, WPProjectId: number) {
    fetchingProperties.value = true;
    resetProperties();
    const url = `${project.url}wp-json/wp/v2/residence?project=${WPProjectId}&_fields=id,title&per_page=100`;
    try {
      const response = await $fetch<WPProperty[]>(url);
      if (response) {
        response.forEach((property) => {
          addProperty({
            id: property.id,
            name: property.title.rendered,
          });
        });
      }
      fetchingProperties.value = false;
    } catch (error) {
      fetchingProperties.value = false;
      console.log(error);
    }
  }

  function resetProperties() {
    properties.value = [];
  }

  return {
    properties,
    fetchingProperties,
    addProperty,
    updateProperty,
    getProperties,
    resetProperties,
  };
});
