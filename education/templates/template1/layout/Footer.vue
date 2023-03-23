<template>
  <section class="divide-y-2 bg-primary py-8 dark:divide-gray-800">
    <div class="px-2 pt-6 pb-8 text-center md:px-10 md:pt-12 md:pb-16">
      <h1 class="pb-4 text-2xl font-semibold text-white dark:text-gray-100 md:text-3xl">
        {{ $t('template1.footer.title') }}
      </h1>
      <p class="pb-8 text-sm font-light text-white dark:text-gray-200 md:text-base">
        {{ $t('template1.footer.text') }}
      </p>
      <NuxtLink
        :to="localePath('premium-packages')"
        class="rounded-full bg-white py-4 px-10 font-medium text-primary transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        {{ $t('startLearning') }}
      </NuxtLink>
    </div>
    <div class="px-4 pt-6">
      <!-- custom footer html -->
      <div v-if="$extras.customFooterHtml" class="pb-2" v-html="$extras.customFooterHtml"></div>

      <div class="flex justify-between text-center text-sm text-white dark:text-gray-100 md:mx-auto md:max-w-3xl">
        <NuxtLink :to="localePath('terms-and-conditions')" class="transition hover:text-gray-300">{{ $t('terms') }}</NuxtLink>
        <div>
          {{
            $t('copyrights', {
              domain: $websiteData.domain,
              year: new Date().getFullYear(),
            })
          }}
        </div>
        <NuxtLink :to="localePath('privacy-policy')">{{ $t('privacyPolicy') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>
