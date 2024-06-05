namespace my.Login;
using { managed } from '@sap/cds/common';
entity Login: managed {
    key ID : String(20);
    userName : String(20);
    password : String(20); 
    type : String(20);
    empDetail : Composition of empDetails on empDetail.login = $self;
    virtual userCount : Integer;
}

entity empDetails : managed {  
    key ID : String(20);
    firstName : String(20);
    login : Association to Login;
    lastName : String(20);
    DOB : Date;
    email : String(50); 
    address : String(100);  
    mobile : String(20);
    salary : Integer;
}

entity empAttachment : managed {
  key eID : String(20);
  attachmentType : String(20);
  expireDate : Date;
  documentNo : Integer;
}
entity empEducation : managed {
  key ID : String(20);
  collegeName : String(50); 
  degree : String(30);
  fromDate : Date;
  toDate : Date;
  grade : String(5); 
}

entity employment : managed {
  key eID : String(20);
  companyName : String(20);  
  startDate : Date;
  endDate : Date;
  designation : String(30);
  officeAddress : String(100);  
}

