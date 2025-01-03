import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Applications from './pages/Applications'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        {/* Redirect "/" to "/dashboard" if companyToken is present */}
        <Route
          path="/"
          element={companyToken ? <Navigate to="/dashboard/manage-jobs" replace /> : <Home />}
        />

        {/* Top-level routes */}
        <Route path="/applications" element={<Applications />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />

        {/* Conditional dashboard routes */}
        {companyToken && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplication />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App
