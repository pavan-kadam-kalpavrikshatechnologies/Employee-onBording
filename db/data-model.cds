namespace my.Login;

entity Login {
  key ID : String(20);
  userName : String(20);
  password : String(20); 
  type : String(20);
}

entity empDetails {  
  key ID : String(20);
  firstName : String(20);
  lastName : String(20);
  DOB : Date;
  email : String(50); 
  address : String(100);  
  mobile : String(20);
}

entity empEducation {
  key ID : String(20);
  collegeName : String(50); 
  degree : String(30);
  fromDate : Date;
  toDate : Date;
  grade : String(5); 
}

entity employment {
  key eID : String(20);
  companyName : String(20);  
  startDate : Date;
  endDate : Date;
  designation : String(30);
  officeAddress : String(100);  
}

entity empAttachment {
  key eID : String(20);
  attachmentType : String(20);
  expireDate : Date;
  documentNo : Integer;
}
