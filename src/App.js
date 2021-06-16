import './App.css';

import { Provider } from 'react-redux'
// import store from './configs/redux/store'
import Route from './configs/Router/MainRoute'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configs/ReduxPersist/configureStore";


function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
}

export default App;