import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEntitlement, defaultValue } from 'app/shared/model/entitlement.model';

export const ACTION_TYPES = {
  SEARCH_ENTITLEMENTS: 'entitlement/SEARCH_ENTITLEMENTS',
  FETCH_ENTITLEMENT_LIST: 'entitlement/FETCH_ENTITLEMENT_LIST',
  FETCH_ENTITLEMENT: 'entitlement/FETCH_ENTITLEMENT',
  CREATE_ENTITLEMENT: 'entitlement/CREATE_ENTITLEMENT',
  UPDATE_ENTITLEMENT: 'entitlement/UPDATE_ENTITLEMENT',
  DELETE_ENTITLEMENT: 'entitlement/DELETE_ENTITLEMENT',
  RESET: 'entitlement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEntitlement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EntitlementState = Readonly<typeof initialState>;

// Reducer

export default (state: EntitlementState = initialState, action): EntitlementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ENTITLEMENTS):
    case REQUEST(ACTION_TYPES.FETCH_ENTITLEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENTITLEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ENTITLEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ENTITLEMENT):
    case REQUEST(ACTION_TYPES.DELETE_ENTITLEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ENTITLEMENTS):
    case FAILURE(ACTION_TYPES.FETCH_ENTITLEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENTITLEMENT):
    case FAILURE(ACTION_TYPES.CREATE_ENTITLEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ENTITLEMENT):
    case FAILURE(ACTION_TYPES.DELETE_ENTITLEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ENTITLEMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_ENTITLEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTITLEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENTITLEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ENTITLEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENTITLEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/entitlements';
const apiSearchUrl = 'api/_search/entitlements';

// Actions

export const getSearchEntities: ICrudSearchAction<IEntitlement> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ENTITLEMENTS,
  payload: axios.get<IEntitlement>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IEntitlement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENTITLEMENT_LIST,
  payload: axios.get<IEntitlement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEntitlement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENTITLEMENT,
    payload: axios.get<IEntitlement>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEntitlement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENTITLEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEntitlement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENTITLEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEntitlement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENTITLEMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
