import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Form from "react-bootstrap/Form";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useCookies } from "react-cookie";

function ThemeSwitch() {
  const { theme, setTheme } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(["theme"]);

  // Avoid warning 'cannot update a component from inside 
  // the function body of a different component'
  useEffect(() => {
    if (cookies.theme === undefined) {
      setCookie("theme", "light", { path: "/", sameSite: "strict" });
    } else {
      setTheme(cookies.theme);
    }
  }, [cookies.theme, setCookie, setTheme]);

  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setCookie("theme", theme === "light" ? "dark" : "light", {
      path: "/",
      sameSite: "strict",
    });
  };

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            <span style={{ marginLeft: "10px" }}></span>
          </div>
        }
        onChange={handleSwitchChange}
      />
    </Form>
  );
}
export default ThemeSwitch;
