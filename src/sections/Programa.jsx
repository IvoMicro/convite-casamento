
import { useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion
} from "motion/react";

import "./Programa.css";

/* ==========================================
   DADOS DOS EVENTOS
========================================== */

const agenda = [
  {
    hora: "11h00",
    numero: "01",
    titulo: "Cerimónia Civil",
    local: "Conservatória do Registo Civil do Dondo",
    detalhe: "Dondo, Província de Sofala",
    icone: "civil",
    mapa: "https://www.google.com/maps?q=-19.6161248,34.7425675"
  },
  {
    hora: "12h00",
    numero: "02",
    titulo: "Cerimónia Religiosa",
    local: "Posto Administrativo de Mafambisse",
    detalhe: "Distrito de Dondo, Província de Sofala",
    icone: "igreja",
    mapa:
      "https://www.google.com/maps/search/?api=1&query=Mafambisse%2C+Dondo%2C+Sofala"
  },
  {
    hora: "14h30",
    numero: "03",
    titulo: "Copo d'Água / Recepção",
    local: "Salão da Escola Secundária de Mafambisse",
    detalhe: "Mafambisse, Distrito de Dondo, Sofala",
    icone: "recepcao",
    mapa: "https://www.google.com/maps?q=-19.5394344,34.636322"
  }
];

const EASE = [0.22, 1, 0.36, 1];

/* ==========================================
   ÍCONES
========================================== */

function Icone({ tipo }) {
  if (tipo === "civil") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M6 19L24 8L42 19M10 19H38M12 21V36M20 21V36M28 21V36M36 21V36M7 39H41M9 36H39" />
      </svg>
    );
  }

  if (tipo === "igreja") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5V15M19 10H29M11 40V24L24 15L37 24V40M17 40V30H31V40M7 40H41" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M9 8H39L34 24C32.5 30 28 33 24 33C20 33 15.5 30 14 24L9 8ZM24 33V41M16 42H32M13 18H35" />
    </svg>
  );
}

/* ==========================================
   CARTÃO DE EVENTO
   ANIMAÇÕES REPETÍVEIS
========================================== */

function CartaoEvento({ evento, indice, reduzirMovimento }) {
  return (
    <motion.article
      className="programa-evento"
      initial={reduzirMovimento ? false : "oculto"}
      whileInView="visivel"
      viewport={{
        once: false,
        amount: 0.2
      }}
      variants={{
        oculto: {
          opacity: 0,
          y: 55,
          filter: "blur(6px)"
        },
        visivel: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }
      }}
      transition={{
        duration: reduzirMovimento ? 0 : 0.8,
        delay: reduzirMovimento ? 0 : indice * 0.08,
        ease: EASE
      }}
    >
      {/* MARCADOR DA TIMELINE */}

      <div className="programa-marcador" aria-hidden="true">
        <motion.div
          className="programa-ponto"
          initial={reduzirMovimento ? false : "oculto"}
          whileInView="visivel"
          viewport={{
            once: false,
            amount: 0.1
          }}
          variants={{
            oculto: {
              scale: 0,
              opacity: 0
            },
            visivel: {
              scale: 1,
              opacity: 1
            }
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 17,
            delay: reduzirMovimento ? 0 : indice * 0.08
          }}
        />
      </div>

      {/* CARTÃO */}

      <motion.div
        className="programa-cartao"
        whileHover={
          reduzirMovimento
            ? undefined
            : {
                y: -7,
                boxShadow:
                  "0 24px 55px rgba(25, 55, 76, 0.13)"
              }
        }
        transition={{
          duration: 0.3
        }}
      >
        {/* HORÁRIO E ÍCONE */}

        <div className="programa-cartao-topo">
          <span className="programa-hora">
            {evento.hora}
          </span>

          <div className="programa-icone">
            <Icone tipo={evento.icone} />
          </div>
        </div>

        {/* NÚMERO DO MOMENTO */}

        <span className="programa-numero">
          MOMENTO {evento.numero}
        </span>

        {/* TÍTULO */}

        <h3>{evento.titulo}</h3>

        {/* LOCALIZAÇÃO */}

        <div className="programa-local">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 10C20 16 12 22 12 22S4 16 4 10A8 8 0 1 1 20 10Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <div>
            <strong>{evento.local}</strong>
            <span>{evento.detalhe}</span>
          </div>
        </div>

        {/* GOOGLE MAPS */}

        {evento.mapa ? (
          <a
            href={evento.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="programa-mapa"
            aria-label={`Ver localização de ${evento.titulo} no Google Maps`}
          >
            Ver no mapa
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="programa-mapa indisponivel">
            Localização em breve
          </span>
        )}
      </motion.div>
    </motion.article>
  );
}

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

export default function Programa() {
  const timelineRef = useRef(null);
  const reduzirMovimento = useReducedMotion();

  /* SCROLL DA TIMELINE */

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 80%"]
  });

  /* BARRA SUAVE */

  const progressoSuave = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section className="programa-section" id="programa">
      <div className="programa-container">

        {/* CABEÇALHO */}

        <motion.header
          className="programa-cabecalho"
          initial={
            reduzirMovimento
              ? false
              : {
                  opacity: 0,
                  y: 40
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: false,
            amount: 0.3
          }}
          transition={{
            duration: reduzirMovimento ? 0 : 0.9,
            ease: EASE
          }}
        >
          <span className="programa-etiqueta">
            19 DE DEZEMBRO DE 2026
          </span>

          <h2>
            Programa da <em>Celebração</em>
          </h2>

          <p>
            Cada momento foi pensado para celebrar
            o amor e criar memórias inesquecíveis.
          </p>
        </motion.header>

        {/* TIMELINE */}

        <div className="programa-timeline" ref={timelineRef}>

          {/* LINHA DE FUNDO */}

          <div
            className="programa-linha-base"
            aria-hidden="true"
          />

          {/* LINHA ANIMADA PELO SCROLL */}

          <motion.div
            className="programa-linha-progresso"
            style={{
              scaleY: reduzirMovimento
                ? 1
                : progressoSuave
            }}
            aria-hidden="true"
          />

          {/* EVENTOS */}

          {agenda.map((evento, indice) => (
            <CartaoEvento
              key={evento.numero}
              evento={evento}
              indice={indice}
              reduzirMovimento={reduzirMovimento}
            />
          ))}
        </div>

        {/* RODAPÉ */}

        <motion.p
          className="programa-rodape"
          initial={
            reduzirMovimento
              ? false
              : {
                  opacity: 0,
                  y: 25
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: false,
            amount: 0.2
          }}
          transition={{
            duration: reduzirMovimento ? 0 : 0.8,
            ease: EASE
          }}
        >
          Esperamos por si para celebrar connosco.
        </motion.p>

      </div>
    </section>
  );
}
