<template>
  <section class="c-section c-section--main">
    <h1>Add new project</h1>
    <p>Add a new project to the list.</p>
    <project-new />
    <NuxtLink
      to="/project"
      class="c-btn c-btn--secondary c-btn--icon"
    >
      <Icon
        name="fa7-solid:arrow-left"
        class="c-btn__icon"
      />
      Back to projects
    </NuxtLink>
  </section>
</template>
