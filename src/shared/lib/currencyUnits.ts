export const CURRENCY_MINOR_DATA: Record<
  string,
  { symbol: string; exponent: number }
> = {
  // === WESTERN EUROPE ===
  
  // Eurozone (FR, DE, NL, BE, ES, PT, FI, IT, AT, GR, IE, LU, etc.)
  EUR: { symbol: 'c', exponent: 2 }, // 1€ = 100 cents
  
  GBP: { symbol: 'p', exponent: 2 }, // 1£ = 100 pence
  
  // Switzerland
  CHF: { symbol: 'Rp.', exponent: 2 }, // 1 franc = 100 rappen

  // === NORTHERN EUROPE ===
  
  // Norway
  NOK: { symbol: 'øre', exponent: 2 }, // 1 kr = 100 øre
  
  // Sweden
  SEK: { symbol: 'öre', exponent: 2 }, // 1 krona = 100 öre
  
  // Denmark
  DKK: { symbol: 'øre', exponent: 2 }, // 1 krone = 100 øre

  // === CENTRAL EUROPE ===
  
  // Poland
  PLN: { symbol: 'gr', exponent: 2 }, // 1 zł = 100 groszy
  
  // Czech Republic
  CZK: { symbol: 'h', exponent: 2 }, // 1 koruna = 100 haléřů

  // === EASTERN EUROPE ===
  
  // Russia
  RUB: { symbol: 'коп', exponent: 2 }, // 1 рубль = 100 копеек
  
  // Ukraine
  UAH: { symbol: 'коп', exponent: 2 }, // 1 гривня = 100 копійок

  // === SOUTHERN EUROPE ===
  
  // Bulgaria
  BGN: { symbol: 'st.', exponent: 2 }, // 1 lev = 100 stotinki
  
  // Romania
  RON: { symbol: 'bani', exponent: 2 }, // 1 leu = 100 bani
  
  // Croatia
  HRK: { symbol: 'lp', exponent: 2 }, // 1 kuna = 100 lipa
  
  // Turkey
  TRY: { symbol: 'Kr', exponent: 2 }, // 1 lira = 100 kuruş

  // === NORTH AMERICA ===
  
  // United States
  USD: { symbol: '¢', exponent: 2 }, // 1$ = 100 cents
  
  // Canada
  CAD: { symbol: '¢', exponent: 2 }, // 1 dollar = 100 cents
  
  // Mexico
  MXN: { symbol: '¢', exponent: 2 }, // 1 peso = 100 centavos

  // === SOUTH AMERICA ===
  
  // Brazil
  BRL: { symbol: '¢', exponent: 2 }, // 1 real = 100 centavos
  
  // Argentina
  ARS: { symbol: '¢', exponent: 2 }, // 1 peso = 100 centavos
  
  // Chile
  CLP: { symbol: '¢', exponent: 0 }, // 1 peso (centavos not used)
  
  // Colombia
  COP: { symbol: '¢', exponent: 2 }, // 1 peso = 100 centavos
  
  // Peru
  PEN: { symbol: '¢', exponent: 2 }, // 1 sol = 100 céntimos
  
  // Uruguay
  UYU: { symbol: '¢', exponent: 2 }, // 1 peso = 100 centésimos

  // === ASIA ===
  
  // China
  CNY: { symbol: '分', exponent: 2 }, // 1 元 = 100 分
  
  // Japan
  JPY: { symbol: '銭', exponent: 0 }, // 1 円 (sen not used in practice)
  
  // South Korea
  KRW: { symbol: '전', exponent: 0 }, // 1 원 (jeon not used in practice)
  
  // India
  INR: { symbol: 'p', exponent: 2 }, // 1 rupee = 100 paise
  
  // Singapore
  SGD: { symbol: '¢', exponent: 2 }, // 1 dollar = 100 cents
  
  // Hong Kong
  HKD: { symbol: '¢', exponent: 2 }, // 1 dollar = 100 cents

  // === OCEANIA ===
  
  // Australia
  AUD: { symbol: '¢', exponent: 2 }, // 1$ = 100 cents
  
  // New Zealand
  NZD: { symbol: '¢', exponent: 2 }, // 1 dollar = 100 cents

  // === AFRICA ===
  
  // South Africa
  ZAR: { symbol: 'c', exponent: 2 }, // 1 rand = 100 cents
};
