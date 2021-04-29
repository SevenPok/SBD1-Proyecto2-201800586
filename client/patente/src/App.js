import Consulta from "./components/Consulta";
import Pais from "./components/Pais";
import Pregunta from "./components/Pregunta";
import Invento from "./components/Invento";
import Respuesta from "./components/Respuesta";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/pais" exact component={Pais} />
        <Route path="/pregunta" exact component={Pregunta} />
        <Route path="/inventos" exact component={Invento} />
        <Route path="/respuestas" exact component={Respuesta} />
        <Route path="/consultas" exact component={Consulta} />
      </Switch>
    </Router>
  );
}

export default App;
