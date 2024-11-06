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
</style>
