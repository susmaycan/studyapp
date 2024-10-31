<template>
  <div class="flex flex-col text-center items-center">
    <USkeleton class="h-7 w-[210px]" />
    <USkeleton
      class="h-[200px] w-[200px] my-3"
      :ui="{ rounded: 'rounded-xl' }"
    />
    <USkeleton class="h-7 w-[300px]" />
    <div class="flex justify-center flex-wrap gap-5 mt-5">
      <USkeleton
        v-for="index in [1, 2, 3, 4, 5, 6, 7, 8]"
        :id="index"
        class="h-[200px] w-[250px]"
        :ui="{ rounded: 'rounded' }"
      />
    </div>
  </div>
</template>
