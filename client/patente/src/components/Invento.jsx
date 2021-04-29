import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Col } from "react-bootstrap";
import TableScrollbar from "react-table-scrollbar";
import axios from "../services/axios";

function Invento() {
  const [data, setData] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [modalShowModify, setModalShowModify] = useState(false);
  const [Invento, setInvento] = useState({
    id: 0,
    nombre: "",
    anio: 0,
    idPais: 0,
  });

  const setDatos = (valor) => {
    setInvento({
      id: valor.id,
      nombre: valor.nombre,
      anio: valor.anio,
      idPais: valor.id_pais,
    });
    setModalShowModify(true);
  };

  const modificarDatos = (event) => {
    event.preventDefault();
    if (Invento.nombre !== "" && Invento.anio > 0 && Invento.idPais > 0) {
      modify();
      setModalShowModify(false);
    } else {
      setModalShowModify(false);
      setSmShow(true);
    }
  };

  const handleInputChange = (event) => {
    setInvento({
      ...Invento,
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
    const request = await axios.put("/Invento/update", Invento);
    if (request.data !== undefined) {
      fetchData("/Invento/read");
    }
    return request;
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData("/Invento/read");
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
                <th>Nombre</th>
                <th>Año</th>
                <th>Id Pais</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.nombre}</td>
                  <td>{element.anio}</td>
                  <td>{element.id_pais}</td>
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
          <Modal.Title>Modificar Invento</Modal.Title>
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
                    value={Invento.nombre}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese año"
                    name="anio"
                    onChange={handleInputChange}
                    value={Invento.anio}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Id Pais</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese id pais"
                    name="idPais"
                    onChange={handleInputChange}
                    value={Invento.idPais}
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
            Error al crear Invento
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
            Error al crear Invento
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

export default Invento;
