sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    
    return Controller.extend("sap.kt.demo.employeedetailscapm.controller.View1", {
            onInit: function () {
                
                // this.localModel = new sap.ui.model.json.JSONModel();
                // this.getOwnerComponent().setModel(this.localModel, "localModel");

                var oModel = this.getOwnerComponent().getModel()
                oModel.callFunction("/usercount", {
                    method: "GET",
                    success: function (oData) {
                        console.log(oData);
                        var jsondata = new sap.ui.model.json.JSONModel(oData.results)
                        this.getView().setModel(jsondata, "jsondata")
                    }.bind(this),
                    error: function (error) {
                        console.log(error);
                    }
                })
                
            },
            onLoginPress: function () {
                var username = this.byId("usernameInput").getValue();
                var password = this.byId("passwordInput").getValue();
                
                if (username !== "" && password !== "") {
                    var oModel = this.getOwnerComponent().getModel();

                    oModel.read("/Login", {
                        filters: [
                            new sap.ui.model.Filter("userName", sap.ui.model.FilterOperator.EQ, username),
                            new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, password)
                        ],
                        success: function (oData) {
                            if (oData.results.length > 0) {
                                var user = oData.results[0];
                                if (user.type === "Employee") {
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
                        error: function (oError) {
                            sap.m.MessageToast.show("Error during login");
                        }
                    });
                } else {
                    sap.m.MessageToast.show("Please enter username and password");
                }
            },
            
            onPressSingupView: function () {
                var Router = this.getOwnerComponent().getRouter();
                Router.navTo("RouteView4");
            },
            onUpload: function (e) {
                var file = e.getParameter("files") && e.getParameter("files")[0];
                this._import(file);
            },
            
            _import: function (file) {
                var that = this;
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var items = [];
                        workbook.SheetNames.forEach(function (sheetName) {
                            items = items.concat(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]));
                        });    
                        that.sendDataToBackend(items);
                    };
                    reader.onerror = function (ex) {
                        console.error(ex);
                    };
                    reader.readAsBinaryString(file);
                }
            },
    
            
            sendDataToBackend: function (items) {
                var that = this;
                var oDataModel = that.getOwnerComponent().getModel(); 
    
                var payload = {
                    excledata: items.map(item => ({
                        ID: String(item.ID),
                        userName: String(item.userName),
                        password: String(item.password),
                        type: String(item.type),
                        empDetail: {
                            ID: String(item.ID),
                            firstName: String(item.firstName),
                            lastName: String(item.lastName),
                            DOB: null,
                            email: String(item.email),
                            address: String(item.address),
                            mobile: String(item.mobile),
                            salary : item.salary
                        }
                    }))
                };
                
                oDataModel.create("/addUser", payload, {
                    method:"POST",
                    success: function (odata) {
                        console.log("Users added successfully:", odata);
                    },
                    error: function (error) {
                        console.log("Error adding users:", error);
                    }
                });
            },
            incrementAmount:function(){
                var userID = this.byId("userid").getValue()
                var incrementAmount = parseFloat(this.byId("amountIncrement").getValue());

                var oModel = this.getOwnerComponent().getModel()

                oModel.create("/addSalary",{
                    ID : userID,
                    salary:incrementAmount
                },{
                    method:"POST",
                    success : function(oData){
                        console.log(oData);
                    },error:function(error){
                        console.log(error);
                    }
                })
            }
        });
    });
