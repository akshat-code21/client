import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import DashBoard from "./pages/DashBoard";
import ProposalsListPage from "./pages/Proposals/ProposalsListPage";
import ProposalPage from "./pages/Proposals/ProposalPage";
import ProjectListPage from "./pages/Projects/ProjectsListPage";
import Profile from "./pages/Profile";
import NewProjectPage from "./pages/Projects/NewProjectPage";
import LoginPage from "./pages/Auth/LoginPage";
import AdminLoginPage from "./pages/Auth/AdminLoginPage"
import SignupPage from "./pages/Auth/SignupPage";
import AuthLayout from "./pages/Auth/AuthLayout";
import OverviewPage from "./pages/OverviewPage";
import ProposalDashBoard from "./pages/Proposals/ProposalDashboard";
import ProposalDetails from "./pages/Proposals/NewProposal/ProposalDetails";
import ProposalProfile from "./pages/Proposals/NewProposal/ProposalProfile";
import ProposalReview from "./pages/Proposals/NewProposal/ProposalReview";
import NewProposalPage from "./pages/Proposals/NewProposal/NewProposalPage";
import { Toaster } from "./components/ui/toaster";
import ProjectPageWithoutDashboard from "./pages/Projects/ProjectPageWithoutDashboard";
import AdminSignupPage from "./pages/Auth/AdminSignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path : "/auth/admin",
    element : <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <AdminLoginPage />,
      },
      {
        path: "signup",
        element: <AdminSignupPage />,
      },
    ],
  },
  {
    path: "projects",
    element: <ProjectPageWithoutDashboard />,
    children: [
      { path: ":id", element: <ProjectPage /> },
      { path: "all", element: <ProjectListPage /> },
    ],
  },
  {
    path:"admin/dashboard",
    element : <DashBoard />,
    children : [
      {path : "projects",element : <ProjectListPage />},
      {path : "projects/new",element : <NewProjectPage/>},
      {path : "proposals",element : <ProposalsListPage/>},
      {path : "projects/:id",element : <ProjectPage/>},
      {path : "proposals/:id",element : <></>},
      {path : "overview",element : <OverviewPage /> },
      {path : "profile",element : <Profile></Profile>}
    ]
  },
  {
    path: "dashboard",
    element: <DashBoard />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <OverviewPage /> },
      { path: "overview", element: <OverviewPage /> },
      { path: "projects/:id", element: <ProjectPage /> },
      {
        path: "projects",
        element: <ProjectListPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "projects/new",
        element: <NewProjectPage />,
      },
      {
        path: "proposals",
        element: <ProposalsListPage />,
        errorElement: <NotFoundPage />,
      },
      // {
      //   path: "proposals/:id",
      //   element: <ProposalPage />,
      //   errorElement: <NotFoundPage />,
      // },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: "new-proposal",
    element: <ProposalDashBoard />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <NewProposalPage />,
      },
      {
        path: "/new-proposal/:id/new",
        element: <ProposalDetails />,
      },
      {
        path: "/new-proposal/profile",
        element: <ProposalProfile />,
      },
      {
        path: "/new-proposal/review",
        element: <ProposalReview />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
