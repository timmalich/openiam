import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccessor, defaultValue } from 'app/shared/model/accessor.model';

export const ACTION_TYPES = {
  SEARCH_ACCESSORS: 'accessor/SEARCH_ACCESSORS',
  FETCH_ACCESSOR_LIST: 'accessor/FETCH_ACCESSOR_LIST',
  FETCH_ACCESSOR: 'accessor/FETCH_ACCESSOR',
  CREATE_ACCESSOR: 'accessor/CREATE_ACCESSOR',
  UPDATE_ACCESSOR: 'accessor/UPDATE_ACCESSOR',
  DELETE_ACCESSOR: 'accessor/DELETE_ACCESSOR',
  RESET: 'accessor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccessor>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AccessorState = Readonly<typeof initialState>;

// Reducer

export default (state: AccessorState = initialState, action): AccessorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ACCESSORS):
    case REQUEST(ACTION_TYPES.FETCH_ACCESSOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCESSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCESSOR):
    case REQUEST(ACTION_TYPES.UPDATE_ACCESSOR):
    case REQUEST(ACTION_TYPES.DELETE_ACCESSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ACCESSORS):
    case FAILURE(ACTION_TYPES.FETCH_ACCESSOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCESSOR):
    case FAILURE(ACTION_TYPES.CREATE_ACCESSOR):
    case FAILURE(ACTION_TYPES.UPDATE_ACCESSOR):
    case FAILURE(ACTION_TYPES.DELETE_ACCESSOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ACCESSORS):
    case SUCCESS(ACTION_TYPES.FETCH_ACCESSOR_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_ACCESSOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCESSOR):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCESSOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCESSOR):
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

const apiUrl = 'api/accessors';
const apiSearchUrl = 'api/_search/accessors';

// Actions

export const getSearchEntities: ICrudSearchAction<IAccessor> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ACCESSORS,
  payload: axios.get<IAccessor>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IAccessor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ACCESSOR_LIST,
    payload: axios.get<IAccessor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAccessor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCESSOR,
    payload: axios.get<IAccessor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAccessor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCESSOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IAccessor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCESSOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccessor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCESSOR,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
