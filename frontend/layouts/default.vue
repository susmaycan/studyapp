<script setup lang="ts"></script>
<template>
  <div class="h-screen p-5">
    <top-bar />
    <div class="text-center h-full">
      <slot />
    </div>
  </div>
</template>
<style>
p {
  font-size: 15px;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  select,
  textarea,
  input {
    font-size: 16px;
  }
}
</style>
