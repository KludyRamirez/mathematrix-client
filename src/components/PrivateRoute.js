import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const PrivateRoute = ({ children, roleRequired, restricted }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <Loading color="#007bff" loading={loading} />;
  }

  if (restricted && user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!restricted && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleRequired && (!user || user.role !== roleRequired)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
