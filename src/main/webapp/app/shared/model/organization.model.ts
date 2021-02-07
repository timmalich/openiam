import { ICountry } from 'app/shared/model/country.model';
import { IAccessor } from 'app/shared/model/accessor.model';
import { Community } from 'app/shared/model/enumerations/community.model';

export interface IOrganization {
  id?: number;
  name?: string;
  postcode?: string;
  city?: string;
  streetAddress?: string;
  stateProvince?: string;
  community?: Community;
  countries?: ICountry[];
  accessors?: IAccessor[];
}

export const defaultValue: Readonly<IOrganization> = {};
