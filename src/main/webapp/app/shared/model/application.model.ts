import { IEntitlement } from 'app/shared/model/entitlement.model';
import { Community } from 'app/shared/model/enumerations/community.model';

export interface IApplication {
  id?: number;
  name?: string;
  description?: string;
  community?: Community;
  entitlements?: IEntitlement[];
}

export const defaultValue: Readonly<IApplication> = {};
