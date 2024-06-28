import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import SignIn, { action as singInAction} from "~/pages/Auth/SignIn";
import SignUp, { action as singUpAction} from "~/pages/Auth/SignUp";
import ErrorMessage from "~/components/ErrorMessage";
import { useAppSelector } from "~/store";
import {isUserAuthenticated} from "~/pages/Auth/slice";
import Dashboard from "~/pages/Dashboard";
import Users from "~/pages/Users";

const AppRouter: React.FC = () => {
  const isUserLoggedIn = useAppSelector(state => isUserAuthenticated(state));
  const routes = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <MainLayout /> : <Navigate to="/auth/sign-in" />,
      errorElement: <ErrorMessage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />,
        },
      ],
      // lazy: async () => {
      //   const { LandingRoute } = await import('./landing');
      //   return { Component: LandingRoute };
      // },
    },
    {
      path: "/auth",
      element: !isUserLoggedIn ? <AuthLayout /> : <Navigate to="/" />,
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
          action: singUpAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRouter;
