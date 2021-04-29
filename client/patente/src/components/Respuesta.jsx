import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Col } from "react-bootstrap";
import TableScrollbar from "react-table-scrollbar";
import axios from "../services/axios";

function Respuesta() {
  const [data, setData] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [modalShowModify, setModalShowModify] = useState(false);
  const [Respuesta, setRespuesta] = useState({
    id: 0,
    idRespuesta: 0,
    idPregunta: 0,
  });

  const setDatos = (valor) => {
    setRespuesta({
      id: valor.id,
      idRespuesta: valor.id_respuesta,
      idPregunta: valor.id_pregunta,
    });
    setModalShowModify(true);
  };

  const modificarDatos = (event) => {
    event.preventDefault();
    if (Respuesta.idRespuesta > 0 && Respuesta.idPregunta > 0) {
      modify();
      setModalShowModify(false);
    } else {
      setModalShowModify(false);
      setSmShow(true);
    }
  };

  const handleInputChange = (event) => {
    setRespuesta({
      ...Respuesta,
      [event.target.name]: event.target.value,
    });
  };

  async function fetchData(nombre) {
    const request = await axios.get(nombre);
    if (request.data.response !== undefined) {
      setData(request.data.response);
    }
    return request;
  }

  async function modify() {
    const request = await axios.put("/Respuesta/update", Respuesta);
    if (request.data !== undefined) {
      fetchData("/Respuesta/read");
    }
    return request;
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData("/Respuesta/read");
    }
  });

  return (
    <div>
      <Container>
        <br />

        <TableScrollbar rows={13}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Id Respuesta</th>
                <th>Id Pregunta</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.id_respuesta}</td>
                  <td>{element.id_pregunta}</td>
                  <td>
                    <center>
                      <Button
                        variant="primary"
                        onClick={() => setDatos(element)}
                      >
                        Update
                      </Button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScrollbar>
      </Container>

      <Modal
        show={modalShowModify}
        onHide={() => setModalShowModify(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modificar Respuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modificarDatos}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Id Respuesta</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese id respuesta"
                    name="idRespuesta"
                    onChange={handleInputChange}
                    value={Respuesta.idRespuesta}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Id Pregunta</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese año"
                    name="idPregunta"
                    onChange={handleInputChange}
                    value={Respuesta.idPregunta}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <center>
                  <Button variant="primary" type="sumnit" size="lg">
                    Modificar
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => setModalShowModify(false)}
                    size="lg"
                  >
                    Close
                  </Button>
                </center>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error al crear Respuesta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Debe de ingresar todos los campos.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setSmShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error al crear Respuesta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Debe de ingresar todos los campos.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setSmShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Respuesta;
