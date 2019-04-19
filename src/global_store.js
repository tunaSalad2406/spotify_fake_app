import AuthorizationStore from "./core/store/AuthorizationStore"

export const StoreNames = {
  // Language: 'LanguageStore',
  Authorization: 'AuthorizationStore'
};

export default function rootStoreCreating () {
  return {
    [StoreNames.Authorization] : new AuthorizationStore()
  }
}
