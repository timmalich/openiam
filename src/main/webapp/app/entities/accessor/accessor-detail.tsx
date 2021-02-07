import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './accessor.reducer';
import { IAccessor } from 'app/shared/model/accessor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccessorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccessorDetail = (props: IAccessorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { accessorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openiamApp.accessor.detail.title">Accessor</Translate> [<b>{accessorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="openiamApp.accessor.title">Title</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.title}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="openiamApp.accessor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="openiamApp.accessor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="openiamApp.accessor.email">Email</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="openiamApp.accessor.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.phoneNumber}</dd>
          <dt>
            <span id="community">
              <Translate contentKey="openiamApp.accessor.community">Community</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.community}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="openiamApp.accessor.language">Language</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.language}</dd>
          <dt>
            <span id="blocked">
              <Translate contentKey="openiamApp.accessor.blocked">Blocked</Translate>
            </span>
          </dt>
          <dd>{accessorEntity.blocked ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="openiamApp.accessor.entitlement">Entitlement</Translate>
          </dt>
          <dd>
            {accessorEntity.entitlements
              ? accessorEntity.entitlements.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {accessorEntity.entitlements && i === accessorEntity.entitlements.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="openiamApp.accessor.organization">Organization</Translate>
          </dt>
          <dd>
            {accessorEntity.organizations
              ? accessorEntity.organizations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {accessorEntity.organizations && i === accessorEntity.organizations.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/accessor" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/accessor/${accessorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ accessor }: IRootState) => ({
  accessorEntity: accessor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccessorDetail);
