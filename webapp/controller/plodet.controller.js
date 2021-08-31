sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("bala.comshopfloor_portal.controller.plodet", {

		onInit: function() {
			// set explored app's demo model on this sample
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("plodet").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function(oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			window.console.log("hi", oEvent.getParameter("arguments"));

			var plono = sap.ui.getCore().getModel("test").oData.data;
			window.console.log(plono);
			var oFilters = [];
			var filter1 = new sap.ui.model.Filter("PloNo", sap.ui.model.FilterOperator.EQ, plono);
			//var filter2 = new sap.ui.model.Filter("PlanPlant", sap.ui.model.FilterOperator.EQ, "SA02");
			oFilters.push(filter1);
			//oFilters.push(filter2);
			// window.console.log(oFilters);

			var item;
			var oTable = this.getView().byId("form");
			var url = "/sap/opu/odata/sap/ZSFLOGIN_SRV/";
			var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
			model.read("/plodetSet", {
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
							item[0]
						);
						oTable.setModel(tableModel);
						oDialog.close();
					} else {
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
						oDialog.close();
					}
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error 404 Occured. Session Token is expired. Login Again");
					oDialog.close();
				}
			});
			oFilters = [];
			filter1 = new sap.ui.model.Filter("PloNo", sap.ui.model.FilterOperator.EQ, plono);
			//var filter2 = new sap.ui.model.Filter("ProPlant", sap.ui.model.FilterOperator.EQ, "SA02");
			oFilters.push(filter1);
			//oFilters.push(filter2);
			// window.console.log(oFilters);

			var oTable1 = this.getView().byId("ploitem");
			model.read("/plodetSet", {
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
			window.console.log(sap.ui.getCore().getModel("test"));
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