sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, MessageBox, History, UIComponent) {
	"use strict";
	//var PopinLayout = mobileLibrary.PopinLayout;
	
	return Controller.extend("bala.comshopfloor_portal.controller.sfdashboard", {
		onAfterRendering: function() {

		},
		onPress: function() {
			//sap.ui.controller("bala.comshopfloor_portal.controller.plolist").onBeforeRendering();
			MessageBox.warning("Are you sure to logout?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function(sAction) {
					if (sAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						var oHistory = History.getInstance();
						var sPreviousHash = oHistory.getPreviousHash();
						if (sPreviousHash !== undefined) {
							window.history.back();
							setTimeout(()=>window.location.reload(),1000);
							//oRouter.navTo("plolist");
							//oRouter.navTo("login");
							
						} else {
						
							oRouter.navTo("login", {}, true);

							
						}
					}
				}
			});
		}

	});

});