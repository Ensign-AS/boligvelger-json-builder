import type {
  NormalizedShape,
  NormalizedAngle,
} from '@@/types/normalizedShape.type';
import { defineStore } from 'pinia';

export const useAnglesStore = defineStore('angles', () => {
  const angles = ref<NormalizedAngle[]>([]);
  const previousAngle = ref<number>(0);

  const shapes = computed(() => {
    return angles.value.flatMap((angle) => angle.shapes);
  });

  const uniqueShapeIds = computed((): string[] => {
    const ids = new Set<string>();

    angles.value.forEach((angle) => {
      angle.shapes.forEach((shape) => {
        if (shape.id) {
          ids.add(shape.id);
        }
      });
    });

    return Array.from(ids);
  });

  function addAngle(shapes: NormalizedShape[], angleNumber?: number | null) {
    previousAngle.value += 1;
    if (angleNumber) {
      previousAngle.value = angleNumber;
    }
    let number = previousAngle.value;
    const angle: NormalizedAngle = {
      angle: number,
      shapes,
    };
    angles.value.push(angle);
  }

  function addPropertyId(shapeId: string, propertyId: number): void {
    // Iterate over each angle
    angles.value.forEach((angle) => {
      // Find all shapes in this angle that match the shapeId
      const matchingShapes = angle.shapes.filter(
        (shape) => shape.id === shapeId
      );

      // Update each matching shape
      matchingShapes.forEach((shape) => {
        shape.wpPropertyId = propertyId;
        shape.type = 'property'; // Optional: Set type to 'property' if needed
      });
    });
  }

  function addSectionId(shapeId: string, sectionId: number): void {
    // Iterate over each angle
    angles.value.forEach((angle) => {
      // Find all shapes in this angle that match the shapeId
      const matchingShapes = angle.shapes.filter(
        (shape) => shape.id === shapeId
      );

      // Update each matching shape
      matchingShapes.forEach((shape) => {
        shape.wpSectionId = sectionId;
        shape.type = 'section'; // Optional: Set type to 'section' if needed
      });
    });
  }

  function resetAngles() {
    angles.value = [];
  }

  return {
    angles,
    shapes,
    uniqueShapeIds,
    addAngle,
    addPropertyId,
    addSectionId,
    resetAngles,
  };
});
