import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationDetail = (props: IApplicationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openiamApp.application.detail.title">Application</Translate> [<b>{applicationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openiamApp.application.name">Name</Translate>
            </span>
          </dt>
          <dd>{applicationEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="openiamApp.application.description">Description</Translate>
            </span>
          </dt>
          <dd>{applicationEntity.description}</dd>
          <dt>
            <span id="community">
              <Translate contentKey="openiamApp.application.community">Community</Translate>
            </span>
          </dt>
          <dd>{applicationEntity.community}</dd>
        </dl>
        <Button tag={Link} to="/application" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application/${applicationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ application }: IRootState) => ({
  applicationEntity: application.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);
