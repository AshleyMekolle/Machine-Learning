export const themes = [
    { name: 'light', value: 'light-theme' },
    { name: 'dark', value: 'dark-theme' }
  ];
  
  // Using find to get a theme
  const selectedTheme = themes.find(theme => theme.name === 'light');
  if (selectedTheme) {
    console.log(selectedTheme.value); // 'light-theme'
  }
  