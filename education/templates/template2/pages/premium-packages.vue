<template>
  <div class="font-catamaran">
    <Template2ComponentsPageHeader
      :title="$t('premiumPackages')"
      :description="$t('premiumPackagesDescription')"
      :coverImage="require('~/assets/img/template2/bg-premium-packages-header.jpeg')"
    />
    <Template2ComponentsPremiumPackages />
    <Template2ComponentsOffersSimple />
    <Template2ComponentsStatistics />
    <Template2ComponentsTestimonials />
    <Template2ComponentsInvestToday />
  </div>
</template>

<script></script>
