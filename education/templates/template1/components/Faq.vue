<template>
  <div>
    <h1 class="pb-8 text-center text-3xl font-semibold capitalize dark:text-gray-100">
      {{ $t('faq') }}
    </h1>
    <ListGroup :items="$t('sections.faq')" />
  </div>
</template>
