import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Col } from "react-bootstrap";
import TableScrollbar from "react-table-scrollbar";
import axios from "../services/axios";

function Pregunta() {
  const [data, setData] = useState([]);
  const [modalShowCreate, setModalShowCreate] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [smShowDelete, setSmShowDelete] = useState(false);
  const [modalShowModify, setModalShowModify] = useState(false);
  const [Pregunta, setPregunta] = useState({
    id: 0,
    pregunta: "",
    idEncuesta: 0,
  });

  const reset = () => {
    setPregunta({
      id: 0,
      pregunta: "",
      idEncuesta: 0,
    });
    setModalShowCreate(true);
  };

  const setId = (id) => {
    setPregunta({
      id: id,
      pregunta: "",
      idEncuesta: 0,
    });
    setSmShowDelete(true);
  };

  const setDatos = (valor) => {
    setPregunta({
      id: valor.id,
      pregunta: valor.pregunta,
      idEncuesta: valor.id_encuesta,
    });
    setModalShowModify(true);
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    if (Pregunta.pregunta !== "" && Pregunta.idEncuesta > 0) {
      create();
      setModalShowCreate(false);
    } else {
      setModalShowCreate(false);
      setSmShow(true);
    }
  };

  const modificarDatos = (event) => {
    event.preventDefault();
    if (Pregunta.pregunta !== "" && Pregunta.idEncuesta > 0) {
      modify();
      setModalShowModify(false);
    } else {
      setModalShowModify(false);
      setSmShow(true);
    }
  };

  const handleInputChange = (event) => {
    setPregunta({
      ...Pregunta,
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

  async function create() {
    const request = await axios.post("/Pregunta/create", Pregunta);
    if (request.data !== undefined) {
      fetchData("/Pregunta/read");
    }
    return request;
  }

  async function modify() {
    const request = await axios.put("/Pregunta/update", Pregunta);
    if (request.data !== undefined) {
      fetchData("/Pregunta/read");
    }
    return request;
  }

  async function borrar() {
    const request = await axios.delete(`/Pregunta/delete/${Pregunta.id}`);
    if (request.data !== undefined) {
      fetchData("/Pregunta/read");
    }
    setSmShowDelete(false);
    return request;
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData("/Pregunta/read");
    }
  });

  return (
    <div>
      <Container>
        <br />
        <Button variant="success" onClick={() => reset()}>
          Crear Pregunta
        </Button>
        <br />
        <br />

        <TableScrollbar rows={13}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Pregunta</th>
                <th>Id Pregunta</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.pregunta}</td>
                  <td>{element.id_encuesta}</td>
                  <td>
                    <center>
                      <Button
                        variant="primary"
                        onClick={() => setDatos(element)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => setId(element.id)}
                      >
                        Delete
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
        show={modalShowCreate}
        onHide={() => setModalShowCreate(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enviarDatos}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pregunta</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Ingrese pregunta"
                    name="pregunta"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Id Encuesta</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese poblacion"
                    name="idEncuesta"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <center>
                  <Button variant="primary" type="sumnit" size="lg">
                    crear
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => setModalShowCreate(false)}
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
        show={modalShowModify}
        onHide={() => setModalShowModify(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modificar Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modificarDatos}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pregunta</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Ingrese pregunta"
                    name="pregunta"
                    onChange={handleInputChange}
                    value={Pregunta.pregunta}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Id Encuesta</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese poblacion"
                    name="idEncuesta"
                    onChange={handleInputChange}
                    value={Pregunta.idEncuesta}
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
            Error al crear Pregunta
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
            Error al crear Pregunta
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
        show={smShowDelete}
        onHide={() => setSmShowDelete(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de eliminar</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => borrar()}>
            delete
          </Button>
          <Button variant="secundary" onClick={() => setSmShowDelete(false)}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pregunta;
