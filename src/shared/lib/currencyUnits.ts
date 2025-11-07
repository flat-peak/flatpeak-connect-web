// All currencies from countries list (countries.ts) with exponent greater than 0
export const CURRENCY_MINOR_DATA: Record<
  string,
  { symbol: string; exponent: number }
> = {
  AED: { symbol: 'fils', exponent: 2 }, // United Arab Emirates
  AFN: { symbol: 'pul', exponent: 2 }, // Afghanistan
  ALL: { symbol: 'qindarkë', exponent: 2 }, // Albania
  AMD: { symbol: 'luma', exponent: 2 }, // Armenia
  ANG: { symbol: 'cent', exponent: 2 },
  AOA: { symbol: 'cêntimo', exponent: 2 }, // Angola
  ARS: { symbol: '¢', exponent: 2 }, // Argentina
  AUD: { symbol: '¢', exponent: 2 }, // Australia, Tuvalu, Kiribati, Nauru
  AWG: { symbol: 'cent', exponent: 2 },
  AZN: { symbol: 'qəpik', exponent: 2 }, // Azerbaijan
  BAM: { symbol: 'fening', exponent: 2 }, // Bosnia and Herzegovina
  BBD: { symbol: '¢', exponent: 2 }, // Barbados
  BDT: { symbol: 'poisha', exponent: 2 }, // Bangladesh
  BGN: { symbol: 'st.', exponent: 2 }, // Bulgaria
  BHD: { symbol: 'fils', exponent: 3 }, // Bahrain
  BMD: { symbol: '¢', exponent: 2 },
  BND: { symbol: 'sen', exponent: 2 }, // Brunei Darussalam
  BOB: { symbol: 'centavo', exponent: 2 }, // Bolivia
  BRL: { symbol: '¢', exponent: 2 }, // Brazil
  BSD: { symbol: '¢', exponent: 2 }, // Bahamas
  BTN: { symbol: 'chhertum', exponent: 2 }, // Bhutan
  BWP: { symbol: 'thebe', exponent: 2 }, // Botswana
  BYN: { symbol: 'кап', exponent: 2 }, // Belarus
  BZD: { symbol: '¢', exponent: 2 }, // Belize
  CAD: { symbol: '¢', exponent: 2 }, // Canada
  CDF: { symbol: 'centime', exponent: 2 }, // Congo, Democratic Republic of the
  CHF: { symbol: 'Rp.', exponent: 2 }, // Switzerland, Liechtenstein
  CNY: { symbol: '分', exponent: 2 }, // China
  COP: { symbol: '¢', exponent: 2 }, // Colombia
  CRC: { symbol: 'céntimo', exponent: 2 }, // Costa Rica
  CUP: { symbol: 'centavo', exponent: 2 }, // Cuba
  CVE: { symbol: 'centavo', exponent: 2 },
  CZK: { symbol: 'h', exponent: 2 }, // Czech Republic
  DKK: { symbol: 'øre', exponent: 2 }, // Denmark, Faroe Islands, Greenland
  DOP: { symbol: 'centavo', exponent: 2 }, // Dominican Republic
  DZD: { symbol: 'santeem', exponent: 2 }, // Algeria
  EGP: { symbol: 'piastre', exponent: 2 },
  ERN: { symbol: 'cent', exponent: 2 }, // Eritrea
  ETB: { symbol: 'santim', exponent: 2 }, // Ethiopia
  EUR: { symbol: 'c', exponent: 2 }, // Andorra, Austria and 29 more
  FJD: { symbol: '¢', exponent: 2 }, // Fiji
  FKP: { symbol: 'p', exponent: 2 }, // Falkland Islands
  GBP: { symbol: 'p', exponent: 2 }, // United Kingdom
  GEL: { symbol: 'tetri', exponent: 2 }, // Georgia
  GHS: { symbol: 'pesewa', exponent: 2 }, // Ghana
  GIP: { symbol: 'p', exponent: 2 },
  GMD: { symbol: 'butut', exponent: 2 },
  GTQ: { symbol: 'centavo', exponent: 2 }, // Guatemala
  GYD: { symbol: '¢', exponent: 2 }, // Guyana
  HKD: { symbol: '¢', exponent: 2 }, // Hong Kong
  HNL: { symbol: 'centavo', exponent: 2 }, // Honduras
  HTG: { symbol: 'centime', exponent: 2 }, // Haiti
  HUF: { symbol: 'fillér', exponent: 2 },
  IDR: { symbol: 'sen', exponent: 2 }, // Indonesia
  ILS: { symbol: 'agora', exponent: 2 }, // Israel, Palestine
  INR: { symbol: 'p', exponent: 2 }, // India
  IQD: { symbol: 'fils', exponent: 3 }, // Iraq
  IRR: { symbol: 'dinar', exponent: 2 }, // Iran
  JMD: { symbol: '¢', exponent: 2 }, // Jamaica
  JOD: { symbol: 'fils', exponent: 3 }, // Jordan
  KES: { symbol: 'cent', exponent: 2 }, // Kenya
  KGS: { symbol: 'tyiyn', exponent: 2 }, // Kyrgyzstan
  KHR: { symbol: 'sen', exponent: 2 }, // Cambodia
  KPW: { symbol: 'chon', exponent: 2 }, // North Korea
  KWD: { symbol: 'fils', exponent: 3 }, // Kuwait
  KYD: { symbol: '¢', exponent: 2 },
  KZT: { symbol: 'tiyn', exponent: 2 }, // Kazakhstan
  LAK: { symbol: 'att', exponent: 2 }, // Laos
  LBP: { symbol: 'piastre', exponent: 2 }, // Lebanon
  LKR: { symbol: 'cent', exponent: 2 }, // Sri Lanka
  LRD: { symbol: '¢', exponent: 2 },
  LSL: { symbol: 'sente', exponent: 2 },
  LYD: { symbol: 'dirham', exponent: 3 }, // Libya
  MAD: { symbol: 'centime', exponent: 2 }, // Morocco, Western Sahara
  MDL: { symbol: 'ban', exponent: 2 }, // Moldova
  MGA: { symbol: 'iraimbilanja', exponent: 2 }, // Madagascar
  MKD: { symbol: 'deni', exponent: 2 }, // North Macedonia
  MMK: { symbol: 'pya', exponent: 2 }, // Burma
  MNT: { symbol: 'möngö', exponent: 2 }, // Mongolia
  MOP: { symbol: 'avo', exponent: 2 },
  MRU: { symbol: 'khoums', exponent: 5 }, // Mauritania
  MUR: { symbol: 'cent', exponent: 2 }, // Mauritius
  MVR: { symbol: 'laari', exponent: 2 }, // Maldives
  MWK: { symbol: 'tambala', exponent: 2 }, // Malawi
  MXN: { symbol: '¢', exponent: 2 }, // Mexico
  MYR: { symbol: 'sen', exponent: 2 }, // Malaysia
  MZN: { symbol: 'centavo', exponent: 2 }, // Mozambique
  NAD: { symbol: '¢', exponent: 2 },
  NGN: { symbol: 'kobo', exponent: 2 }, // Nigeria
  NIO: { symbol: 'centavo', exponent: 2 }, // Nicaragua
  NOK: { symbol: 'øre', exponent: 2 }, // Norway
  NPR: { symbol: 'paisa', exponent: 2 }, // Nepal
  NZD: { symbol: '¢', exponent: 2 }, // New Zealand, Niue, Cook Islands
  OMR: { symbol: 'baisa', exponent: 3 }, // Oman
  PAB: { symbol: 'centésimo', exponent: 2 }, // Panama
  PEN: { symbol: '¢', exponent: 2 }, // Peru
  PGK: { symbol: 'toea', exponent: 2 }, // Papua New Guinea
  PHP: { symbol: 'sentimo', exponent: 2 }, // Philippines
  PKR: { symbol: 'paisa', exponent: 2 }, // Pakistan
  PLN: { symbol: 'gr', exponent: 2 }, // Poland
  QAR: { symbol: 'dirham', exponent: 2 }, // Qatar
  RON: { symbol: 'bani', exponent: 2 }, // Romania
  RSD: { symbol: 'para', exponent: 2 }, // Serbia
  RUB: { symbol: 'коп', exponent: 2 }, // Russia
  SAR: { symbol: 'halala', exponent: 2 }, // Saudi Arabia
  SBD: { symbol: '¢', exponent: 2 }, // Solomon Islands
  SCR: { symbol: 'cent', exponent: 2 }, // Seychelles
  SDG: { symbol: 'piastre', exponent: 2 }, // Sudan
  SEK: { symbol: 'öre', exponent: 2 }, // Sweden
  SGD: { symbol: '¢', exponent: 2 }, // Singapore
  SHP: { symbol: 'p', exponent: 2 },
  SLL: { symbol: 'cent', exponent: 2 },
  SOS: { symbol: 'cent', exponent: 2 }, // Somalia
  SRD: { symbol: 'cent', exponent: 2 }, // Suriname
  SSP: { symbol: 'piastre', exponent: 2 }, // South Sudan
  STN: { symbol: 'cêntimo', exponent: 2 }, // Sao Tome and Principe
  SYP: { symbol: 'piastre', exponent: 2 }, // Syria
  SZL: { symbol: 'cent', exponent: 2 }, // Swaziland
  THB: { symbol: 'satang', exponent: 2 }, // Thailand
  TJS: { symbol: 'diram', exponent: 2 }, // Tajikistan
  TMT: { symbol: 'tenge', exponent: 2 }, // Turkmenistan
  TND: { symbol: 'millimes', exponent: 3 }, // Tunisia
  TOP: { symbol: 'seniti', exponent: 2 }, // Tonga
  TRY: { symbol: 'Kr', exponent: 2 }, // Turkey
  TTD: { symbol: '¢', exponent: 2 }, // Trinidad and Tobago
  TWD: { symbol: 'cent', exponent: 2 }, // Taiwan
  TZS: { symbol: 'cent', exponent: 2 }, // Tanzania
  UAH: { symbol: 'коп', exponent: 2 }, // Ukraine
  USD: { symbol: '¢', exponent: 2 }, // United States, Ecuador, El Salvador, Palau, Federated States of Micronesia, Marshall Islands
  UYI: { symbol: '¢', exponent: 2 },
  UYU: { symbol: 'centésimo', exponent: 2 }, // Uruguay
  UZS: { symbol: 'tiyin', exponent: 2 }, // Uzbekistan
  VES: { symbol: 'céntimo', exponent: 2 }, // Venezuela
  WST: { symbol: 'sene', exponent: 2 }, // Samoa
  XCD: { symbol: '¢', exponent: 2 }, // Antigua and Barbuda, Dominica, Grenada, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines
  YER: { symbol: 'fils', exponent: 2 }, // Yemen
  ZAR: { symbol: 'c', exponent: 2 }, // South Africa, Lesotho, Namibia
  ZMW: { symbol: 'ngwee', exponent: 2 }, // Zambia
  ZWL: { symbol: 'cent', exponent: 2 } // Zimbabwe
};
