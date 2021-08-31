sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, MessageBox, History, UIComponent) {
	"use strict";
	//var PopinLayout = mobileLibrary.PopinLayout;
	return Controller.extend("bala.comshopfloor_portal.controller.sfdashboard", {

		onPress: function() {

			MessageBox.warning("Are you sure to logout?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function(sAction) {
					if (sAction === "OK") {
						var oHistory = History.getInstance();
						var sPreviousHash = oHistory.getPreviousHash();
						if (sPreviousHash !== undefined) {
							window.history.go(-1);
						} else {
							var oRouter = UIComponent.getRouterFor(this);
							oRouter.navTo("sfdashboard", {}, true);
						}
					}
				}
			});
		}

	});

});