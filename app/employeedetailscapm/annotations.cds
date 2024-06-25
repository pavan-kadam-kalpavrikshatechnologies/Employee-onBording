using CatalogService as service from '../../srv/cat-service';

annotate service.employment with {
    eID           @Common          : {Label: 'eID'};
    companyName   @Common          : {Label: 'Company Name'};
    startDate     @Common          : {Label: 'Start Date'};
    endDate       @Common          : {Label: 'End Date'};
    designation   @Common          : {Label: 'Designation'};
    officeAddress @Common          : {Label: 'Office Address'};

     @Common.ValueListWithFixedValues : true 
      eID           @Common.ValueList: {
        $Type          : 'Common.ValueListType',
        Parameters     : [  
            {
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'eID',
                LocalDataProperty: eID,
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'eID',
            }
        ],
        CollectionPath : 'employment',
        SearchSupported: true
    };

    companyName           @Common.ValueList: {
        $Type          : 'Common.ValueListType',
        Parameters     : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'companyName',
                LocalDataProperty: companyName,
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'companyName',
            }
        ],
        CollectionPath : 'employment',
        SearchSupported: true
    };
   
}