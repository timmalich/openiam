import { ICountry } from 'app/shared/model/country.model';
import { IEntitlement } from 'app/shared/model/entitlement.model';
import { IOrganization } from 'app/shared/model/organization.model';
import { Community } from 'app/shared/model/enumerations/community.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IAccessor {
  id?: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  community?: Community;
  language?: Language;
  blocked?: boolean;
  countries?: ICountry[];
  entitlements?: IEntitlement[];
  organizations?: IOrganization[];
}

export const defaultValue: Readonly<IAccessor> = {
  blocked: false,
};
