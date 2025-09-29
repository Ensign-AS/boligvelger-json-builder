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

const { addPropertyId } = anglesStore;

defineProps<{
  shapeId: string;
}>();

const selectedType = ref<string>('');
const selectedPropertyId = ref<number>(0);
const selectedSectionId = ref<number>(0);
</script>

<template>
  <div>
    <h3>{{ shapeId }}</h3>
    <div class="c-horizontal-list">
      <label
        :for="`property-${shapeId}`"
        class="c-btn c-btn--icon"
        :class="{
          'c-btn--primary': selectedType === 'property',
          'c-btn--secondary': selectedType !== 'property',
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
          'c-btn--secondary': selectedType !== 'section',
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
    <select
      v-if="selectedType === 'property'"
      class="c-select"
      v-model="selectedPropertyId"
      v-on="addPropertyId(shapeId as string, selectedPropertyId)"
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
    <hr />
  </div>
</template>
