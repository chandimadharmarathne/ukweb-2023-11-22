import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CircularProgress, CssBaseline } from "@mui/material";

// routes
import RouteList from "./routes/route-list";
import RouteElement from "./routes/route-element";
import AdminLogin from "./routes/admin";
import CookieWarn from "./components/warnings/cookie";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.body.scrollIntoView();
  }, [location.pathname, location.search]);

  return (
    <AdminLogin>
      <CssBaseline />
      <CookieWarn />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            {RouteList.map((item) => (
              <Route
                {...item.props}
                key={item.path}
                path={item.path}
                element={
                  <RouteElement element={item.element} layout={item.layout} />
                }
              >
                {item.innerRoutes &&
                  item.innerRoutes.map((innerItem) => (
                    <Route
                      path={innerItem.path}
                      element={innerItem.element}
                      {...item.props}
                      key={item.path}
                    />
                  ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </LocalizationProvider>
    </AdminLogin>
  );
}

export default App;
