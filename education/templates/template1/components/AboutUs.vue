<template>
  <section class="bg-gray-50 py-20 dark:bg-gray-800">
    <div class="mx-6 max-w-2xl md:mx-auto">
      <div class="text-center">
        <h1 class="pb-5 text-3xl font-bold text-secondary dark:text-gray-100">
          {{ $t('template1.aboutUs.title') }}
        </h1>
        <p class="text-md font-light text-gray-700 dark:text-gray-200">
          {{ $t('template1.aboutUs.description') }}
        </p>
        <img src="~/assets/img/template1/about-us.jpeg" class="mx-auto rounded p-10" />
      </div>

      <ListGroup :items="items" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.items = [...Array(3).keys()].map((index) => ({
      title: this.$i18n.t(`template1.aboutUs.items.${index}.title`),
      text: this.$i18n.t(`template1.aboutUs.items.${index}.text`, {
        websiteName: this.$websiteData.name,
      }),
      show: !index,
    }))
  },
}
</script>

<style></style>
