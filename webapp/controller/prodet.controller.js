sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";
	var item;
	return Controller.extend("bala.comshopfloor_portal.controller.prodet", {

		onInit: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("prodet").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function(oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			var surl = "/sap/opu/odata/SAP/ZSFLOGIN_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
			var oTable = this.getView().byId("form");
			var prono=sap.ui.getCore().getModel("pro").oData.data;
			window.console.log(prono);
			oModel.read("/prodetSet(ProNo='"+prono+"')", {

				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {

					window.console.log(oData);
					var tableModel = new sap.ui.model.json.JSONModel();
					// created a JSON model
					tableModel.setData(
						oData
					);
					oTable.setModel(tableModel);
					oDialog.close();

				},
				error: function(oData, oResponse) {

					window.console.log('HIIIIIIIIIIIIII IN ERROR');
					oDialog.close();

				}
			});
			var oFilters = [];
			var filter1 = new sap.ui.model.Filter("ProNo", sap.ui.model.FilterOperator.EQ, prono);
			//var filter2 = new sap.ui.model.Filter("ProPlant", sap.ui.model.FilterOperator.EQ, "SA02");
			oFilters.push(filter1);
			//oFilters.push(filter2);
			// window.console.log(oFilters);

			var oTable1 = this.getView().byId("ploitem");
			var url = "/sap/opu/odata/sap/ZSFLOGIN_SRV/";
			var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
			model.read("/prodetSet", {
				filters: oFilters,
				context: null,
				urlParameters: null,
				async: true,
				success: function(success, err) {
					if (success) {
						// window.console.log(success.results);
						item = success.results;
						window.console.log(item);
						var tableModel = new sap.ui.model.json.JSONModel();
						// created a JSON model
						tableModel.setData(
							item
						);
						oTable1.setModel(tableModel);
					} else {
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					}
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error 404 Occured. Session Token is expired. Login Again");
				}
			});
		},
		onBack: function() {
			window.console.log(sap.ui.getCore().getModel("pro"));
			/*var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("sfdashboard");*/
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("sfdashboard", {}, true);
			}
		}
	});

});