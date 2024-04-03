import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  WalletOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: (
      <Space className={styles["link2"]}>
        <WalletOutlined />
        My Wallet
      </Space>
    ),
    key: "0",
  },
  {
    label: (
      <Space className={styles["link2"]}>
        <MessageOutlined />
        Chat
      </Space>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <div
        className={styles["link2"]}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        <Space>
          Logout
          <LogoutOutlined />
        </Space>
      </div>
    ),
    key: "2",
  },
];

interface NavbarProps {
  name: string;
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="auction-logo" className={styles["logo"]} />
      </Link>

      <div className={styles["links-container"]}>
        <Link to="/sales" className={styles["link"]}>
          My Sales
        </Link>
        <Link to="/bids" className={styles["link"]}>
          My Bids
        </Link>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()} className={styles["link"]}>
            <Space>
              <UserOutlined />
              {name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
