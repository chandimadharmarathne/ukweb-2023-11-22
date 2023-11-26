import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_CHANGED } from "../../constants/event-names";
import * as authService from "../../services/auth-service";
import { Optional } from "../../utils/utils.types";
import { useSnackbar } from "./snackbar.provider";

export const LOCAL_STORAGE_KEY = "@data";

export type Auth = Optional<authService.LoginResponse, null>;

type Utility = {
  update: (data: Auth, override?: boolean) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Auth & Partial<Utility>>({
  name: "",
  token: "",
});

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { addSnack } = useSnackbar();
  const [authData, setAuthData] = useState<Auth>(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
    else return {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener(
      LOCAL_STORAGE_CHANGED,
      (e: CustomEventInit<Auth>) => {
        if (e.detail) setAuthData(e.detail);
      }
    );
  }, []);

  const update: Utility["update"] = (data, override) => {
    if (override) return authService.storeToken(data);
    authService.storeToken({ ...authData, ...data });
  };

  const logout = async () => {
    if (!authData.token) return;
    try {
      const response = await authService.logout(
        authData.id,
        authData.refreshtoken
      );
      if (response.success) {
        addSnack?.({
          message: response.result,
          severity: "success",
        });
      }
      navigate("/");
    } catch (error: any) {
      addSnack?.({
        message: error.message,
        severity: "error",
      });
    } finally {
      update({}, true);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authData, update, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
