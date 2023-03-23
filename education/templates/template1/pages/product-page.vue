<template>
	<div>
		<Template1ComponentsPageHeader :title="$t(name)" :description="$t(`${key}Description1`)" :coverImage="require('~/assets/img/template4/product-page-cover.jpg')" />
		<ProductPage :product="product" :topics="topics" :currency="currency" :moneyBackDays="moneyBackDays" />
	</div>
</template>

<script>
import productAssets from '../../../utils/productAssets';

export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		product: {
			type: Object,
			default: () => ({})
		},
		currency: {
			type: Object,
			default: () => ({})
		},
		moneyBackDays: {
			type: String,
			default: '14'
		}
	},
	data: () => ({
		topics: [],
		key: null
	}),
	fetch() {
		const assets = productAssets(this.name);
		if (!assets) return;

		this.topics = assets.topics;
		this.key = assets.key;
	}
};
</script>
