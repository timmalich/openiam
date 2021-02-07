import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Entitlement from './entitlement';
import EntitlementDetail from './entitlement-detail';
import EntitlementUpdate from './entitlement-update';
import EntitlementDeleteDialog from './entitlement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EntitlementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EntitlementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EntitlementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Entitlement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EntitlementDeleteDialog} />
  </>
);

export default Routes;
