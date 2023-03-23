import ComponentsDiscoveryService from '../../services/componentsDiscovery/ComponentsDiscoveryService.js';

const generateLoginAction = () => {
	const components = ComponentsDiscoveryService.getAllComponents();
	return {
		name: 'reviewsPilotBusinessLogin',
		componentsControllersAccess: {
			users: [
				components.reviewsPilotBusinessUsers.controller.getCurrentUserPermissions.name,
				components.reviewsPilotBusinessUsers.controller.getCurrentUserSettings.name,
				components.reviewsPilotBusinessUsers.controller.setCurrentUserSettings.name,
				components.reviewsPilotBusinessUsers.controller.changeCurrentUserPassword.name,
				components.reviewsPilotBusinessUsers.controller.getCurrentUserRequirements.name,
				components.reviewsPilotBusinessUsers.controller.setCurrentUserNewPassword.name
			],
			searchPages: [components.searchPages.controller.getSearchPages.name],
			auth: [components.auth.controller.createEndSessionRequest.name],
			public: [components.public.controller.logError.name]
		},
		isBasicPermission: true
	};
};

const generateEditPermissionsAction = () => {
	const components = ComponentsDiscoveryService.getAllComponents();
	return {
		name: 'editBusinessPermissions',
		componentsControllersAccess: {
			users: [
				components.reviewsPilotBusinessUsers.controller.getPermissions.name,
				components.reviewsPilotBusinessUsers.controller.setPermissions.name,
				components.reviewsPilotBusinessUsers.controller.getDisplayList.name
			],
			permissionsTemplates: [components.permissionsTemplates.controller.getAllPermissionsTemplates.name],
			permissions: [components.permissions.controller.getAllPermissions.name]
		}
	};
};

const getUsersActions = () => [generateLoginAction(), generateEditPermissionsAction()];

export default getUsersActions;
