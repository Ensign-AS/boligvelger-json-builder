import type { NormalizedShape } from '@@/types/normalizedShape.type';
import { defineStore } from 'pinia';

export const useAnglesStore = defineStore('angles', () => {
  const angles = ref<NormalizedShape[]>([]);

  function addAngle(angle: NormalizedShape) {
    angles.value.push(angle);
  }

  return {
    angles,
    addAngle,
  };
});
