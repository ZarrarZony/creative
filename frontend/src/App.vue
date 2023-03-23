<template>
	<v-app>
		<v-main>
			<password-change v-if="changePasswordDialog" :current-password-confirmation="false" @password-changed="passwordChanged" />
			<qr-code-config v-if="qrCodeDialog" @success="qrCodeConfirmed" />

			<v-dialog persistent :value="isSessionExpired" width="30%">
				<v-card>
					<v-card-title class="justify-center">
						<v-icon left color="warning">mdi-shield-alert</v-icon>
						{{ $t('general.sessionExpiredTitle') }}
					</v-card-title>
					<v-card-text class="text-center">{{ $t('general.sessionExpiredMessage') }}</v-card-text>
					<v-card-actions class="justify-center">
						<v-btn @click="clearSession()">{{ $t('general.ok') }}</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<layout-header />
			<layout-sidebar />
			<layout-body />
			<layout-footer />
		</v-main>
		<windows-container :z-index="6" />
		<message-container />
	</v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ApiService from './services/ApiService.js';

export default {
	data() {
		return {
			changePasswordDialog: false,
			qrCodeDialog: false
		};
	},
	components: {
		'layout-header': () => import('@/components/Layout/Header.vue'),
		'layout-sidebar': () => import('@/components/Layout/Sidebar.vue'),
		'layout-body': () => import('@/components/Layout/Body.vue'),
		'layout-footer': () => import('@/components/Layout/Footer.vue'),
		'password-change': () => import('@/components/Layout/PasswordChange.vue'),
		'qr-code-config': () => import('@/components/Layout/QrCodeConfiguration.vue')
	},
	watch: {
		isLoggedIn: {
			immediate: true,
			handler(val) {
				if (val) {
					this.initSession();
				}
			}
		}
	},
	computed: {
		...mapState('user', { isSessionExpired: 'isSessionExpired', tokenSet: 'tokenSet' }),
		...mapState('configuration', { isDarkMode: 'isDarkMode', language: 'language' }),
		...mapGetters('user', { isLoggedIn: 'isLoggedIn' })
	},
	methods: {
		...mapActions('user', { initUserSession: 'initUserSession', destroyUserSession: 'destroyUserSession' }),
		async initSession() {
			await this.initUserSession();
			this.$vuetify.theme.dark = this.isDarkMode;
			this.$i18n.locale = this.language;
			const { requireNewPassword, requireOtpSetup } = await ApiService.usersApi.getCurrentUserRequirements();
			if (requireNewPassword) {
				this.changePasswordDialog = true;
				return;
			}
			if (requireOtpSetup) {
				this.qrCodeDialog = true;
			}
		},
		passwordChanged() {
			this.changePasswordDialog = false;
			this.$router.go();
		},
		async qrCodeConfirmed() {
			this.qrCodeDialog = false;
			await this.logout();
		},
		clearSession() {
			window.location.reload();
			this.destroyUserSession({ logout: false });
		},
		async logout() {
			const { id_token } = this.tokenSet;
			window.location.href = await ApiService.authApi.createEndSessionRequest(id_token);
			this.destroyUserSession({ logout: true });
		}
	}
};
</script>

<style module>
:global(html) {
	overflow-y: hidden;
}
</style>
