import { useState, useEffect } from "react";
import estilo from "../estilos/confirmacion.module.scss";
import invitadosData from "../data/invitados.json";

export default function Confirmacion({ whatsapp, dias_antes }) {
  const [invitado, setInvitado] = useState("sin datos");
  const [pases, setPases] = useState(0);

    
  useEffect(() => {
    const datosInvitados = invitadosData;
    const valores = window.location.search;
    const params = new URLSearchParams(valores);
    const id = params.get("id");
    setInvitado(datosInvitados[id].nombre);
    setPases(datosInvitados[id].pases);
    const pasesInput = document.querySelector("#Confipases");
    const generarPases = () => {
      for (let i = 1; i <= pases; i++) {
        pasesInput.innerHTML += `<option value="Numero de pases: ${i}">${i}</option>`;
      }
   
    };
    generarPases();


     // whatsapp

  // import moment from "moment";


const comentarios = document.getElementById("comentarios");
const btnconfirmar = document.getElementById("btnconfirmar");



//user agent
const ua = navigator.userAgent;

//si es cel app si es pc web.app
const enviar = (e) => {
  e.preventDefault();


  if (
  pasesInput.value === "" 
  ) {
    console.log("vacio");
  } else {
    btnconfirmar.classList.remove("desactivado");
  }
  //comprobar si es cel o pc
  let whats = "";
  if (/Mobile/i.test(ua)) {
    whats = `https://api.whatsapp.com/send/?phone=${whatsapp}&text=`;
  } else {
    whats = `https://web.whatsapp.com/send/?phone=${whatsapp}&text=`;
  }


  envio( whats, pasesInput.value, comentarios.value);
};

const envio = ( whats, pasesInput, comentarios) => {

  const url = `
  ${whats}Hola,%20les%20confirmo%20la%20asistencia%20a%20la%20boda%20de:%20${invitado},%20y%20usaremos:%0a${pasesInput}.%0aComentarios:%20${comentarios}.`;

  btnconfirmar.href = url;
  
};

pasesInput.addEventListener("focusout", enviar);
comentarios.addEventListener("focusout", enviar);



  });
  return (
    <>
      <div className="grid contenido">
        <div className={estilo.confirmacion}>
          <div className={estilo.bandeja}>
            <svg viewBox="0 0 41 31" fill="none">
              <path
                d="M41 6.3152H22.55V10.4293H41V6.3152ZM41 22.7717H22.55V26.8859H41V22.7717ZM7.257 14.5435L0 7.26145L2.8905 4.36098L7.2365 8.72196L15.9285 0L18.819 2.90046L7.257 14.5435ZM7.257 31L0 23.718L2.8905 20.8175L7.2365 25.1785L15.9285 16.4565L18.819 19.357L7.257 31Z"
                fill="white"
              ></path>
            </svg>
            <h2>Confirmación</h2>
            <p>
              Por favor <b>confírmanos</b> tu asistencia{" "}
              <b>al menos {dias_antes} días antes del evento</b>, nos ayudarás
              mucho con la organización al hacerlo.
            </p>

            <form id={estilo["formulario"]}>
              <label for="pases">Selecciona el numero de pases:</label>
              <select name="pases" id="Confipases">
                <option value="0">0</option>
              </select>
              <label for="comentarios">Envíanos comentarios (opcional):</label>
              <textarea name="comentarios" id="comentarios"></textarea>
              <a href="#" className="btn" id="btnconfirmar">
                Confirmar
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
