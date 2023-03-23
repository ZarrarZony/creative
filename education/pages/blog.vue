<template>
  <Component :is="component" :websiteName="$websiteData.name" />
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    component() {
      return () => import(`~/templates/${this.$websiteData.template}/pages/blog`)
    },
  },
}
</script>

<style></style>
