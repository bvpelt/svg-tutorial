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

//
// for each possible graph registratie vs geldigheid or registratie vs inwerking
// detemine for each timespace the color
// 
function fillColorXY(varMaxX, varMaxY, dataMaxX, dataMaxY) {
    var color = 'none';

    const current = '#fcbbb2';
    const borderactive = '#d3f5b5';
    const inactive = '#b2f3fc'

    if (varMaxX.getTime() === dataMaxX.getTime()) {
        if (varMaxY.getTime() === dataMaxY.getTime()) {
            color = current
        } else {
            color = borderactive;
        }
    } else {
        if (varMaxY.getTime() === dataMaxY.getTime()) {
            color = borderactive;
        } else {
            color = inactive;
        }
    }
    return color;
}

function fillColor(eindRegistratie, eindGeldigheid, eindInwerking, maxRegistratie, maxGeldigheid, maxInWerking) {
    return {
        geldigheidColor: fillColorXY(eindRegistratie, eindGeldigheid, maxRegistratie, maxGeldigheid),
        inWerkingColor: fillColorXY(eindRegistratie, eindInwerking, maxRegistratie, maxInWerking),
    };
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

    // 
    // create dataset with sentinel for not ended date elements
    // not ended means no eindGeldigheid, no eindInwerking or no eindRegistratie
    //
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

    const colorMarks = marks.map((d) => ({
        beginGeldigheid: d.beginGeldigheid,
        eindGeldigheid: d.eindGeldigheid,
        beginInwerking: d.beginInwerking,
        eindInwerking: d.eindInwerking,
        tijdstipRegistratie: d.tijdstipRegistratie,
        eindRegistratie: d.eindRegistratie,
        value: d.value,
        colors: fillColor(d.eindRegistratie, d.eindGeldigheid, d.eindInwerking, xMax, GeldigMax, InwerkingMax)
    }));

    const result = {
        maxRegistratie: xMax,
        maxGeldigheid: GeldigMax,
        maxInwerking: InwerkingMax,
        data: colorMarks,
    }

    console.log(result);

    return result;
};

