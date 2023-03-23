<template>
	<section class="dark:bg-gray-800">
		<div class="mx-6 max-w-3xl py-6 md:mx-auto lg:max-w-4xl">
			<div
				class="flex flex-col items-center gap-y-2 border-b border-dashed border-black pb-6 text-center dark:border-gray-100 md:flex-row md:justify-between md:pb-16 md:text-left"
			>
				<div class="flex flex-col">
					<div>
						<span v-if="$t('price')" class="mr-2 text-xl font-medium text-primary md:text-3xl">{{ $t('price') }}</span>
						<span class="text-xl font-medium text-secondary dark:text-gray-100 md:text-3xl">
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="currency.symbol"></span>
							<span>{{ formatNumber(product.price) }}</span>
						</span>
					</div>
					<div class="text-xl font-medium text-primary md:text-3xl">
						{{
							$t('moneyBackGuarantee', {
								moneyBackDays
							})
						}}
					</div>
				</div>

				<!-- own a package button -->
				<NuxtLink
					:to="
						localePath({
							name: 'checkout',
							query: {
								productId: product.id
							}
						})
					"
				>
					<button class="self-center rounded bg-primary py-2 px-10 text-2xl font-medium uppercase text-white transition hover:opacity-80">
						{{ $t('ownPackage') }}
					</button>
				</NuxtLink>
			</div>

			<!-- body -->
			<div class="space-y-2 py-4">
				<h1 class="text-2xl font-medium text-black dark:text-gray-100">
					{{ $t('courseOverview') }}
				</h1>
				<h1 class="text-2xl font-medium text-black dark:text-gray-100">
					{{ $t('topicsCoveredWillInclude') }}
				</h1>

				<!-- topics here -->
				<div class="space-y-4 py-4 dark:text-gray-200">
					<div v-for="(topic, index) in topics" :key="index">
						<span class="font-medium">{{ $t(`productPage.topics.${topic}.title`) }}:</span>
						<span class="font-light">{{ $t(`productPage.topics.${topic}.description`) }}</span>
					</div>
				</div>
			</div>

			<!-- own a package button -->
			<NuxtLink
				:to="
					localePath({
						name: 'checkout',
						query: {
							productId: product.id
						}
					})
				"
			>
				<button class="w-full rounded bg-primary py-2 text-2xl font-medium uppercase text-white transition hover:opacity-80">
					{{ $t('ownPackage') }}
				</button>
			</NuxtLink>
		</div>
	</section>
</template>

<script>
import { formatNumber } from '../utils/numbers';

export default {
	props: {
		product: {
			type: Object,
			default: () => ({})
		},
		currency: {
			type: Object,
			default: () => ({})
		},
		topics: {
			type: Array,
			default: () => []
		},
		assetsInformation: {
			type: Array,
			default: () => []
		},
		moneyBackDays: {
			type: String,
			default: '14'
		}
	},
	methods: {
		formatNumber
	}
};
</script>

<style></style>
