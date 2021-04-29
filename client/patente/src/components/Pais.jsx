import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Col } from "react-bootstrap";
import TableScrollbar from "react-table-scrollbar";
import axios from "../services/axios";

function Pais() {
  const [data, setData] = useState([]);
  const [modalShowCreate, setModalShowCreate] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [smShowDelete, setSmShowDelete] = useState(false);
  const [modalShowModify, setModalShowModify] = useState(false);
  const [pais, setPais] = useState({
    id: 0,
    nombre: "",
    poblacion: 0,
    area: 0,
    capital: "",
    idRegion: 0,
  });

  const reset = () => {
    setPais({
      id: 0,
      nombre: "",
      poblacion: 0,
      area: 0,
      capital: "",
      idRegion: 0,
    });
    setModalShowCreate(true);
  };

  const setId = (id) => {
    setPais({
      id: id,
      nombre: "",
      poblacion: 0,
      area: 0,
      capital: "",
      idRegion: 0,
    });
    setSmShowDelete(true);
  };

  const setDatos = (valor) => {
    setPais({
      id: valor.id,
      nombre: valor.nombre,
      poblacion: valor.poblacion,
      area: valor.area,
      capital: valor.capital,
      idRegion: valor.id_region,
    });
    setModalShowModify(true);
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    if (
      pais.nombre !== "" &&
      pais.poblacion > 0 &&
      pais.area > 0 &&
      pais.capital !== "" &&
      pais.idRegion > 0
    ) {
      create();
      setModalShowCreate(false);
    } else {
      setModalShowCreate(false);
      setSmShow(true);
    }
  };

  const modificarDatos = (event) => {
    event.preventDefault();
    if (
      pais.nombre !== "" &&
      pais.poblacion > 0 &&
      pais.area > 0 &&
      pais.capital !== "" &&
      pais.idRegion > 0
    ) {
      modify();
      setModalShowModify(false);
    } else {
      setModalShowModify(false);
      setSmShow(true);
    }
  };

  const handleInputChange = (event) => {
    setPais({
      ...pais,
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
    const request = await axios.post("/pais/create", pais);
    if (request.data !== undefined) {
      fetchData("/pais/read");
    }
    return request;
  }

  async function modify() {
    const request = await axios.put("/pais/update", pais);
    if (request.data !== undefined) {
      fetchData("/pais/read");
    }
    return request;
  }

  async function borrar() {
    const request = await axios.delete(`/pais/delete/${pais.id}`);
    if (request.data !== undefined) {
      fetchData("/pais/read");
    }
    setSmShowDelete(false);
    return request;
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData("/pais/read");
    }
  });

  return (
    <div>
      <Container>
        <br />
        <Button variant="success" onClick={() => reset()}>
          Crear Pais
        </Button>
        <br />
        <br />

        <TableScrollbar rows={13}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Poblacion</th>
                <th>Area</th>
                <th>Capital</th>
                <th>Id Region</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.nombre}</td>
                  <td>{element.poblacion}</td>
                  <td>{element.area}</td>
                  <td>{element.capital}</td>
                  <td>{element.id_region}</td>
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
          <Modal.Title>Crear Pais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enviarDatos}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre"
                    name="nombre"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Poblacion</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese poblacion"
                    name="poblacion"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese area"
                    name="area"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Capital</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese capital"
                    name="capital"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese region"
                    name="idRegion"
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
          <Modal.Title>Modificar Pais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modificarDatos}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre"
                    name="nombre"
                    onChange={handleInputChange}
                    value={pais.nombre}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Poblacion</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese poblacion"
                    name="poblacion"
                    onChange={handleInputChange}
                    value={pais.poblacion}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese area"
                    name="area"
                    onChange={handleInputChange}
                    value={pais.area}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Capital</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese capital"
                    name="capital"
                    onChange={handleInputChange}
                    value={pais.capital}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese region"
                    name="idRegion"
                    onChange={handleInputChange}
                    value={pais.idRegion}
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
            Error al crear pais
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
            Error al crear pais
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

export default Pais;
