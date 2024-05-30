sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.kt.demo.employeedetailscapm.controller.View1", {
        onInit: function () {
            
            
        },
        onLoginPress: function() {
            var username = this.byId("usernameInput").getValue();
            var password = this.byId("passwordInput").getValue();
        
            if (username !== "" && password !== "") {
                var oModel = this.getOwnerComponent().getModel();
        
                oModel.read("/Login", {
                    filters: [
                        new sap.ui.model.Filter("userName", sap.ui.model.FilterOperator.EQ, username),
                        new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, password)
                    ],
                    success: function(oData) {
                        if (oData.results.length > 0) {
                            var user = oData.results[0];
                            if (user.type === "employee") {
                                var Router = this.getOwnerComponent().getRouter();
                                Router.navTo("RouteView2");
                            } else {
                                var Router = this.getOwnerComponent().getRouter();
                                Router.navTo("RouteView3");
                            }
                        } else {
                            sap.m.MessageToast.show("Invalid username or password");
                        }
                    }.bind(this),
                    error: function(oError) {
                        sap.m.MessageToast.show("Error during login");
                    }
                });
            } else {
                sap.m.MessageToast.show("Please enter username and password");
            }
        }
        
        
    });
});
