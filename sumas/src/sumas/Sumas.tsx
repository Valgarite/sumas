import { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import './Sumas.css';
import '../imagenes/buena.png'
import borrador from '../imagenes/borrador.png'
import subir from '../imagenes/flecha.png'

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
  const [resueltos, setResueltos] = useState<{ [index: number]: boolean }>({});
  
  const resultadosEjercicio = () => {
    for (let i = 0; i < numerosAleatorios.length; i++) {
      const resultado = numerosAleatorios[i] + numerosAleatorios2[i]
      resultados.push(resultado)
      setResueltos(prevState => ({
        ...prevState,
        [i]: false
      }));
      
    }
    return resultados
  }

  const [resultadosParaMostrar] = useState(resultadosEjercicio)
  const handleConfirm = (i: number) => {
    abrirEjercicio(i)
    setTextoResultado('')
    setConfirmarVenta(true)
    setInicio(Date.now())
  }
  const handleConfirmClose = () => setConfirmarVenta(false);
  const [textoResultado, setTextoResultado] = useState('Revisar')
  const [inputValue,setInputValue] = useState('');
  let [numResult, setNumResult] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(inputValue)
    setInputValue(event.target.value)
  }

  const validarEjercicio = (num1: number, num2: number, respuestaUsuario: number, i: number) => {
    //const respuestaInt = parseInt(respuestaUsuario)
    const respuestaReal = num1 + num2
    if (respuestaReal === respuestaUsuario) {
      setTextoResultado('Correcto')
      setResueltos(prevState => ({
        ...prevState,
        [numEjercicio]: true
      }));
      if(numEjercicio<7){
        setNumEjercicio(i+=1)
      }
      setNumResult(1)      
    } else {
      setTextoResultado('¡Vuelve a intentarlo!')
      setNumResult(1)
    }
    let todosResueltos: boolean = true
    for (let i = 0; i < 7; i++) {
      if (!resueltos[i]) {
        todosResueltos = false;
        break;
      }
    }
    if (todosResueltos) {
      setCompletado(true)
    }
    
  }

  const botonValores = (operacion: boolean) =>{
    if (operacion){
      setNumResult(numResult+=1)
      if(numResult===19){
        setNumResult(1)
      }
    } else{
      setNumResult(numResult-=1)
    }
  }
  const botonReiniciar = () =>{
    setNumResult(1)
  }

  const [completado, setCompletado] = useState(false)
  
  const mostrarResueltos = (i: number) =>{
    if(resueltos[i]){
      return resultadosParaMostrar[i]
    }else{
      return "?"
    }
  }

  const setBotonClass = (i:number)=>{
    if(mostrarResueltos(i)==="?"){
      return 'sinResolver'
    } else {
      return 'Resuelto'
    }
  }

  const [inicio, setInicio] = useState(0);
  return (
    <>
      <p className='Ejercicios'>{resultadosParaMostrar.map((i: number, index: number) =>
        <span key={index}>
          <button className={setBotonClass(index)} onClick={() => handleConfirm(index)}>
            &nbsp;&nbsp;{numerosAleatorios[index]}+<br></br>
            <u>&nbsp;{numerosAleatorios2[index]}&nbsp;</u><hr></hr>
            {mostrarResueltos(index)}
          </button>
        </span>)}
      </p>
      <Modal
        className="Modal-SeleccionarCliente"
        show={confirmarVenta}
        onHide={handleConfirmClose}
      >
        <Modal.Header>
          <Modal.Title>Ejercicio | {numEjercicio + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardHeader>
              
              <p id='Sumandos'>
              {numerosAleatorios[numEjercicio]}<br></br>
              {numerosAleatorios2[numEjercicio]}
              </p>
              <input id='Entrada' type='text' value={numResult} onChange={handleInputChange}></input>
              <button className='Panel' onClick={()=>botonValores(true)}><img src={subir} alt="subir" width='auto'></img></button>
              <button className='Panel' onClick={()=>validarEjercicio(numerosAleatorios[numEjercicio], numerosAleatorios2[numEjercicio], numResult, numEjercicio)}>{textoResultado||'Revisar'}</button>
              <button className='Panel' onClick={()=>botonReiniciar()}><img src={borrador} alt="borra" width='auto'></img></button>
              <Modal
              className='JuegoCompletado'
              show={completado}>
                <p id='Felicidades' className='Resultados'>¡Felicidades!</p>
                <p id='Tiempo' className='Resultados'>Lo hiciste en {Math.round((Date.now()-inicio)/1000)} segundos</p>
              </Modal>

              </CardHeader>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SumasPage;