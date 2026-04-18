import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostEditorPage from "./pages/PostEditorPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts/:postId" element={<PostDetailsPage />} />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <PostEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId/edit"
          element={
            <ProtectedRoute>
              <PostEditorPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
