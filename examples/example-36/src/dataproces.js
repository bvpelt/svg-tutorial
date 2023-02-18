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

function isEmptyDate(d) {
    return isValidDate(d) && (d.getTime() === 0);
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

    const current = 'rgb(252,187,178)';
    const borderactive = 'rgb(211,245,181)';
    const inactive = 'rgb(179,243,252)';


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

export function dataProcessing(tempdata) {

    // Convert input table to data usable for timeplot
    //

    var data = [];
    tempdata.forEach((d, i) => {
        let timeLine = {};
        timeLine.tijdstipRegistratie = new Date(d.tijdstipRegistratie + 'Z');
        timeLine.eindRegistratie = (d.eindRegistratie === null) ? new Date(null) : new Date(d.eindRegistratie + 'Z');
        timeLine.beginGeldigheid = new Date(d.beginGeldigheid);
        timeLine.eindGeldigheid = (d.eindGeldigheid == null) ? new Date(null) : new Date(d.eindGeldigheid);
        timeLine.beginInwerking = new Date(d.beginInwerking);
        timeLine.eindInwerking = (d.eindInwerking === null) ? new Date(null) : new Date(d.eindInwerking);
        timeLine.value = d.value;

        data.push(timeLine);
    });


    // determine maximum values for the graph
    // for not yet defined eindregistratie/eindgeldigheid use temporary maximum and add 7 days
    const extraDays = 7;

    // determine maximum values for registrie/geldigheid of dataset
    const tempxMax = max(data, (d) =>
        isEmptyDate(d.eindRegistratie)
            ? d.tijdstipRegistratie
            : d.eindRegistratie
    );

    const tempGeldigMax = max(data, (d) =>
        isEmptyDate(d.eindGeldigheid)
            ? d.beginGeldigheid
            : d.eindGeldigheid
    );

    const tempInWerkingMax = max(data, (d) =>
        isEmptyDate(d.eindInwerking)
            ? d.beginInwerking
            : d.eindInwerking
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
        eindGeldigheid: isEmptyDate(d.eindGeldigheid)
            ? GeldigMax
            : d.eindGeldigheid,

        beginInwerking: d.beginInwerking,
        eindInwerking: isEmptyDate(d.eindInwerking)
            ? InwerkingMax :
            d.eindInwerking
        ,
        tijdstipRegistratie: d.tijdstipRegistratie,
        eindRegistratie: isEmptyDate(d.eindRegistratie)
            ? xMax :
            d.eindRegistratie,
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

    return result;
};

