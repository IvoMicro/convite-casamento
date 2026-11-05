
import {
  motion,
  useReducedMotion
} from "motion/react";

import "./Rodape.css";

const ease = [0.22, 1, 0.36, 1];

export default function Rodape() {
  const reduzirMovimento = useReducedMotion();

  const revelar = (delay = 0, y = 28) => ({
    initial: reduzirMovimento
      ? false
      : {
          opacity: 0,
          y,
          filter: "blur(6px)"
        },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    },
    viewport: {
      once: false,
      amount: 0.2
    },
    transition: {
      duration: reduzirMovimento ? 0 : 0.9,
      delay: reduzirMovimento ? 0 : delay,
      ease
    }
  });

  return (
    <footer className="rodape" id="rodape">
      {/* Luzes suaves de fundo */}
      <div
        className="rodape-luz rodape-luz-esquerda"
        aria-hidden="true"
      />
      <div
        className="rodape-luz rodape-luz-direita"
        aria-hidden="true"
      />

      <div className="rodape-container">
        <motion.div
          className="rodape-intro"
          {...revelar(0)}
        >
          <span className="rodape-etiqueta">
            COM AMOR E GRATIDÃO
          </span>

          <span className="rodape-intro-linha" />
        </motion.div>

        {/* Cartão principal de vidro */}
        <motion.div
          className="rodape-vidro"
          initial={
            reduzirMovimento
              ? false
              : {
                  opacity: 0,
                  y: 55,
                  scale: 0.97
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          viewport={{
            once: false,
            amount: 0.2
          }}
          transition={{
            duration: reduzirMovimento ? 0 : 1.15,
            ease
          }}
        >
          <div
            className="rodape-reflexo"
            aria-hidden="true"
          />

          <motion.div
            className="rodape-monograma"
            {...revelar(0.1)}
          >
            <span>A</span>
            <span className="rodape-e">&</span>
            <span>C</span>
          </motion.div>

          <motion.div
            className="rodape-ornamento"
            {...revelar(0.15, 12)}
            aria-hidden="true"
          >
            <span />
            <i />
            <span />
          </motion.div>

          <motion.h2
            className="rodape-titulo"
            {...revelar(0.2)}
          >
            O nosso amor,
            <br />
            <em>a nossa história.</em>
          </motion.h2>

          <motion.p
            className="rodape-mensagem"
            {...revelar(0.3)}
          >
            Há momentos que se tornam eternos
            porque são partilhados com pessoas
            especiais. Obrigado por fazer parte
            deste capítulo tão bonito das nossas vidas.
          </motion.p>

          <motion.div
            className="rodape-assinatura"
            {...revelar(0.4)}
          >
            <span>Aldimiro Carlos</span>
            <span className="rodape-assinatura-e">&</span>
            <span>Carlota Alfredo</span>
          </motion.div>

          <motion.div
            className="rodape-data"
            {...revelar(0.5, 12)}
          >
            <span className="rodape-data-linha" />
            <time dateTime="2026-12-19">
              19 · 12 · 2026
            </time>
            <span className="rodape-data-linha" />
          </motion.div>
        </motion.div>

        {/* Encerramento */}
        <motion.div
          className="rodape-final"
          {...revelar(0.2, 15)}
        >
          <p>
            FEITO COM AMOR PARA UM DIA INESQUECÍVEL
          </p>

          <a
            href="#inicio"
            className="rodape-voltar"
            aria-label="Voltar ao início do convite"
          >
            <span>VOLTAR AO INÍCIO</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
