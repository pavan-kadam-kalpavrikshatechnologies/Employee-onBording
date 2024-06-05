using my.Login as my from '../db/data-model';

service CatalogService {
   entity Login as projection on my.Login;

   entity empDetails as projection on my.empDetails;

   entity empEducation as projection on my.empEducation;

   entity employment as projection on my.employment;

   entity empAttachment as projection on my.empAttachment;

   type loginapp {
      type:String(20);
      userCount : Integer;
   }
   function usercount() returns array of loginapp;

   type addUserData {
      ID : String(20);
      userName : String(20);
      password : String(20); 
      type : String(20);
      empDetail:{
         ID : String(20);
         firstName : String(20);
         login : Association to Login;
         lastName : String(20);
         DOB : Date;
         email : String(50); 
         address : String(100);  
         mobile : String(20);
         salary : Integer;
      }
   }
   action addUser(excledata:array of addUserData) returns array of addUserData;
   // action increaseSalary(ID: String(20), salary: Integer) returns addUserData;

   type incrementSalary {
      ID : String(20);
      salary : Integer;
   }
   action addSalary(ID:String(20),salary:Decimal(5,2)) returns incrementSalary;
}