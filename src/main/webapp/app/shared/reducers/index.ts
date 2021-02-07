import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import organization, {
  OrganizationState
} from 'app/entities/organization/organization.reducer';
// prettier-ignore
import accessor, {
  AccessorState
} from 'app/entities/accessor/accessor.reducer';
// prettier-ignore
import application, {
  ApplicationState
} from 'app/entities/application/application.reducer';
// prettier-ignore
import entitlement, {
  EntitlementState
} from 'app/entities/entitlement/entitlement.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly country: CountryState;
  readonly organization: OrganizationState;
  readonly accessor: AccessorState;
  readonly application: ApplicationState;
  readonly entitlement: EntitlementState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  country,
  organization,
  accessor,
  application,
  entitlement,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
