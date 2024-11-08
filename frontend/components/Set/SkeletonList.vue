<template>
  <div class="flex justify-center flex-wrap gap-5 mt-5">
    <USkeleton
      v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
      :id="index"
      class="h-[200px] w-[250px]"
      :ui="{ rounded: 'rounded' }"
    />
  </div>
</template>
