<template>
  <div>
    <div v-if="design == 1" class="m-2 cursor-pointer" @click="toggleDarkMode">
      <div class="text-white dark:hidden">
        <font-awesome-icon icon="sun" size="lg" />
      </div>
      <div class="hidden text-gray-800 dark:block">
        <font-awesome-icon icon="moon" size="lg" />
      </div>
    </div>
    <div v-else-if="design == 2" class="flex items-center justify-end space-x-2">
      <span class="text-sm text-gray-800 dark:text-gray-500">Light</span>
      <label for="toggle" class="flex h-5 w-9 cursor-pointer items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out dark:bg-gray-600">
        <div class="toggle-dot h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ease-in-out dark:translate-x-3"></div>
      </label>
      <span class="text-sm text-gray-400 dark:text-white">Dark</span>
      <input id="toggle" type="checkbox" class="hidden" @click="toggleDarkMode" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    design: {
      type: String,
      default: '1',
    },
  },
  methods: {
    toggleDarkMode() {
      const { value } = this.$colorMode
      this.$colorMode.preference = value === 'dark' ? 'light' : 'dark'
    },
  },
}
</script>
