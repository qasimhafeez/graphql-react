import logo from "./spacex-logo.jfif";

function App() {
  return (
    <div className="App">
      <img
        src={logo}
        alt="SpaceX"
        style={{ width: 300, display: "block", margin: "auto" }}
      />
    </div>
  );
}

export default App;
