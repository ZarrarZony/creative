<template>
  <section class="-mt-96 bg-primary py-20 px-4 pt-96">
    <div class="mx-auto flex max-w-xl items-center justify-center text-center text-2xl text-white dark:text-gray-100 md:text-3xl">
      <img src="~/assets/img/template1/money-back-guarantee.png" class="h-20 md:h-full" />
      <div class="mx-2 uppercase">
        {{
          $t('moneyBackGuarantee', {
            moneyBackDays: $extras.moneyBackDays,
          })
        }}
      </div>
      <img src="~/assets/img/template1/money-back-guarantee.png" class="h-20 md:h-full" />
    </div>
  </section>
</template>
