<script setup lang="ts">
const anglesStore = useAnglesStore();
const projectsStore = useProjectStore();
</script>

<template>
  <div class="c-section c-section--main">
    <h1>JSON harmonizer</h1>
    <p>
      Upload a JSON file and match shapes to properties or sections. Then
      download the harmonized JSON file.
    </p>
    <p>
      <nuxt-link
        to="/file"
        class="c-btn c-btn--primary c-btn--icon"
      >
        Start
        <Icon name="fa7-solid:arrow-right" />
      </nuxt-link>
    </p>
  </div>
</template>
