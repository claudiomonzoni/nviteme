import { useEffect, useState } from "react";
// import '../estilos/hero.module.scss'
import Style from "../estilos/hero.module.scss";
import invitadosData from "../data/invitados.json";

export default function Hero({ nombres, fecha }) {
  const [invitado, setInvitado] = useState("sin datos");
  const [pase, setPase] = useState(0);
  useEffect(() => {
    const datosInvitados = invitadosData;
    const valores = window.location.search;
    const params = new URLSearchParams(valores);
    const id = params.get("id");
    setInvitado(datosInvitados[id].nombre);
    setPase(datosInvitados[id].pases);

    
  });
  return (
    <>
      <section id={Style["hero"]} className="grid contenido">
        <div className={Style.bandeja}>
          <div className={Style.centro}>
            <span className={Style.familia} id="invitado ">
              {invitado}
            </span>
            <h1 dangerouslySetInnerHTML={{__html: nombres}}></h1>
            <p>
              desean invitarte a <b>celebrar su boda</b>
            </p>
            <p className={Style.fecha}>{fecha}</p>
          </div>
          <div id={Style["pases"]}>
            No. de pases: <span id="NumeroPases">{pase}</span>
          </div>
        </div>
      </section>
    </>
  );
}
