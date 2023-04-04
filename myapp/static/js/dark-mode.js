const lightSwitch = document.querySelector('#lightSwitch');
if (lightSwitch) {
  lightSwitch.addEventListener('change', () => {
    let theme = document.documentElement.getAttribute('data-bs-theme');
    if (theme === 'dark')
      document.documentElement.setAttribute('data-bs-theme', 'light');
    else
      document.documentElement.setAttribute('data-bs-theme', 'dark');
  })
}