sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("bala.comshopfloor_portal.controller.plocreate", {
			handleChange: function (oEvent) {
			var oText = this.byId("textResult"),
				oDP = oEvent.getSource(),
				sValue = oEvent.getParameter("value");
			window.console.log(sValue,oText,oDP);

			this._iEvent++;
			oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

		},
		onClick:function(oEvent){
			var plo_prof=this.byId("plo_prof").getValue();
			var material=this.byId("material").getValue();
			var plo_qty=this.byId("plo_qty").getValue();
			var plo_sdate=this.byId("plo_sdate").getValue();
			var plo_fdate=this.byId("plo_fdate").getValue();
			//hi
		}
		

	});

});