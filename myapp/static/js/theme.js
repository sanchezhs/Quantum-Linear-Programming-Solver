function ThemeSwith() {
/*   window.onload = function (event) { 
    console.log('holaa');
  }


  function getLocalTheme() {
    return localStorage.getItem('theme');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);


  }

  let localTheme = getLocalTheme();
  const lightSwitch = document.querySelector('#lightSwitch');
  const btnAbout = document.querySelector('#id-about');

  if (localTheme) {
    if (localTheme === 'dark') {
      lightSwitch.setAttribute('checked', true);
    } else {
      lightSwitch.setAttribute('checked', false);
    }
    setTheme(localTheme);
  }
 */
/*   btnAbout.addEventListener('click', function(event) {
    const h1 = document.getElementById('test');
    console.log(h1);
    let theme = getLocalTheme();
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      lightSwitch.setAttribute('checked', false);
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      lightSwitch.setAttribute('checked', true);

    }
  }); */
  
  const lightSwitch = document.querySelector('#lightSwitch');
  if (lightSwitch) {
    
    lightSwitch.addEventListener('change', () => {
      const dz = document.getElementById('drop-zone');
      const navbar = document.getElementById('navbar');
      let theme = document.documentElement.getAttribute('data-bs-theme');
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
      localStorage.setItem('theme', document.documentElement.getAttribute('data-bs-theme'));
    })

}


}


document.addEventListener('DOMContentLoaded', ThemeSwith());