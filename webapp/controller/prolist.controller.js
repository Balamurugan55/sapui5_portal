sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var item;
	var coreModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("bala.comshopfloor_portal.controller.prolist", {

		onInit: function() {
			// set explored app's demo model on this sample
			var oFilters = [];
			var mrp = sap.ui.getCore().getModel("login").oData.mrp;
			var plant = sap.ui.getCore().getModel("login").oData.plant;
			var filter1 = new sap.ui.model.Filter("MrpCtrl", sap.ui.model.FilterOperator.EQ, mrp);
			var filter2 = new sap.ui.model.Filter("ProPlant", sap.ui.model.FilterOperator.EQ, plant);
			oFilters.push(filter1);
			oFilters.push(filter2);
			// window.console.log(oFilters);

			var oTable = this.getView().byId("prolist");
			var url = "/sap/opu/odata/sap/ZSFLOGIN_SRV/";
			var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
			model.read("/prolistSet", {
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
						oTable.setModel(tableModel);
					} else {
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					}
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error 404 Occured. Session Token is expired. Login Again");
				}
			});
		},
		onClick: function(oEvent) {
			var oTable = this.getView().byId("prolist");
			sap.ui.getCore().setModel(coreModel, "pro");
			var index = oTable._oItemNavigation.iFocusedIndex - 1;
			window.console.log(item[index].OrderNumber);
			coreModel.setData({
				data: item[index].OrderNumber
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("prodet", {
				data: "bye"
			});
		}
	});

});