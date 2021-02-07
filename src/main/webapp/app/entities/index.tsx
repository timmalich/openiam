import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Country from './country';
import Organization from './organization';
import Accessor from './accessor';
import Application from './application';
import Entitlement from './entitlement';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}accessor`} component={Accessor} />
      <ErrorBoundaryRoute path={`${match.url}application`} component={Application} />
      <ErrorBoundaryRoute path={`${match.url}entitlement`} component={Entitlement} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
