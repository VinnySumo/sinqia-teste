import { persistReducer, persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Aqui estava errado
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const configPersist = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(configPersist, rootReducer);

// Aplique o middleware thunk na criação da store
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
