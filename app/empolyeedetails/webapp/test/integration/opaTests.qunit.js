sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/kt/demo/empolyeedetails/test/integration/FirstJourney',
		'sap/kt/demo/empolyeedetails/test/integration/pages/empDetailsList',
		'sap/kt/demo/empolyeedetails/test/integration/pages/empDetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, empDetailsList, empDetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/kt/demo/empolyeedetails') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheempDetailsList: empDetailsList,
					onTheempDetailsObjectPage: empDetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);