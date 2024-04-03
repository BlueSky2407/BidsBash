import { App } from "antd";
import React from "react";
import { FetchUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";

interface ProtectedRouteProps {
  children: React.ReactNode; //props which represent the content to be rendered
}

//It wraps the content passed as children and ensures that it is only rendered if the user is authenticated.

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const validateToken = async () => {
    try {
      const response = await FetchUser();
      if (response.success) {
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        navigate("/login");
        message.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        <Navbar name={user.name} />
        {children}
      </div>
    )
  );
};

export default ProtectedRoute;
