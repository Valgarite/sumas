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
  const [numEjercicio, setNumEjercicio] = useState(1)
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
  const [textoResultado, setTextoResultado] = useState('Revisar')
  const [inputValue, setInputValue] = useState('');
  let [numResult, setNumResult] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userAnswer = parseInt(event.target.value);
    setInputValue(event.target.value)
  }

  const validarEjercicio = (num1: number, num2: number, respuestaUsuario: number, i: number) => {
    //const respuestaInt = parseInt(respuestaUsuario)
    const respuestaReal = num1 + num2
    if (respuestaReal == respuestaUsuario) {
      setTextoResultado('Correcto')
      setNumEjercicio(i+=1)
      setNumResult(1)
    } else {
      setTextoResultado('¡Vuelve a intentarlo!')
      setNumResult(1)
    }
  }

  const botonValores = (operacion: boolean) =>{
    if (operacion){
      setNumResult(numResult+=1)
      if(numResult==19){
        setNumResult(1)
      }
    } else{
      setNumResult(numResult-=1)
    }
  }
  const botonReiniciar = () =>{
    setNumResult(1)
  }


  return (
    <>
      <p>{numerosAleatorios.map((numero, i) => <span key={i}>{numero}     </span>)}</p>
      <p>{numerosAleatorios2.map((numero, i) => <span key={i}>{numero}     </span>)}</p>
      <p>{resultadosParaMostrar.map((i, index) => <span key={index}><button onClick={() => handleConfirm(index)}>{index+1}</button></span>)}</p>

      <Modal
        className="Modal-SeleccionarCliente"
        show={confirmarVenta}
        onHide={handleConfirmClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ejercicio | {numEjercicio + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardHeader>
              <p>{numerosAleatorios[numEjercicio]}</p>
              <p>{numerosAleatorios2[numEjercicio]}</p>
              {/*<button onClick={()=>botonValores(false)}>Bajar</button>*/}
              <input type='text' value={numResult} onChange={handleInputChange}></input>
              <button onClick={()=>botonValores(true)}>Subir</button>
              <button onClick={()=>validarEjercicio(numerosAleatorios[numEjercicio], numerosAleatorios2[numEjercicio], numResult, numEjercicio)}>{textoResultado||'Revisar'}</button>
              <button onClick={()=>botonReiniciar()}>Borrar</button>
            </CardHeader>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SumasPage;