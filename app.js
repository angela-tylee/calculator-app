console.log('helloooo');

// load current theme
const currentTheme = localStorage.getItem('theme');
// body.classList.add(``)

const themeToggle = document.querySelectorAll('#theme');
const theme = document.querySelector('input[name="theme"]');

console.log(themeToggle);
console.log(theme);

themeToggle.forEach((toggle)=> {
  toggle.addEventListener('click', () => {
    console.log('toggled!')
    if (theme === '1') {
      console.log('chose theme-1!')
      theme.
      document.body.classList.remove();
      document.body.classList.add('theme-1');
      localStorage.setItem('theme', '1');
    } else if (theme === '2') {
      console.log('chose theme-2!')
      document.body.classList.remove();
      document.body.classList.add('theme-2');
      localStorage.setItem('theme', '2');
    } else if (theme === '3') {
      console.log('chose theme-3!')
      document.body.classList.remove();
      document.body.classList.add('theme-3');
      localStorage.setItem('theme', '3');
    }
  })
})
