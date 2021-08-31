sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("bala.comshopfloor_portal.controller.plocreate", {
		handleChange: function(oEvent) {
			/*	var oText = this.byId("textResult"),
					oDP = oEvent.getSource(),
					sValue = oEvent.getParameter("value");
				window.console.log(sValue, oText, oDP);

				this._iEvent++;
				oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);*/

		},
		onClick: function(oEvent) {
			var oDialog = this.byId("BusyDialog");
					oDialog.open();
			var plant=sap.ui.getCore().getModel("login").oData.plant;
			var plo_prof = this.byId("plo_prof").getValue();
			var material = this.byId("material").getValue();
			var plo_qty = this.byId("plo_qty").getValue();
			var plo_sdate = this.byId("plo_sdate").getValue();
			var plo_fdate = this.byId("plo_fdate").getValue();
			var sdate = this.convertDate(plo_sdate);
			var fdate = this.convertDate(plo_fdate);
			this.byId("plo_prof").setValue("");
			this.byId("material").setValue("");
			this.byId("plo_qty").setValue("");
			this.byId("plo_sdate").setValue("");
			this.byId("plo_fdate").setValue("");
			window.console.log(plo_sdate);
			var parameters = {
				"PldordProfile": plo_prof,
				"Material": material,
				"PlanPlant": plant,
				"ProdPlant": plant,
				"TotalPlordQty": plo_qty,
				"OrderStartDate": sdate,
				"OrderFinDate": fdate
			};
			var surl="/sap/opu/odata/SAP/ZSFLOGIN_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
    
            oModel.create("/createSet", parameters,{
            	
                //context: parameters,
               
              
                success: function(oData, oResponse) {
                	
                    window.console.log(oData);
                    oDialog.close();
                    if(oData.PlannedorderNum!==""){
                    MessageBox.success("Plan order is created with "+oData.PlannedorderNum);
                    }
                    else{
                    	MessageBox.error("Error occured");
                    }
                   
                
                },    
                error: function(oData, oResponse) {
                
                        window.console.log('HIIIIIIIIIIIIII IN ERROR',oData,oResponse);
                        
                        oDialog.close();
                        MessageBox.error("Error occured");
                        
		}	});
		},
		convertDate: function(date) {
			var splitted = date.split("-");
			var newDate = new Date(Date.UTC(splitted[0], splitted[1] - 1, splitted[2]));

			return '\/Date(' + newDate.getTime() + ')\/';
		}


		});

});