using my.Login as my from '../db/data-model';

service CatalogService {
   entity Login as projection on my.Login;

   entity empDetails as projection on my.empDetails;

   entity empEducation as projection on my.empEducation;

   entity employment as projection on my.employment;

   entity empAttachment as projection on my.empAttachment;
}