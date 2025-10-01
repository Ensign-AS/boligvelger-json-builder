<script setup lang="ts">
import type { NormalizedShape } from '~~/types/normalizedShape.type';
import { usePropertiesStore } from '@/stores/properties';
import { useSectionsStore } from '@/stores/sections';
import { useAnglesStore } from '@/stores/angles';

const propertiesStore = usePropertiesStore();
const sectionsStore = useSectionsStore();
const anglesStore = useAnglesStore();

const { properties } = storeToRefs(propertiesStore);
const { sections } = storeToRefs(sectionsStore);

const { addPropertyId, addSectionId } = anglesStore;

defineProps<{
  shapeId: string;
}>();

const selectedType = ref<string>('');
const selectedPropertyId = ref<number>(0);
const selectedSectionId = ref<number>(0);
</script>

<template>
  <div class="c-combiner">
    <h3 c-combiner__title>{{ shapeId }}</h3>
    <div class="c-combiner__buttons">
      <label
        :for="`property-${shapeId}`"
        class="c-btn c-btn--icon"
        :class="{
          'c-btn--primary': selectedType === 'property',
          'c-btn--tertiary': selectedType !== 'property',
        }"
      >
        <Icon
          name="fa7-regular:circle-dot"
          v-if="selectedType === 'property'"
          class="c-btn__icon"
        />
        <Icon
          name="fa7-regular:circle"
          v-else
          class="c-btn__icon"
        />
        Property
        <input
          type="radio"
          :id="`property-${shapeId}`"
          v-model="selectedType"
          value="property"
          class="c-btn__input c-btn__input--radio"
        />
      </label>
      <label
        :for="`section-${shapeId}`"
        class="c-btn c-btn--icon"
        :class="{
          'c-btn--primary': selectedType === 'section',
          'c-btn--tertiary': selectedType !== 'section',
        }"
      >
        <Icon
          name="fa7-regular:circle-dot"
          v-if="selectedType === 'section'"
          class="c-btn__icon"
        />
        <Icon
          name="fa7-regular:circle"
          v-else
          class="c-btn__icon"
        />
        Section
        <input
          type="radio"
          :id="`section-${shapeId}`"
          v-model="selectedType"
          value="section"
          class="c-btn__input c-btn__input--radio"
        />
      </label>
    </div>
    <div
      class="c-combiner__selects"
      v-if="selectedType"
    >
      <select
        v-if="selectedType === 'property'"
        class="c-select"
        v-model="selectedPropertyId"
        @change="addPropertyId(shapeId as string, selectedPropertyId)"
      >
        <option value="0">Select property</option>
        <option
          v-for="property in properties"
          :key="property.id"
          :value="property.id"
        >
          {{ property.name }}
        </option>
      </select>
      <select
        v-else-if="selectedType === 'section'"
        class="c-select"
        v-model="selectedSectionId"
        @change="addSectionId(shapeId as string, selectedSectionId)"
      >
        <option value="0">Select section</option>
        <option
          v-for="section in sections"
          :key="section.id"
          :value="section.id"
        >
          {{ section.name }}
        </option>
      </select>
    </div>
  </div>
</template>
