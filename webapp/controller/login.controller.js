sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("bala.comshopfloor_portal.controller.login", {
		
		
			onClick:function(oEvent){
				var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				
				var userid=this.byId("userid").getValue();
				var password=this.byId("password").getValue();
				window.console.log(userid,password);
				var surl="/sap/opu/odata/SAP/ZSFLOGIN_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
            
            var Plant ='' ;
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
                    		oRouter.navTo("sfdashboard");
                             sap.m.MessageToast.show('Login success');
                             mrp =oResponse.data.MrpController;
                            Plant = oResponse.data.Plant;
                        
                            	
			
								
                    }
                    else
                    {
                         sap.m.MessageToast.show('Invalid Credentials!');
                    }
                
                },    
                error: function(oData, oResponse) {
                
                        window.console.log('HIIIIIIIIIIIIII IN ERROR');
                        sap.m.MessageToast.show('Invalid Credentials!');
                        oModel.read("/plolistSet?$filter=MrpCtrl eq '001' and PlanPlant eq 'SA02'",{
                        	context: null,
                urlParameters: null,
                async: false,
                success: function(oData1, oRes) {
                	window.console.log(oData1,oRes);
                }
                        });
                            
                
                }

 

            });
            
    
			}
			
	});
			

	});