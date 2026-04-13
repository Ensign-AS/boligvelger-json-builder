import type { Project } from "@@/types/project.type";
import type { Property, WPProperty } from "@@/types/property.type";
import { defineStore } from "pinia";

export const usePropertiesStore = defineStore("properties", () => {
  // State
  const properties = ref<Property[]>([]);
  const fetchingProperties = ref<boolean>(false);

  /**
   * Add a property to the properties array
   * @param property
   */
  function addProperty(property: Property) {
    properties.value.push(property);
  }

  /**
   * Update a property in the properties array
   * @param property
   */
  function updateProperty(property: Property) {
    const index = properties.value.findIndex((p) => p.id === property.id);
    if (index > -1) {
      properties.value[index] = property;
    }
  }

  /**
   * Get all properties from WordPress
   * Accepts project object from this app and the WordPress project ID
   * @param project
   * @param WPProjectId
   */
  async function getProperties(project: Project, WPProjectId: number) {
    // Change state to fetching properties
    fetchingProperties.value = true;

    // Variables to get multiple pages from WordPress
    let page = 1;
    let hasMorePages = true;

    // Reset the properties array
    resetProperties();

    /*
     * Get all properties from WordPress
     * WordPress only returns 100 properties per page
     * So we need to loop through all pages
     */
    while (hasMorePages) {
      const url = `${project.url}wp-json/wp/v2/residence?project=${WPProjectId}&_fields=id,title&per_page=100&page=${page}`;
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

        // If the response has 100 properties, there are more pages to fetch
        if (response.length === 100) {
          //  Increment the page number to fetch the next page
          page += 1;
        } else {
          // If the response has less than 100 properties, there are no more pages to fetch
          // Change state to not fetching properties
          hasMorePages = false;
          fetchingProperties.value = false;
        }
      } catch (error) {
        // If there is an error, change state to not fetching properties
        // and log the error
        hasMorePages = false;
        fetchingProperties.value = false;
        console.log(error);
      }
    }
  }

  /**
   * Reset the properties array
   */
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
