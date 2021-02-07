import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrganizationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrganizationDetail = (props: IOrganizationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { organizationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openiamApp.organization.detail.title">Organization</Translate> [<b>{organizationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openiamApp.organization.name">Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.name}</dd>
          <dt>
            <span id="postcode">
              <Translate contentKey="openiamApp.organization.postcode">Postcode</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.postcode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="openiamApp.organization.city">City</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.city}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="openiamApp.organization.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.streetAddress}</dd>
          <dt>
            <span id="stateProvince">
              <Translate contentKey="openiamApp.organization.stateProvince">State Province</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.stateProvince}</dd>
          <dt>
            <span id="community">
              <Translate contentKey="openiamApp.organization.community">Community</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.community}</dd>
        </dl>
        <Button tag={Link} to="/organization" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization/${organizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ organization }: IRootState) => ({
  organizationEntity: organization.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetail);
