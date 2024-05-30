sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.kt.demo.employeedetailscapm.controller.Employee", {
        onInit: function () {
            
            
        },
        onButtonPress:function(){
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo("RouteView1");
        }
        
    });
});
