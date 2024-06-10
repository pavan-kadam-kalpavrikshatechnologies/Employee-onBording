sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("sap.kt.demo.employeedetailscapm.controller.Singup", {
            onInit: function () {


            },
            onSignup: function () {

                var eId = this.getView().byId("userID").getValue();
                var eUserName = this.getView().byId("userName").getValue();
                var ePassword = this.getView().byId("password").getValue();
                var eType = this.getView().byId("type").getValue();
                var eFirstname = this.getView().byId("firstName").getValue();
                var eLastName = this.getView().byId("lastName").getValue();
                var eDob = this.getView().byId("DOB").getValue();
                var eEmail = this.getView().byId("email").getValue();
                var eAddress = this.getView().byId("address").getValue();
                var eMobile = this.getView().byId("mobile").getValue();
                var salary = this.getView().byId("salary").getValue();
                var oJsonData = {
                    "ID": eId,
                    "userName": eUserName,
                    "password": ePassword,
                    "type": eType,
                    "empDetail": {
                        "ID": eId,
                        "firstName": eFirstname,
                        "lastName": eLastName,
                        "DOB": eDob,
                        "email": eEmail,
                        "address": eAddress,
                        "mobile": eMobile,
                        "salary": salary,
                    }
                }

                var oModel = this.getOwnerComponent().getModel();
                oModel.create("/Login", oJsonData, {
                    success: function (oData) {
                        console.log(oData);
                        sap.ui.m.MeassgeTost.show("Create Successfully")
                    }.bind(this),
                    error: function (oError) {
                        console.log(oError);
                    }
                });
            },

            onButtonPress: function () {
                var Router = this.getOwnerComponent().getRouter();
                Router.navTo("RouteView1");
            }

        });
    });
