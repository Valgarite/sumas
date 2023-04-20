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
  const [numEjercicio, setNumEjercicio] = useState(0)
  const abrirEjercicio= (i:number) => setNumEjercicio(i)
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
  const handleConfirm = (i: number) => {
    abrirEjercicio(i)
    setTextoResultado('')
    setConfirmarVenta(true)
  }
  const handleConfirmClose = () => setConfirmarVenta(false);
  const [textoResultado, setTextoResultado] = useState('')
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userAnswer = parseInt(event.target.value);
    setInputValue(event.target.value)
  }

  const validarEjercicio = (num1: number, num2: number, respuestaUsuario: string) => {
    const respuestaInt = parseInt(respuestaUsuario)
    const respuestaReal = num1 + num2
    if (respuestaReal == respuestaInt) {
      setTextoResultado('Correcto')
    } else {
      setTextoResultado('¡Vuelve a intentarlo!')
    }
  }

  return (
    <>
      <p>{numerosAleatorios.map((numero, i) => <span key={i}>{numero}     </span>)}</p>
      <p>{numerosAleatorios2.map((numero, i) => <span key={i}>{numero}     </span>)}</p>
      <p>{resultadosParaMostrar.map((i, index) => <span key={index}><button onClick={() => handleConfirm(index)}>{i}</button></span>)}</p>

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
              <p>{numerosAleatorios[numEjercicio]}</p>
              <p>{numerosAleatorios2[numEjercicio]}</p>
              <p>{resultadosParaMostrar[numEjercicio]}</p>
              <input type='text' value={inputValue} onChange={handleInputChange}></input>
              <button onClick={() => validarEjercicio(numerosAleatorios[numEjercicio], numerosAleatorios2[numEjercicio], inputValue)}>{textoResultado}</button>
            </CardHeader>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SumasPage;