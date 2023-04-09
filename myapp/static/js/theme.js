function ThemeSwith() {

  const lightSwitch = document.querySelector('#lightSwitch');
  if (lightSwitch) {
    lightSwitch.addEventListener('change', () => {
      let theme = document.documentElement.getAttribute('data-bs-theme');
      changeTheme(theme);
      localStorage.setItem('theme', document.documentElement.getAttribute('data-bs-theme'));
    })
  }

  function getLocalTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  }

  const currentTheme = getLocalTheme();
  if (currentTheme) {
    const dz = document.getElementById('drop-zone');
    const navbar = document.getElementById('navbar');
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      lightSwitch.setAttribute('checked', false);
      navbar.classList.add('bg-primary');
      if (dz){
        dz.classList.remove("dz-dark");
        dz.classList.add('dz');
      }
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      lightSwitch.setAttribute('checked', true);
      navbar.classList.remove('bg-primary');
      if (dz) {
        dz.classList.remove("dz");
        dz.classList.add('dz-dark');
      }
    }
  }  

  function changeTheme(theme) {
    const dz = document.getElementById('drop-zone');
    const navbar = document.getElementById('navbar');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      lightSwitch.setAttribute('checked', false);
      navbar.classList.add('bg-primary');
      if (dz){
        dz.classList.remove("dz-dark");
        dz.classList.add('dz');
      }
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      lightSwitch.setAttribute('checked', true);
      navbar.classList.remove('bg-primary');
      if (dz) {
        dz.classList.remove("dz");
        dz.classList.add('dz-dark');
      }
    }
  }
  

  
}


document.addEventListener('DOMContentLoaded', ThemeSwith);