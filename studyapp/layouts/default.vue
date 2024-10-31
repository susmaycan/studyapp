<script setup lang="ts"></script>
<template>
  <div class="min-h-min p-5">
    <div class="justify-end flex"></div>
    <div class="flex justify-center">
      <div class="mr-auto w-200">
        <sidebar />
      </div>
      <div class="w-2/3 text-center">
        <slot />
      </div>
      <div class="ml-auto">
        <theme-switch />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
