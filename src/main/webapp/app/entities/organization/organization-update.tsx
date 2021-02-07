import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAccessor } from 'app/shared/model/accessor.model';
import { getEntities as getAccessors } from 'app/entities/accessor/accessor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrganizationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrganizationUpdate = (props: IOrganizationUpdateProps) => {
  const [accessorId, setAccessorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { organizationEntity, accessors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/organization');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...organizationEntity,
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
          <h2 id="openiamApp.organization.home.createOrEditLabel">
            <Translate contentKey="openiamApp.organization.home.createOrEditLabel">Create or edit a Organization</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : organizationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="organization-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="organization-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="organization-name">
                  <Translate contentKey="openiamApp.organization.name">Name</Translate>
                </Label>
                <AvField
                  id="organization-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="postcodeLabel" for="organization-postcode">
                  <Translate contentKey="openiamApp.organization.postcode">Postcode</Translate>
                </Label>
                <AvField id="organization-postcode" type="text" name="postcode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="organization-city">
                  <Translate contentKey="openiamApp.organization.city">City</Translate>
                </Label>
                <AvField id="organization-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="streetAddressLabel" for="organization-streetAddress">
                  <Translate contentKey="openiamApp.organization.streetAddress">Street Address</Translate>
                </Label>
                <AvField id="organization-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="organization-stateProvince">
                  <Translate contentKey="openiamApp.organization.stateProvince">State Province</Translate>
                </Label>
                <AvField id="organization-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="communityLabel" for="organization-community">
                  <Translate contentKey="openiamApp.organization.community">Community</Translate>
                </Label>
                <AvInput
                  id="organization-community"
                  type="select"
                  className="form-control"
                  name="community"
                  value={(!isNew && organizationEntity.community) || 'BOT'}
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
              <Button tag={Link} id="cancel-save" to="/organization" replace color="info">
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
  accessors: storeState.accessor.entities,
  organizationEntity: storeState.organization.entity,
  loading: storeState.organization.loading,
  updating: storeState.organization.updating,
  updateSuccess: storeState.organization.updateSuccess,
});

const mapDispatchToProps = {
  getAccessors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationUpdate);
