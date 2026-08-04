import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "../components/layout/Layout";

import DashboardPage from "../pages/DashboardPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import ArchivedApplicationsPage from "../pages/ArchivedApplicationsPage";
import PipelinesPage from "../pages/PipelinesPage";
import PipelineRunsPage from "../pages/PipelineRunsPage";
import SecurityScansPage from "../pages/SecurityScansPage";
import FindingsPage from "../pages/FindingsPage";
import ReportsPage from "../pages/ReportsPage";
import InfrastructurePage from "../pages/InfrastructurePage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route
            path="/applications"
            element={<ApplicationsPage />}
          />

          <Route
            path="/applications/archived"
            element={<ArchivedApplicationsPage />}
          />

          <Route
            path="/pipelines"
            element={<PipelinesPage />}
          />

          <Route
            path="/pipeline-runs"
            element={<PipelineRunsPage />}
          />

          <Route
            path="/security-scans"
            element={<SecurityScansPage />}
          />

          <Route
            path="/findings"
            element={<FindingsPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/infrastructure"
            element={<InfrastructurePage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}