import omit from "lodash.omit";
import * as ActionTypes from "./actionTypes";

function news(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_NEWS:
      return action.news;
    default:
      return state;
  }
}

function isUpdateAvailable(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_IS_UPDATE_AVAILABLE:
      return action.isUpdateAvailable;
    default:
      return state;
  }
}

function javaDownloadStatus(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_JAVA_DOWNLOAD:
      return action.status;
    default:
      return state;
  }
}

function downloadQueue(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_DOWNLOAD_TO_QUEUE:
      return {
        ...state,
        [action.instanceName]: {
          percentage: 0,
          mcVersion: action.mcVersion,
          modloader: action.modloader,
          addonID: action.addonID
        }
      };
    case ActionTypes.REMOVE_DOWNLOAD_FROM_QUEUE:
      return omit(state, action.instanceName);
    case ActionTypes.UPDATE_DOWNLOAD_PROGRESS:
      return {
        ...state,
        [action.instanceName]: {
          ...state[action.instanceName],
          percentage: action.percentage
        }
      };
    default:
      return state;
  }
}

function currentDownload(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_DOWNLOAD:
      return action.instanceName;
    default:
      return state;
  }
}

function instances(state = { started: false, list: [] }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_INSTANCES:
      return { ...state, list: action.instances };
    case ActionTypes.UPDATE_INSTANCES_STARTED:
      return { ...state, started: action.started };
    default:
      return state;
  }
}

function startedInstances(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_STARTED_INSTANCE:
      return [...state, { instanceName: action.instanceName, pid: action.pid }];
    case ActionTypes.REMOVE_STARTED_INSTANCE:
      return state.filter(
        instance => instance.instanceName !== action.instanceName
      );
    default:
      return state;
  }
}

function selectedInstance(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_INSTANCE:
      return action.instanceName;
    default:
      return state;
  }
}

function modpacks(
  state = { list: [], filter: "Featured", search: "" },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_MODPACKS:
      return {
        ...state,
        list: [...state.list, action.modpacks]
      };
    case ActionTypes.UPDATE_MODPACKS_FILTER:
      return {
        ...state,
        filter: action.filter,
        list: []
      };
    case ActionTypes.UPDATE_MODPACKS_SEARCH:
      return {
        ...state,
        search: action.search,
        list: []
      };
    default:
      return state;
  }
}

export default {
  news,
  isUpdateAvailable,
  downloadQueue,
  currentDownload,
  javaDownloadStatus,
  instances,
  startedInstances,
  selectedInstance,
  modpacks
};