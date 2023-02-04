
const stringTimes = [
  {
    tijdstipRegistratie: '2020-01-02T08:00:00',
    eindRegistratie:  '2020-02-02T08:00:00',
    beginGeldigheid: '2020-01-01',
    eindGeldigheid: null,
    beginInwerking: '2020-01-01',
    eindInwerking: null,
    value: 'versie 1',
  },

  {
    tijdstipRegistratie: '2020-02-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-01-01',
    eindGeldigheid: '2020-02-01',
    beginInwerking: '2021-01-01',
    eindInwerking: '2021-02-01',
    value: 'versie 1',
  },
  {
    tijdstipRegistratie: '2020-02-02T08:00:00',
    eindRegistratie: '2020-03-02T08:00:00',
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: null,
    beginInwerking: '2021-02-01',
    eindInwerking: null,
    value: 'versie 2',
  },
    
  {
    tijdstipRegistratie: '2020-03-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: '2020-03-01',
    beginInwerking: '2021-02-01',
    eindInwerking: '2021-03-01',
    value: 'versie 2',
  },
  
  {
    tijdstipRegistratie: '2020-03-02T08:00:00',
    eindRegistratie: '2020-04-02T08:00:00',
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: null,
    beginInwerking: '2021-03-01',
    eindInwerking: null,
    value: 'versie 3',
  },
  
  {
    tijdstipRegistratie: '2020-04-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: '2020-04-01',
    beginInwerking: '2021-03-01',
    eindInwerking: '2021-04-01',
    value: 'versie 3',
  },
  {
    tijdstipRegistratie: '2020-04-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-04-01',
    eindGeldigheid: null,
    beginInwerking: '2021-04-01',
    eindInwerking: null,
    value: 'versie 4',
  },  
];

export var timeTable = [];

stringTimes.forEach((d) => {
  let timeLine = {};
  timeLine.tijdstipRegistratie = new Date(d.tijdstipRegistratie + 'Z');
  timeLine.eindRegistratie = (timeLine.eindRegistratie !== null) ? new Date(d.eindRegistratie + 'Z') : null;
  timeLine.beginGeldigheid = new Date(d.beginGeldigheid + 'Z');
  timeLine.eindGeldigheid = (timeLine.eindGeldigheid  !== null) ? new Date(d.eindGeldigheid + 'Z'): null;
  timeLine.beginInwerking = new Date(d.beginInwerking + 'Z');
  timeLine.eindInwerking = (timeLine.eindInwerking  !== null) ? new Date(d.eindInwerking + 'Z'): null;
  timeLine.value = d.value;

  timeTable.push(timeLine);
});

