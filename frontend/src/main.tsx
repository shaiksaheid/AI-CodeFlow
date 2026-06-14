import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(
  document.getElementById("root")!
).render(
  <GoogleOAuthProvider
    clientId="154310094299-08iks56oljv0idep4dbgla9btb7g6hlv.apps.googleusercontent.com"
  >
    <App />
  </GoogleOAuthProvider>
);