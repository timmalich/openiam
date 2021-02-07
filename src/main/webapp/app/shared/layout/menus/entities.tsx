import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/organization">
      <Translate contentKey="global.menu.entities.organization" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/accessor">
      <Translate contentKey="global.menu.entities.accessor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application">
      <Translate contentKey="global.menu.entities.application" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entitlement">
      <Translate contentKey="global.menu.entities.entitlement" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
