<script setup lang="ts"></script>
<template>
  <div class="h-screen p-5">
    <div class="justify-end flex"></div>
    <div class="flex justify-center h-full">
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
<style>
p {
  font-size: 15px;
}
</style>
