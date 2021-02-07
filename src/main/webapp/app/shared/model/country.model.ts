import { IAccessor } from 'app/shared/model/accessor.model';
import { IOrganization } from 'app/shared/model/organization.model';

export interface ICountry {
  id?: number;
  countryName?: string;
  countryCode?: string;
  accessor?: IAccessor;
  organization?: IOrganization;
}

export const defaultValue: Readonly<ICountry> = {};
