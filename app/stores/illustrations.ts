import { defineStore } from 'pinia';

export const useIllustrationsStore = defineStore('illustrations', () => {
  const illustrations = ref<string[]>([]);

  function addIllustration(illustration: string) {
    illustrations.value.push(illustration);
  }

  return {
    illustrations,
    addIllustration,
  };
});
