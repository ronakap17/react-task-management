import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import SignIn from "~/pages/Auth/SignIn";
import SignUp from "~/pages/Auth/SignUp";

const AppRouter: React.FC = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      children: [
        {
          index: true,
          element: <h2>Home</h2>,
        },
      ],
      // lazy: async () => {
      //   const { LandingRoute } = await import('./landing');
      //   return { Component: LandingRoute };
      // },
    },
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRouter;
