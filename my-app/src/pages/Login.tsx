import React from "react";
import { Button, Form, Input, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { LoginUser } from "../apicalls/users";

const imp: { required: boolean; message: string }[] = [
  {
    required: true,
    message: "required",
  },
];

const Login: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        localStorage.setItem("token", response.data);
        navigate("/"); //redict the user to home page after logging in
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center flex-col">
      <img
        src={logo}
        alt="bidsbash logo"
        className="object-contain w-[250px] mb-5 mx-auto"
      />
      <div className="bg-white p-5 rounded w-[420px] shadow-lg">
        <img
          src={login}
          alt="login-img"
          className="object-contain w-[80px] mb-5 mx-auto"
        />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            rules={imp}
            label="Email :"
            name="email"
            className="font-medium text-text"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={imp}
            label="Password :"
            name="password"
            className="font-medium text-text"
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="font-medium focus:none"
          >
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium">
                {" "}
                Sign up
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
