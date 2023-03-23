<template>
  <div class="w-full">
    <div v-for="(tab, index) of accordionData" :key="index" class="w-full overflow-hidden border-b">
      <div
        class="flex cursor-pointer items-center justify-between bg-secondary p-4 text-base font-bold text-white dark:text-gray-100 sm:text-lg lg:text-xl"
        @click="chooseTab(index)"
      >
        <div>
          {{ tab.title }}
        </div>
        <div>
          <font-awesome-icon :icon="['fas', chosenTab === index ? 'minus' : 'plus']" />
        </div>
      </div>
      <transition name="accordion">
        <div v-show="chosenTab === index">
          <div class="border border-secondary bg-white px-6 py-2 text-secondary dark:bg-gray-800 dark:text-gray-200 lg:px-10">
            {{ tab.text }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accordionData: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    chosenTab: 0,
  }),
  methods: {
    chooseTab(tab) {
      this.chosenTab = tab === this.chosenTab ? -1 : tab
    },
  },
}
</script>

<style>
.accordion-enter-active {
  animation: dropdown 0.3s linear;
}
.accordion-leave-active {
  animation: dropdown 0.3s linear reverse;
}
@keyframes dropdown {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 90px;
  }
}
</style>
