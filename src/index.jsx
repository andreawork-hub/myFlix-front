import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Main component (will eventually use all the others)
const MyFlix = () => {
  return (
    <div className="bg-dark text-white" style={{ minHeight: "100vh" }}>
      <Container>
        <MainView />
      </Container>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlix />);
