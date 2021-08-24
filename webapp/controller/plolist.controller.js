sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("bala.comshopfloor_portal.controller.plolist", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf bala.comshopfloor_portal.view.plolist
		 */
	onInit: function () {
			// set explored app's demo model on this sample
			var surl="/sap/opu/odata/SAP/ZSFLOGIN_SRV/plolistSet(MrpCtrl='001',PlanPlant='SA02')/results[0]";
			var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
			window.console.log(oModel);
			this.getView().setModel(oModel);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf bala.comshopfloor_portal.view.plolist
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf bala.comshopfloor_portal.view.plolist
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf bala.comshopfloor_portal.view.plolist
		 */
		//	onExit: function() {
		//
		//	}

	});

});