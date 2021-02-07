import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEntitlement } from 'app/shared/model/entitlement.model';
import { getEntities as getEntitlements } from 'app/entities/entitlement/entitlement.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { getEntities as getOrganizations } from 'app/entities/organization/organization.reducer';
import { getEntity, updateEntity, createEntity, reset } from './accessor.reducer';
import { IAccessor } from 'app/shared/model/accessor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAccessorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccessorUpdate = (props: IAccessorUpdateProps) => {
  const [idsentitlement, setIdsentitlement] = useState([]);
  const [idsorganization, setIdsorganization] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { accessorEntity, entitlements, organizations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/accessor');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getEntitlements();
    props.getOrganizations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...accessorEntity,
        ...values,
        entitlements: mapIdList(values.entitlements),
        organizations: mapIdList(values.organizations),
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
          <h2 id="openiamApp.accessor.home.createOrEditLabel">
            <Translate contentKey="openiamApp.accessor.home.createOrEditLabel">Create or edit a Accessor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : accessorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="accessor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="accessor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="accessor-title">
                  <Translate contentKey="openiamApp.accessor.title">Title</Translate>
                </Label>
                <AvField id="accessor-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="accessor-firstName">
                  <Translate contentKey="openiamApp.accessor.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="accessor-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="accessor-lastName">
                  <Translate contentKey="openiamApp.accessor.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="accessor-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="accessor-email">
                  <Translate contentKey="openiamApp.accessor.email">Email</Translate>
                </Label>
                <AvField
                  id="accessor-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="accessor-phoneNumber">
                  <Translate contentKey="openiamApp.accessor.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="accessor-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="communityLabel" for="accessor-community">
                  <Translate contentKey="openiamApp.accessor.community">Community</Translate>
                </Label>
                <AvInput
                  id="accessor-community"
                  type="select"
                  className="form-control"
                  name="community"
                  value={(!isNew && accessorEntity.community) || 'BOT'}
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
              <AvGroup>
                <Label id="languageLabel" for="accessor-language">
                  <Translate contentKey="openiamApp.accessor.language">Language</Translate>
                </Label>
                <AvInput
                  id="accessor-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && accessorEntity.language) || 'FR'}
                >
                  <option value="FR">{translate('openiamApp.Language.FR')}</option>
                  <option value="EN">{translate('openiamApp.Language.EN')}</option>
                  <option value="SP">{translate('openiamApp.Language.SP')}</option>
                  <option value="DE">{translate('openiamApp.Language.DE')}</option>
                  <option value="ZH">{translate('openiamApp.Language.ZH')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="blockedLabel">
                  <AvInput id="accessor-blocked" type="checkbox" className="form-check-input" name="blocked" />
                  <Translate contentKey="openiamApp.accessor.blocked">Blocked</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="accessor-entitlement">
                  <Translate contentKey="openiamApp.accessor.entitlement">Entitlement</Translate>
                </Label>
                <AvInput
                  id="accessor-entitlement"
                  type="select"
                  multiple
                  className="form-control"
                  name="entitlements"
                  value={accessorEntity.entitlements && accessorEntity.entitlements.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {entitlements
                    ? entitlements.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="accessor-organization">
                  <Translate contentKey="openiamApp.accessor.organization">Organization</Translate>
                </Label>
                <AvInput
                  id="accessor-organization"
                  type="select"
                  multiple
                  className="form-control"
                  name="organizations"
                  value={accessorEntity.organizations && accessorEntity.organizations.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {organizations
                    ? organizations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/accessor" replace color="info">
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
  entitlements: storeState.entitlement.entities,
  organizations: storeState.organization.entities,
  accessorEntity: storeState.accessor.entity,
  loading: storeState.accessor.loading,
  updating: storeState.accessor.updating,
  updateSuccess: storeState.accessor.updateSuccess,
});

const mapDispatchToProps = {
  getEntitlements,
  getOrganizations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccessorUpdate);
