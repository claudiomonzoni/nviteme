import { useEffect, useState } from "react";
import gsap from "gsap";
import Style from "../estilos/hero.module.scss";
import invitadosData from "../data/invitados.json";

export default function Hero({ nombres, fecha }) {
  const [invitado, setInvitado] = useState("ID inexistente");
  const [pase, setPase] = useState(0);
  useEffect(() => {

    document.querySelector(".contenido").classList.remove("opacidad");
    // confirmacion de id
    const valores = window.location.search;
    const params = new URLSearchParams(valores);
    const id = params.get("id");
    // animacion intro
    if (id <= invitadosData.length && id) {
      setInvitado(invitadosData[id].nombre);
      setPase(invitadosData[id].pases);
    }
    const tl = gsap.timeline();
    gsap.from(".contenido", { opacity: 0, y: -30, duration: 1, delay: 0.2 });
    tl.from("#bande", {
      opacity: 0,
      y: -30,
      delay: 2,
      height: 500,
      duration: 1,
      ease: "power4.out",
    });
    tl.from("#centro *", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power4.out",
      stagger: { amount: 0.5 },
    });
  }, []);
  return (
    <>
      <section id={Style["hero"]} className="grid contenido opacidad">
        <div className={Style.bandeja} id="bande">
          <div className={Style.centro} id="centro">
            <span className={Style.familia} id="invitado">
              {invitado}
            </span>
            <h1 dangerouslySetInnerHTML={{ __html: nombres }}></h1>
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
