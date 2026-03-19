export interface Company {
  id: string;
  name: string;
  mailingName: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  telephone: string;
  mobile: string;
  fax: string;
  email: string;
  website: string;
  financialYearFrom: string;
  booksBeginningFrom: string;
  currencySymbol: string;
  formalName: string;
}

export type Screen = 'COMPANIES_LIST' | 'COMPANY_CREATE';
