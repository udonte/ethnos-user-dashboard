import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
