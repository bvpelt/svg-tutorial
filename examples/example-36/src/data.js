
const stringTimes = [
  {
    tijdstipRegistratie: '2020-01-02T08:00:00',
    eindRegistratie: '2020-02-02T08:00:00',
    beginGeldigheid: '2020-01-01',
    eindGeldigheid: null,
    beginInwerking: '2021-01-13',
    eindInwerking: null,
    value: 'versie 1 org',
  },

  {
    tijdstipRegistratie: '2020-02-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-01-01',
    eindGeldigheid: '2020-02-01',
    beginInwerking: '2021-01-13',
    eindInwerking: '2021-02-13',
    value: 'versie 1',
  },
  {
    tijdstipRegistratie: '2020-02-02T08:00:00',
    eindRegistratie: '2020-03-02T08:00:00',
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: null,
    beginInwerking: '2021-02-13',
    eindInwerking: null,
    value: 'versie 2 org',
  },

  {
    tijdstipRegistratie: '2020-03-02T08:00:00',
    eindRegistratie: '2020-04-02T08:00:00',
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: '2020-03-01',
    beginInwerking: '2021-02-13',
    eindInwerking: '2021-03-01',
    value: 'versie 2',
  },
  {
    tijdstipRegistratie: '2020-04-02T08:00:00',
    eindRegistratie: '2020-04-12T08:00:00',
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: '2020-03-01',
    beginInwerking: '2021-02-13',
    eindInwerking: '2021-03-01',
    value: 'versie 2.1',
  },
  {
    tijdstipRegistratie: '2020-04-12T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-02-01',
    eindGeldigheid: '2020-03-01',
    beginInwerking: '2021-02-13',
    eindInwerking: '2021-03-01',
    value: 'versie 2.2',
  },
  {
    tijdstipRegistratie: '2020-03-02T08:00:00',
    eindRegistratie: '2020-04-02T08:00:00',
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: null,
    beginInwerking: '2021-03-01',
    eindInwerking: null,
    value: 'versie 3 org',
  },
  {
    tijdstipRegistratie: '2020-04-02T08:00:00',
    eindRegistratie: '2020-04-10T08:00:00',
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: '2020-04-01',
    beginInwerking: '2021-03-01',
    eindInwerking: '2021-04-01',
    value: 'versie 3',
  },

  {
    tijdstipRegistratie: '2020-04-10T08:00:00',
    eindRegistratie: '2020-04-21T08:00:00',
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: '2020-04-01',
    beginInwerking: '2021-03-01',
    eindInwerking: '2021-04-01',
    value: 'versie 3.1',
  },

  {
    tijdstipRegistratie: '2020-04-21T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-03-01',
    eindGeldigheid: '2020-04-01',
    beginInwerking: '2021-03-01',
    eindInwerking: '2021-04-01',
    value: 'versie 3.2',
  },
  {
    tijdstipRegistratie: '2020-04-02T08:00:00',
    eindRegistratie: '2020-05-02T08:00:00',
    beginGeldigheid: '2020-04-01',
    eindGeldigheid: null,
    beginInwerking: '2021-04-01',
    eindInwerking: null,
    value: 'versie 4 org',
  },

  {
    tijdstipRegistratie: '2020-05-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-04-01',
    eindGeldigheid: '2020-05-01',
    beginInwerking: '2021-04-01',
    eindInwerking: '2021-05-01',
    value: 'versie 4',
  },
  {
    tijdstipRegistratie: '2020-05-02T08:00:00',
    eindRegistratie: null,
    beginGeldigheid: '2020-05-01',
    eindGeldigheid: null,
    beginInwerking: '2021-05-01',
    eindInwerking: null,
    value: 'versie 5 org',
  },
];

export var timeTable = stringTimes;


