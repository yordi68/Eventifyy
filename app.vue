<script setup></script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5"
        color="repeating-linear-gradient(to right,#5D59EF 0%,#E3F5FF 50%,#5D59EF 100%)" />
      <NuxtPage />
      <!-- <div class="fixed z-50 px-3 py-2 text-sm font-bold text-white bg-gray-900 rounded bottom-4 left-4">
        <span class="hidden xs:inline-block sm:hidden">XS</span>
        <span class="hidden sm:inline-block md:hidden">SM</span>
        <span class="hidden md:inline-block lg:hidden">MD</span>
        <span class="hidde n lg:inline-block xl:hidden">LG</span>
        <span class="hidden xl:inline-block 2xl:hidden">XL</span>
        <span class="hidden 2xl:inline-block 3xl:hidden">2XL</span>
        <span class="hidden 3xl:inline-block 4xl:hidden">3XL</span>
        <span class="hidden 4xl:inline-block 4_2xl:hidden">4XL</span>
        <span class="hidden 4_2xl:inline-block 5xl:hidden">4_2XL</span>
        <span class="hidden 5xl:inline-block">5XL</span>
      </div> -->
    </NuxtLayout>
  </div>
</template>

<style></style>