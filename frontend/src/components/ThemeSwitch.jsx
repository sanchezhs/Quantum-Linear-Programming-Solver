import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Form from "react-bootstrap/Form";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeSwitch() {
    const { theme, setTheme } = useContext(AppContext);
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
      setTheme(preferredTheme);
    }

    const handleSwitchChange = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    }

    return (
      <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
              <span style={{ marginLeft: '10px' }}>
              </span>
            </div>
          }
          onChange={handleSwitchChange}
        />
      </Form>
    );
  }
export default ThemeSwitch;
