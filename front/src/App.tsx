import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/protectedRoute";
import LayoutWrapper from "./components/LayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <LayoutWrapper>
            {/* <ProtectedRoute> */}
            <Router />
            {/* </ProtectedRoute> */}
          </LayoutWrapper>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
