import React, { Fragment, useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Error from './Components/Error/Error';
import Clima from './Components/Clima/Clima';
import Formulario from './Components/Formulario/Formulario';


function App() {

  // State del formulario

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});

  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      if (consultar) {
        const appID = 'd85892e19ddec0eda9cfbfba1f53029e';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},
        ${pais}&appid=${appID}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);


        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta
        if (resultado.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }

    }
    consultarAPI();
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultados" />
  } else {
    componente = <Clima
      resultado={resultado}
    />
  }



  return (

    <Fragment>
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
