sap.ui.define([
	
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast"
	
], function(Controller,MessageBox, Fragment, syncStyleClass, MessageToast) {
	"use strict";
	var coreModel=new sap.ui.model.json.JSONModel();
	return Controller.extend("bala.comshopfloor_portal.controller.login", {
		
		
			onClick:function(oEvent){
				var oDialog = this.byId("BusyDialog");
					oDialog.open();
			
				var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				
				var userid=this.byId("userid").getValue();
				var password=this.byId("password").getValue();
				window.console.log(userid,password);
				var surl="/sap/opu/odata/SAP/ZSFLOGIN_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
            
            var plant ='' ;
            var mrp='';
            oModel.read("/loginSet(Userid='"+userid+"',Password='"+password+"')", {
            
                context: null,
                urlParameters: null,
                async: false,
                success: function(oData, oResponse) {
                	
                    window.console.log(oData);
                        window.console.log(oResponse.data.Plant);
                            window.console.log(oResponse.data.MrpCtrl);
                    if(oResponse.data.Type==="S"){
                    		
                             sap.m.MessageToast.show('Login success');
                             mrp =oResponse.data.MrpCtrl;
                        	plant = oResponse.data.Plant;
                        	coreModel.setData({mrp:mrp,plant:plant}, "login");
                            sap.ui.getCore().setModel(coreModel, "login");
                            oRouter.navTo("sfdashboard");
                            oDialog.close();
			
								
                    }
                    else
                    {
                         sap.m.MessageToast.show('Invalid Credentials!');
                         oDialog.close();
                    }
                    
                
                },    
                error: function(oData, oResponse) {
                
                        window.console.log('HIIIIIIIIIIIIII IN ERROR');
                        sap.m.MessageToast.show('Invalid Credentials!');
                        oDialog.close();
                            
                
                }

 

            });
            
    
			}
			
	});
			

	});