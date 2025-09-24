import type { Property } from '@@/types/property.type';
import { defineStore } from 'pinia';

export const usePropertiesStore = defineStore('properties', () => {
  const properties = ref<Property[]>([]);

  function addProperty(property: Property) {
    properties.value.push(property);
  }

  return {
    properties,
    addProperty,
  };
});
