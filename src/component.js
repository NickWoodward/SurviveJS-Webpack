export default (text = "Hello world") => {
  const element = document.createElement("div");

  element.className = "pure-button"; // pure.css class added
  element.innerHTML = text;

  element.onclick = () => {
    import("./lazy")
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => {
        console.error(err);
      });
  }

  return element;
};