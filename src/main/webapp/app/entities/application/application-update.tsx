import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationUpdate = (props: IApplicationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicationEntity,
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
          <h2 id="openiamApp.application.home.createOrEditLabel">
            <Translate contentKey="openiamApp.application.home.createOrEditLabel">Create or edit a Application</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="application-name">
                  <Translate contentKey="openiamApp.application.name">Name</Translate>
                </Label>
                <AvField
                  id="application-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="application-description">
                  <Translate contentKey="openiamApp.application.description">Description</Translate>
                </Label>
                <AvField id="application-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="communityLabel" for="application-community">
                  <Translate contentKey="openiamApp.application.community">Community</Translate>
                </Label>
                <AvInput
                  id="application-community"
                  type="select"
                  className="form-control"
                  name="community"
                  value={(!isNew && applicationEntity.community) || 'BOT'}
                >
                  <option value="BOT">{translate('openiamApp.Community.BOT')}</option>
                  <option value="EMPLOYEE">{translate('openiamApp.Community.EMPLOYEE')}</option>
                  <option value="DEALER">{translate('openiamApp.Community.DEALER')}</option>
                  <option value="SUPPLIER">{translate('openiamApp.Community.SUPPLIER')}</option>
                  <option value="CUSTOMER">{translate('openiamApp.Community.CUSTOMER')}</option>
                  <option value="POOLID">{translate('openiamApp.Community.POOLID')}</option>
                  <option value="PARTNER">{translate('openiamApp.Community.PARTNER')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application" replace color="info">
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
  applicationEntity: storeState.application.entity,
  loading: storeState.application.loading,
  updating: storeState.application.updating,
  updateSuccess: storeState.application.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUpdate);
