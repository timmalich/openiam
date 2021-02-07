import { IApplication } from 'app/shared/model/application.model';
import { IAccessor } from 'app/shared/model/accessor.model';

export interface IEntitlement {
  id?: number;
  name?: string;
  description?: string;
  application?: IApplication;
  accessors?: IAccessor[];
}

export const defaultValue: Readonly<IEntitlement> = {};
