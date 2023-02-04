import {
    max,
} from 'd3';
// date function
// - check dates
// - addDate - for not yet ended periods
//

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function addDate(d, numberdays) {
    let rtime = new Date(d);

    return new Date(
        rtime.getTime() +
        numberdays * 24 * 60 * 60 * 1000
    );
}

export function dataProcessing(data) {

    // determine maximum values for the graph
    // for not yet defined eindregistratie/eindgeldigheid use temporary maximum and add 7 days
    const extraDays = 7;

    // determine maximum values for registrie/geldigheid of dataset
    const tempxMax = max(data, (d) =>
        isValidDate(d.eindRegistratie)
            ? d.eindRegistratie
            : d.tijdstipRegistratie
    );

    const tempGeldigMax = max(data, (d) =>
        isValidDate(d.eindGeldigheid)
            ? d.eindGeldigheid
            : d.beginGeldigheid
    );

    const tempInWerkingMax = max(data, (d) =>
        isValidDate(d.eindInwerking)
            ? d.eindInwerking
            : d.beginInwerking
    );

    // determine maximum values for the graph
    // for not yet defined eindregistratie/eindgeldigheid use temporary maximum and add 7 days    
    const xMax = addDate(tempxMax, extraDays);
    const GeldigMax = addDate(tempGeldigMax, extraDays);
    const InwerkingMax = addDate(tempInWerkingMax, extraDays);

    const marks = data.map((d) => ({
        beginGeldigheid: d.beginGeldigheid,
        eindGeldigheid: isValidDate(
            d.eindGeldigheid
        )
            ? d.eindGeldigheid
            : GeldigMax,

        beginInwerking: d.beginInwerking,
        eindInwerking: isValidDate(
            d.eindInwerking
        )
            ? d.eindInwerking
            : InwerkingMax,
        tijdstipRegistratie: d.tijdstipRegistratie,
        eindRegistratie: isValidDate(
            d.eindRegistratie
        )
            ? d.eindRegistratie
            : xMax,
        value: d.value,
    }));

    return marks;
};

