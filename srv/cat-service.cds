using my.Login as my from '../db/data-model';
using {API_BUSINESS_PARTNER as bupa} from './external/API_BUSINESS_PARTNER';


service CatalogService {
   entity Login         as projection on my.Login;
   entity empDetails    as projection on my.empDetails;
   entity empEducation  as projection on my.empEducation;
   entity employment    as projection on my.employment;
   entity empAttachment as projection on my.empAttachment;

   //  entity Suppliers as projection on bupa.A_Supplier;
   entity Suppliers     as
      projection on bupa.A_BusinessPartner {
         key BusinessPartner          as ID,
             BusinessPartnerFullName  as fullName,
             BusinessPartnerIsBlocked as isBlocked,
      }

   type SuppliersData {
      ID        : String(20);
      fullName  : String(30);
      isBlocked : Boolean;
   }

   function SuppliersDataIsBlocked(value: Boolean)                           returns array of SuppliersData;

   type loginapp {
      type      : String(20);
      userCount : Integer;
   }

   function usercount()                                        returns array of loginapp;

   type addUserData {
      ID           : String(20);
      userName     : String(20);
      password     : String(20);
      type         : String(20);
      empDetail    : {
         ID        : String(20);
         firstName : String(20);
         login     : Association to Login;
         lastName  : String(20);
         DOB       : Date;
         email     : String(50);
         address   : String(100);
         mobile    : String(20);
         salary    : Integer;
      }
   }

   action   addUser(excledata : array of addUserData)          returns array of addUserData;

   type incrementSalary {
      ID     : String(20);
      salary : Integer;
   }

   action   addSalary(ID : String(20), salary : Decimal(5, 2)) returns incrementSalary;
}
