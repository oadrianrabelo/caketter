import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoute>
          <Router />
        </ProtectedRoute>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
