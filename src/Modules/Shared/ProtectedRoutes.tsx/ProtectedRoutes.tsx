import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function ProtectedRoutes({
  children,
  allowedGroups,
}: {
  children: ReactNode;
  allowedGroups?: string[];
}) {
  const { loginData, isAuthLoading } = useContext(AuthContext);


  if (!isAuthLoading) {
    if (
      localStorage.getItem("token") &&
      allowedGroups?.includes(loginData?.userGroup)
    ) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}