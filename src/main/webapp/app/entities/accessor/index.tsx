import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Accessor from './accessor';
import AccessorDetail from './accessor-detail';
import AccessorUpdate from './accessor-update';
import AccessorDeleteDialog from './accessor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccessorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccessorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccessorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Accessor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AccessorDeleteDialog} />
  </>
);

export default Routes;
