import { Routes, Route } from "react-router-dom";
import { VideoLandingPage } from "../pages/VideoLandingPage.jsx";
import { ViewerPage } from "../pages/ViewerPage.jsx";
import { ContentPage } from "../pages/ContentPage.jsx";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<VideoLandingPage />} />
      <Route path="/watch/:id" element={<ViewerPage />} />
      <Route path="/content/:id" element={<ContentPage />} />
    </Routes>
  );
}
