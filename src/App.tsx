import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardOverview } from "./pages/dashboard/DashboardOverview";

import { ArtisanList } from "./pages/artisans/ArtisanList";
import { EditArtisan } from "./pages/artisans/EditArtisan";
import SettingsPage from "./pages/settings/SettingsPage";
import HomepageEditor from "./pages/discovery/HomepageEditor";

import "./index.css";

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div>
    <h1 className="font-serif text-3xl font-bold text-text-primary">{title}</h1>
    <p className="text-text-secondary mt-1">
      This module is currently under development.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/home-config" element={<HomepageEditor />} />
            <Route path="/artisans" element={<ArtisanList />} />
            <Route path="/artisans/new" element={<EditArtisan />} />
            <Route path="/artisans/edit/:id" element={<EditArtisan />} />
            <Route
              path="/customers"
              element={<Placeholder title="Customer Management" />}
            />
            <Route
              path="/products"
              element={<Placeholder title="Product Management" />}
            />
            <Route
              path="/collections"
              element={<Placeholder title="Collection Management" />}
            />
            <Route
              path="/orders"
              element={<Placeholder title="Order Management" />}
            />
            <Route
              path="/settings"
              element={<SettingsPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
