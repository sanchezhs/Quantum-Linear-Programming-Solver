import { useContext } from 'react'
import { FormContext } from '../context/AppContext'
import Form from "react-bootstrap/Form";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeSwitch() {
    const { theme, setTheme } = useContext(FormContext);
    const handleSwitchChange = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
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
