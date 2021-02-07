import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplication } from 'app/shared/model/application.model';
import { getEntities as getApplications } from 'app/entities/application/application.reducer';
import { IAccessor } from 'app/shared/model/accessor.model';
import { getEntities as getAccessors } from 'app/entities/accessor/accessor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entitlement.reducer';
import { IEntitlement } from 'app/shared/model/entitlement.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntitlementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntitlementUpdate = (props: IEntitlementUpdateProps) => {
  const [applicationId, setApplicationId] = useState('0');
  const [accessorId, setAccessorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { entitlementEntity, applications, accessors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/entitlement');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplications();
    props.getAccessors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...entitlementEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="openiamApp.entitlement.home.createOrEditLabel">
            <Translate contentKey="openiamApp.entitlement.home.createOrEditLabel">Create or edit a Entitlement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entitlementEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entitlement-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="entitlement-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="entitlement-name">
                  <Translate contentKey="openiamApp.entitlement.name">Name</Translate>
                </Label>
                <AvField id="entitlement-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="entitlement-description">
                  <Translate contentKey="openiamApp.entitlement.description">Description</Translate>
                </Label>
                <AvField id="entitlement-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="entitlement-application">
                  <Translate contentKey="openiamApp.entitlement.application">Application</Translate>
                </Label>
                <AvInput id="entitlement-application" type="select" className="form-control" name="application.id">
                  <option value="" key="0" />
                  {applications
                    ? applications.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/entitlement" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  applications: storeState.application.entities,
  accessors: storeState.accessor.entities,
  entitlementEntity: storeState.entitlement.entity,
  loading: storeState.entitlement.loading,
  updating: storeState.entitlement.updating,
  updateSuccess: storeState.entitlement.updateSuccess,
});

const mapDispatchToProps = {
  getApplications,
  getAccessors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntitlementUpdate);
