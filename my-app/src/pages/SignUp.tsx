import React from "react";
import { Button, Form, Input, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signup from "../assets/signup.png";
import { SignupUser } from "../apicalls/users.js";

const imp: { required: boolean; message: string }[] = [
  {
    required: true,
    message: "required",
  },
];

const SignUp: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      navigate("/login");
      const response = await SignupUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
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
          src={signup}
          alt="signup-img"
          className="object-contain w-[110px] mb-5 mx-auto"
        />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            rules={imp}
            label="Name :"
            id="name"
            name="name"
            className="font-medium text-text"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={imp}
            label="Email :"
            id="email"
            name="email"
            className="font-medium text-text"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={imp}
            label="Password :"
            id="password"
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
            Sign-up
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium">
                {" "}
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
