import { useState } from 'react';
import './App.css';
import { Button, Container, Form, Row, Spinner, Alert } from 'react-bootstrap';
import {classificationTriangles} from './api/api'
import { toast } from 'react-toastify';


function App() {

  const [loading, setLoading] = useState(false)
  const [classification, setClassification] = useState(null)

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)

    try {

      const response = await classificationTriangles(
        form.ladoA.value,
        form.ladoB.value,
        form.ladoC.value
      )

      if (!response.classification){
        toast.error("Não foi possivel classificar esse triangulo")
      } else {
        setClassification(response)
      }
      
    } catch (e) {
        toast.error(e.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container>
      <h1>
        Classificador de triângulos
      </h1>
      <Alert variant="info" hidden={classification === null}>
         O triangulo é {classification?.classification} e os angulos são <br/>cosA = {classification?.angles.cosA};<br/> cosB = {classification?.angles.cosB}<br/> cosC = {classification?.angles.cosC}<br/>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="ladoA" >
            <Form.Label>Tamanho Lado A</Form.Label>
            <Form.Control type="number" placeholder="Insira a medida do lado A" min={1} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ladoB" required>
            <Form.Label>Tamanho Lado B</Form.Label>
            <Form.Control type="number" placeholder="Insira a medida do Lado B" min={1} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ladoC" required>
            <Form.Label>Tamanho Lado C</Form.Label>
            <Form.Control type="number" placeholder="Insira a medida do lado C" min={1} required />
          </Form.Group>
        </Row>
        <Row>
          <Button variant="primary" type="submit">
            {loading ? <LoadComponent /> : 'Classificar'}
          </Button>
        </Row>
      </Form>
    </Container>
  );
}


function LoadComponent() {
  return (
    <>
      <Spinner animation="border" role="status" />
      <span className="visually-hidden">Processando...</span>
    </>
  );
}
export default App;
