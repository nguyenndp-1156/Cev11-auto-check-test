export const OPTIONS_LIST_DOMAIN = [
  {
    label: 'Backend',
    value: 'backend',
  },
  {
    label: 'Frontend',
    value: 'frontend',
  },
  {
    label: 'IOS',
    value: 'ios',
  },
  {
    label: 'Android',
    value: 'android',
  },
  {
    label: 'QA',
    value: 'qa',
  },
  {
    label: 'All dev effort',
    value: 'all_dev_effort',
  },
];

export const OPTION_COMPARE_CONDITION = [
  { label: '>', value: '>' },
  { label: '=', value: '=' },
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: '=>', value: '=>' },
  { label: '+/-', value: '+/-' },
];

export const COMPARE_UNIT = [
  {
    label: '%',
    value: '%',
  },
  {
    label: 'Man-days',
    value: 'Man-days',
  },
];

export const DEFAULT_VALUE = [
  {
    id: 0,
    firstDomain: 'qa',
    compareCondition: '<=',
    compareNumber: 40,
    compareUnit: '%',
    secondDomain: 'all_dev_effort',
  },
  {
    id: 1,
    firstDomain: 'frontend',
    compareCondition: '+/-',
    compareNumber: 10,
    compareUnit: '%',
    secondDomain: 'backend',
  },
  {
    id: 2,
    firstDomain: 'ios',
    compareCondition: '+/-',
    compareNumber: 10,
    compareUnit: '%',
    secondDomain: 'backend',
  },
  {
    id: 3,
    firstDomain: 'android',
    compareCondition: '+/-',
    compareNumber: 10,
    compareUnit: '%',
    secondDomain: 'backend',
  },
];
