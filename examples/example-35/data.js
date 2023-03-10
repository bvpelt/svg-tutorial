
const stringTimes = [
  {
    tijdstipRegistratie: '2020-01-01T08:00:00',
    eindRegistratie:  '2020-02-01T08:00:00',
    beginGeldigheid: '2020-01-02',
    eindGeldigheid: null,
    value: 'versie 1',
  },

  {
    tijdstipRegistratie: '2020-02-01T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-01-02',
    eindGeldigheid: '2020-02-02',
    value: 'versie 1',
  },
  {
    tijdstipRegistratie: '2020-02-01T08:00:00',
    eindRegistratie: '2020-03-01T08:00:00',
    beginGeldigheid: '2020-02-02',
    eindGeldigheid: null,
    value: 'versie 2',
  },
    
  {
    tijdstipRegistratie: '2020-03-01T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-02-02',
    eindGeldigheid: '2020-03-02',
    value: 'versie 2',
  },
  
  {
    tijdstipRegistratie: '2020-03-01T08:00:00',
    eindRegistratie: '2020-04-01T08:00:00',
    beginGeldigheid: '2020-03-02',
    eindGeldigheid: null,
    value: 'versie 3',
  },
  
  {
    tijdstipRegistratie: '2020-04-01T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-03-02',
    eindGeldigheid: '2020-04-02',
    value: 'versie 3',
  },
  {
    tijdstipRegistratie: '2020-04-01T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-04-02',
    eindGeldigheid: null,
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
  timeLine.value = d.value;

  timeTable.push(timeLine);
});


