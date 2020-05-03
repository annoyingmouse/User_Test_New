(async () => {
  const compiled = (await Promise.all(
    [...document.querySelectorAll("link")]
      .filter(l => l.rel === 'stylesheet/scss')
      .map(async l => {
        url = l.href;
        const code = await (await fetch(url)).text();
        const basename = url.substring(url.lastIndexOf("/") + 1);
        Sass.writeFile(basename, code);
        return Sass.compile(`@import "${basename}"; `);
      })
  )).join("\n");
  document.head.innerHTML += `<style>${compiled}</style>`;
  console.log(compiled);
})();