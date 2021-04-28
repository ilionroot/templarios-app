import React from "react";
import Router from "./router";

import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
