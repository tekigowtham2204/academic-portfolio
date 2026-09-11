import { Routes, Route, Navigate } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import { ProjectPage } from "./pages/projects/ProjectPages";
import SyncgazeExperience from "./pages/experience/SyncgazeExperience";
import EducationPage from "./pages/EducationPage";
import ResumePage from "./pages/ResumePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/experience/syncgaze" element={<SyncgazeExperience />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}