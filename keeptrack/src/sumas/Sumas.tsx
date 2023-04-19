import { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const generarNumerosAleatorios = (min: number, max: number) => {
  const resultado: number[] = [];
  while (resultado.length < 8) {
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    resultado.push(randomNum)
  }
  return resultado
}

function SumasPage() {
  const [confirmarVenta, setConfirmarVenta] = useState(false)
  const [numerosAleatorios] = useState(generarNumerosAleatorios(1, 9))
  const [numerosAleatorios2] = useState(generarNumerosAleatorios(1, 9))
  let resultados: number[] = []
  const resultadosEjercicio = () => {
    for (let i = 0; i < numerosAleatorios.length; i++) {
      const resultado = numerosAleatorios[i] + numerosAleatorios2[i]
      resultados.push(resultado)
    }
    return resultados
  }
  const [resultadosParaMostrar] = useState(resultadosEjercicio)
  const handleConfirm = () => setConfirmarVenta(true)
  const handleConfirmClose = () => setConfirmarVenta(false);
  return (
    <>
      <p>{numerosAleatorios.map(numero => <span key={numero}>     {numero}</span>)}</p>
      <p>{numerosAleatorios2.map(numero => <span key={numero}>     {numero}</span>)}</p>
      <button onClick={handleConfirm}>xd</button>
      <Modal
        className="Modal-SeleccionarCliente"
        show={confirmarVenta}
        onHide={handleConfirmClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardHeader>
              {resultadosParaMostrar.map(numero => <span key={numero}>{numero}   </span>)}
            </CardHeader>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SumasPage;