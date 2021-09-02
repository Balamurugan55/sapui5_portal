sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var item;
	var tableModel;
	var coreModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("bala.comshopfloor_portal.controller.plolist", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf bala.comshopfloor_portal.view.plolist
		 */
	onInit: function() {
			// set explored app's demo model on this sample
				var oFilters = [];
				var mrp=sap.ui.getCore().getModel("login").oData.mrp;
				var plant=sap.ui.getCore().getModel("login").oData.plant;
                var filter1 = new sap.ui.model.Filter("MrpCtrl", sap.ui.model.FilterOperator.EQ, mrp);
                var filter2 = new sap.ui.model.Filter("PlanPlant", sap.ui.model.FilterOperator.EQ, plant);
                oFilters.push(filter1);
                oFilters.push(filter2);
                // window.console.log(oFilters);
               
            	var view = this.getView();
                var oTable = view.byId("plolist");
                //oTable.setVisibleRowCount(500);
                var url = "/sap/opu/odata/sap/ZSFLOGIN_SRV/";
                var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
                model.read("/plolistSet", {
                    filters: oFilters,
                    context: null,
                    urlParameters: null,
                    async: true,
                    success: function(success, err) {
                        if (success) {
                            // window.console.log(success.results);
                            item = success.results;
                            window.console.log(item);
                            tableModel = new sap.ui.model.json.JSONModel();
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
            
           onClick:function(oEvent){
           		var row=oEvent.getSource();
           		var oTable = this.getView().byId("plolist");
           		
        		
        		sap.ui.getCore().setModel(coreModel,"test");
           		var index = oTable._oItemNavigation.iFocusedIndex - 1;
           		window.console.log(item[index].PlannedorderNum);
           		coreModel.setData({data:item[index].PlannedorderNum});
           		var itemIndex = oTable.indexOfItem(oTable.getSelectedItem());
           		window.console.log(row,itemIndex);
           		var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
           		oRouter.navTo("plodet",{data:"bye"});
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