import React, { FC, useEffect, useState } from "react";
import UnderDev from "../components/under-dev";
import { BACKEND_URL } from "../constants/config";
import { LOGGED_ADMIN } from "../constants/keys";
import { Credentials } from "../utils/auth-types";
import { request } from "../utils/Axios";

interface AdminLoginProps {
  children: React.ReactNode;
}

const AdminLogin: FC<AdminLoginProps> = ({ children }) => {
  const [data, setData] = useState(() => {
    const d = localStorage.getItem(LOGGED_ADMIN);
    if (d) return JSON.parse(d);
    else return {};
  });

  useEffect(() => {
    localStorage.setItem(LOGGED_ADMIN, JSON.stringify(data));
  }, [data]);

  const login = async (data: Credentials) => {
    const res = await request<any>({
      url: "/login",
      baseURL: `${BACKEND_URL}/admin`,
      method: "POST",
      data,
    });
    if (res.success) {
      setData(res);
    }
  };

  /* if (!data.token) return <UnderDev login={login} />; */

  return <>{children}</>;
};

export default AdminLogin;
