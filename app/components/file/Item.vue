<script setup lang="ts">
defineProps<{
  file: File;
}>();
</script>

<template>
  <li class="c-file-item">
    <Icon
      name="fa7-solid:file-alt"
      class="c-file-item__icon"
    />
    {{ file.name }}
  </li>
</template>
