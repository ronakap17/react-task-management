import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import SignIn, { action as singInAction} from "~/pages/Auth/SignIn";
import SignUp from "~/pages/Auth/SignUp";
import ErrorMessage from "~/components/ErrorMessage";

const AppRouter: React.FC = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      errorElement: <ErrorMessage />,
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
      errorElement: <ErrorMessage />,
      children: [
        {
          path: 'sign-in',
          element: <SignIn />,
          action: singInAction,
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
