import React, { useEffect, useState } from "react";
import Tabla from "./Tabla";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "../services/axios";

const headers = {
  1: ["Nombre", "No. Inventos"],
  2: ["Pais", "Region", "No. Respuesta"],
  3: ["Pais", "Area"],
  4: ["Jefe", "Trabajador"],
  5: ["Nombre", "Area", "Salario", "Promedio"],
  6: ["Pais", "Aciertos"],
  7: ["Profesional", "Invento", "Area"],
  8: ["Letra", "Suma Area"],
  9: ["Letra Inventor", "Inventor", "Invento"],
  10: ["Letra Inventor", "Inventor", "Ultima Letra", "Año"],
  11: ["Nombre", "Area", "No. Paises"],
  12: ["Letras", "Invento"],
  13: ["Nombre", "Salario", "Comision", "Total"],
  14: ["Id", "Nombre", "Pregunta", "No. Pais"],
  15: ["Nombre", "Poblacion"],
  16: ["id", "Profesiona", "Area"],
  17: ["Nombre", "Año"],
  18: ["Pais", "Poblacion"],
  19: ["Pais", "Vecino"],
  20: ["Nombre", "Salario", "Comision"],
};

function Consulta() {
  const [consulta, setConsulta] = useState(1);
  const [data, setData] = useState([]);

  const consultar = (e) => {
    switch (e.target.value) {
      case "1":
        fetchData("/consults/consulta1");
        setConsulta(1);
        break;
      case "2":
        fetchData("/consults/consulta2");
        setConsulta(2);
        break;
      case "3":
        fetchData("/consults/consulta3");
        setConsulta(3);
        break;
      case "4":
        fetchData("/consults/consulta4");
        setConsulta(4);
        break;
      case "5":
        fetchData("/consults/consulta5");
        setConsulta(5);
        break;
      case "6":
        fetchData("/consults/consulta6");
        setConsulta(6);
        break;
      case "7":
        fetchData("/consults/consulta7");
        setConsulta(7);
        break;
      case "8":
        fetchData("/consults/consulta8");
        setConsulta(8);
        break;
      case "9":
        fetchData("/consults/consulta9");
        setConsulta(9);
        break;
      case "10":
        fetchData("/consults/consulta10");
        setConsulta(10);
        break;
      case "11":
        fetchData("/consults/consulta11");
        setConsulta(11);
        break;
      case "12":
        fetchData("/consults/consulta12");
        setConsulta(12);
        break;
      case "13":
        fetchData("/consults/consulta13");
        setConsulta(13);
        break;
      case "14":
        fetchData("/consults/consulta14");
        setConsulta(14);
        break;
      case "15":
        fetchData("/consults/consulta15");
        setConsulta(15);
        break;
      case "16":
        fetchData("/consults/consulta16");
        setConsulta(16);
        break;
      case "17":
        fetchData("/consults/consulta17");
        setConsulta(17);
        break;
      case "18":
        fetchData("/consults/consulta18");
        setConsulta(18);

        break;
      case "19":
        fetchData("/consults/consulta19");
        setConsulta(19);

        break;
      case "20":
        fetchData("/consults/consulta20");
        setConsulta(20);

        break;
      default:
        console.log("No funciono");
        break;
    }
  };

  async function fetchData(nombre) {
    const request = await axios.get(nombre);
    if (request.data.response === undefined) {
    } else {
      setData(request.data.response);
    }
    return request;
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData("/consults/consulta1");
    }
  });

  return (
    <div>
      <br></br>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Control as="select" onChange={consultar}>
                <option value={1}>Consulta 1</option>
                <option value={2}>Consulta 2</option>
                <option value={3}>Consulta 3</option>
                <option value={4}>Consulta 4</option>
                <option value={5}>Consulta 5</option>
                <option value={6}>Consulta 6</option>
                <option value={7}>Consulta 7</option>
                <option value={8}>Consulta 8</option>
                <option value={9}>Consulta 9</option>
                <option value={10}>Consulta 10</option>
                <option value={11}>Consulta 11</option>
                <option value={12}>Consulta 12</option>
                <option value={13}>Consulta 13</option>
                <option value={14}>Consulta 14</option>
                <option value={15}>Consulta 15</option>
                <option value={16}>Consulta 16</option>
                <option value={17}>Consulta 17</option>
                <option value={18}>Consulta 18</option>
                <option value={19}>Consulta 19</option>
                <option value={20}>Consulta 20</option>
              </Form.Control>
            </Col>
          </Row>
        </Form>
      </Container>
      <br></br>
      <Container>
        <Tabla headers={headers[consulta]} data={data} />
      </Container>
    </div>
  );
}

export default Consulta;
