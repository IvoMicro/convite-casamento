
import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
  useReducedMotion
} from "motion/react";

import "./Contagem.css";

const DATA_CASAMENTO = "2026-12-19T15:00:00+02:00";

const destino = new Date(DATA_CASAMENTO).getTime();

function calcularTempo() {
  const restante = Math.max(0, destino - Date.now());

  return {
    dias: Math.floor(restante / 86400000),
    horas: Math.floor((restante / 3600000) % 24),
    minutos: Math.floor((restante / 60000) % 60),
    segundos: Math.floor((restante / 1000) % 60),
    terminou: restante === 0
  };
}

/* ANIMAÇÃO DOS NÚMEROS */

function Numero({ valor, reduzirMovimento }) {
  const texto = String(valor).padStart(2, "0");

  return (
    <div className="relogio-numero-area">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={texto}
          className="relogio-numero"
          initial={
            reduzirMovimento
              ? false
              : { opacity: 0, y: 12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduzirMovimento
              ? { opacity: 0 }
              : { opacity: 0, y: -12 }
          }
          transition={{
            duration: reduzirMovimento ? 0 : 0.25
          }}
        >
          {texto}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ANIMAÇÕES REPETÍVEIS */

function animacaoEntrada(reduzirMovimento, distancia = 35) {
  return {
    initial: reduzirMovimento
      ? false
      : {
          opacity: 0,
          y: distancia
        },

    whileInView: {
      opacity: 1,
      y: 0
    },

    viewport: {
      once: false,
      amount: 0.15
    },

    transition: {
      duration: reduzirMovimento ? 0 : 0.85,
      ease: [0.22, 1, 0.36, 1]
    }
  };
}

/* COMPONENTE PRINCIPAL */

export default function Contagem() {
  const [tempo, setTempo] = useState(calcularTempo);

  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    const actualizar = () => {
      setTempo(calcularTempo());
    };

    actualizar();

    const intervalo = setInterval(actualizar, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const unidades = [
    { nome: "DIAS", valor: tempo.dias },
    { nome: "HORAS", valor: tempo.horas },
    { nome: "MINUTOS", valor: tempo.minutos },
    { nome: "SEGUNDOS", valor: tempo.segundos }
  ];

  return (
    <section className="contagem-section" id="contagem">

      <div className="contagem-luz contagem-luz-esquerda" />
      <div className="contagem-luz contagem-luz-direita" />

      <div className="contagem-container">

        {/* VERSÍCULO */}

        <motion.div
          className="versiculo-bloco"
          {...animacaoEntrada(reduzirMovimento, 35)}
        >
          <span className="versiculo-etiqueta">
            O AMOR É UMA BÊNÇÃO
          </span>

          <blockquote className="versiculo-texto">
            <p>
              “Tudo tem o seu tempo determinado,
              e há tempo para todo o propósito
              debaixo do céu”
            </p>

            <cite>Eclesiastes 3:1</cite>
          </blockquote>
        </motion.div>

        {/* INICIAIS */}

        <motion.div
          className="contagem-divisor"
          {...animacaoEntrada(reduzirMovimento, 20)}
        >
          A <em>&</em> C
        </motion.div>

        {/* PAINEL DO RELÓGIO */}

        <motion.div
          className="contagem-relogio-bloco"
          {...animacaoEntrada(reduzirMovimento, 55)}
        >
          <div className="relogio-brilho" />

          <div className="relogio-cabecalho">
            <span className="relogio-pre-titulo">
              SAVE THE DATE
            </span>

            <h2>
              O nosso <em>grande dia</em>
            </h2>

            <p>
              Cada segundo aproxima-nos de um momento
              que ficará para sempre nas nossas memórias.
            </p>
          </div>

          {/* CONTADOR */}

          <div
            className="relogio-grid"
            role="timer"
            aria-label="Contagem regressiva para 19 de Dezembro de 2026"
          >
            {unidades.map((unidade, indice) => (
              <motion.div
                className="relogio-unidade"
                key={unidade.nome}

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
                  duration: reduzirMovimento ? 0 : 0.65,
                  delay: reduzirMovimento ? 0 : indice * 0.09,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="relogio-visor">
                  <Numero
                    valor={unidade.valor}
                    reduzirMovimento={reduzirMovimento}
                  />
                </div>

                <span className="relogio-legenda">
                  {unidade.nome}
                </span>
              </motion.div>
            ))}
          </div>

          {tempo.terminou && (
            <p className="relogio-mensagem-final">
              O nosso grande dia chegou!
            </p>
          )}

          {/* DATA */}

          <motion.div
            className="relogio-data"

            initial={
              reduzirMovimento
                ? false
                : { opacity: 0, y: 15 }
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
              duration: reduzirMovimento ? 0 : 0.7
            }}
          >
            <time dateTime="2026-12-19">
              19 DE DEZEMBRO DE 2026
            </time>
          </motion.div>
        </motion.div>

        {/* ASSINATURA */}

        <motion.p
          className="contagem-assinatura"
          {...animacaoEntrada(reduzirMovimento, 20)}
        >
          ALDIMIRO CARLOS
          <span> & </span>
          CARLOTA ALFREDO
        </motion.p>

      </div>
    </section>
  );
}
