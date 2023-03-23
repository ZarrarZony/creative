<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:mb-20">
    <div
      v-for="(item, index) in $pageEssentials.cards"
      v-show="item.value"
      :key="index"
      data-aos="zoom-in"
      data-aos-duration="700"
      class="relative z-0 text-center font-semibold text-white"
    >
      <div class="flex flex-col items-center justify-center py-8">
        <div class="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          <font-awesome-icon class="text-white" size="3x" :icon="item.icon" />
        </div>
        <div class="m-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
          {{ $t(item.title) }}
        </div>
        <div v-if="index === 0">
          <div v-for="(phone, i) in item.value" :key="i" class="text-lg text-gray-400 dark:text-gray-200">
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </div>
        </div>
        <div v-else>
          <div class="text-lg text-gray-400 dark:text-gray-200">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
