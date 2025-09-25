<script setup lang="ts"></script>

<template>
  <header class="c-header">
    <h2>JSON harmonizer</h2>
    <div class="c-header__right">
      <p>Color mode:</p>
      <select
        v-model="$colorMode.preference"
        class="c-select"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
        <option value="pink">Pink</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="yellow">Yellow</option>
      </select>
    </div>
  </header>
</template>
