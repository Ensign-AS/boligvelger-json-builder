<template>
  <section class="c-section c-section--main">
    <h1>Projects</h1>
    <p>Choose among the projects below or add a new one to progress.</p>
    <project-list />
    <hr />
    <NuxtLink
      to="/project/new"
      class="c-btn c-btn--secondary c-btn--icon"
    >
      <Icon
        name="fa7-solid:plus"
        class="c-btn__icon"
      />
      Add new project
    </NuxtLink>
  </section>
</template>
