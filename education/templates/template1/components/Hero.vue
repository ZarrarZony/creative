<template>
  <section
    :style="{
      backgroundImage: `url(${backgroundImage})`,
    }"
    class="relative flex h-40v flex-col items-center justify-center bg-cover bg-center text-center md:h-70v"
  >
    <!-- overlay -->
    <div class="absolute inset-0 z-0 bg-primary opacity-30 dark:opacity-60"></div>

    <div class="z-10 mx-auto max-w-4xl px-5 py-10 md:py-0">
      <h1 class="mb-6 text-3xl font-bold text-white dark:text-gray-100 sm:text-4xl md:text-5xl" style="text-shadow: -2px -1px 2px black">
        {{ $t('sections.hero.title') }}
      </h1>
      <p class="mb-10 text-base text-white dark:text-gray-200 md:text-lg">
        {{ $t('sections.hero.text') }}
      </p>
      <NuxtLink
        :to="localePath('premium-packages')"
        class="text-md z-10 rounded-full bg-white py-4 px-10 font-medium text-primary shadow-sm transition hover:bg-gray-200 dark:bg-gray-800"
      >
        {{ $t('viewCourses') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import backgroundImage from '~/assets/img/template1/hero.jpeg'

export default {
  data: () => ({
    backgroundImage,
  }),
}
</script>
