<template>
	<section class="dark:bg-gray-800 pb-10">
		<div class="mx-auto max-w-5xl">
			<h1 class="pb-8 text-center text-3xl font-semibold capitalize dark:text-gray-100 md:py-14">
				{{ $t('Survey') }}
			</h1>
			<div class="flex flex-col justify-center gap-x-10 md:flex-row">
				<div class="pb-8 md:w-1/2 md:pb-0">
					<form class="space-y-4" @submit.prevent="sendSurvey">
						<div v-for="(input, index) in questions" :key="index">
							<span v-if="input.required && input.type == 'radio'" class="top-4 left-3 z-10 text-sm text-red-600">*</span>
							<span class="dark:text-gray-300">
								{{ input.question }}
							</span>
							<div v-if="input.type == 'radio'" class="flex">
								<InputField
									v-for="i in 5"
									:key="i"
									v-model="formData[input.id]"
									element="input"
									type="radio"
									:name="String(input.id)"
									:label="String(i)"
									customClass="focus:outline-none py-4 px-6 leading-tight text-gray-700"
									:setValue="i"
									:required="input.required"
								/>
							</div>
							<div v-if="input.type == 'text'" class="">
								<InputField v-model="formData[input.id]" element="input" type="text" maxlength="250" :name="String(input.id)" :required="input.required" />
							</div>
						</div>

						<button
							type="submit"
							:disabled="loading"
							class="w-full rounded bg-primary py-4 font-medium capitalize text-white transition hover:bg-opacity-70 disabled:cursor-default disabled:opacity-50 dark:text-gray-100"
						>
							<span v-if="!loading">
								{{ $t('sendMessage') }}
							</span>
							<span v-else>
								<font-awesome-icon icon="circle-notch" spin size="lg" />
							</span>
						</button>
						<p v-if="feedback" :class="`text-center ${feedback.includes('Success') ? 'text-green-500' : 'text-red-500'}`">
							{{ $t(feedback) }}
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	async asyncData({ params, req, redirect, localePath, $axios, query }) {
		try {
			const { email, surveyLeadId } = query;
			const surveyTypeId = Number(query.surveyTypeId);
			const {
				data: {
					success,
					data: { allowSurvey, entries: questions }
				}
			} = await $axios.post('/api/getQuestions', {
				surveyTypeId,
				surveyLeadId
			});
			if (!success || !allowSurvey) redirect(localePath({ name: 'index' }));
			return { questions, email, surveyLeadId, surveyTypeId };
		} catch (err) {
			console.log('Error', err);
			redirect(localePath({ name: 'index' }));
		}
	},
	data() {
		return {
			formData: {},
			feedback: null,
			loading: false
		};
	},
	methods: {
		async sendSurvey() {}
	}
};
</script>
