
import { useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion
} from "motion/react";

import casal2 from "../assets/casal2.jpg";
import "./NossosMomentos.css";

/* =========================================
   CONFIGURAÇÃO DAS ANIMAÇÕES
========================================= */

const transicao = [0.22, 1, 0.36, 1];

const revelarTexto = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(6px)"
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: transicao
    }
  }
};

const revelarFotografia = {
  hidden: {
    opacity: 0,
    y: 65,
    clipPath: "inset(12% 0% 12% 0%)"
  },

  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.3,
      ease: transicao
    }
  }
};

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function NossosMomentos() {
  const secaoRef = useRef(null);
  const reduzirMovimento = useReducedMotion();

  /* PROGRESSO DO SCROLL */

  const { scrollYProgress } = useScroll({
    target: secaoRef,
    offset: ["start end", "end start"]
  });

  /* SUAVIZAÇÃO DO SCROLL */

  const progressoSuave = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001
  });

  /* PARALLAX DA FOTOGRAFIA */

  const imagemY = useTransform(
    progressoSuave,
    [0, 1],
    reduzirMovimento
      ? ["0%", "0%"]
      : ["-4%", "4%"]
  );

  /* ZOOM SUAVE CONFORME O SCROLL */

  const imagemScale = useTransform(
    progressoSuave,
    [0, 0.5, 1],
    reduzirMovimento
      ? [1, 1, 1]
      : [1.08, 1, 1.08]
  );

  /* CONFIGURAÇÃO PARA REPETIR ANIMAÇÕES */

  const viewportConfig = {
    once: false,
    amount: 0.2
  };

  return (
    <section
      className="momentos-section"
      id="nossos-momentos"
      ref={secaoRef}
    >
      <div className="momentos-container">

        {/* =====================================
            CABEÇALHO
        ===================================== */}

        <motion.div
          className="momentos-cabecalho"

          initial={
            reduzirMovimento
              ? false
              : "hidden"
          }

          whileInView="visible"

          viewport={{
            once: false,
            amount: 0.3
          }}

          transition={{
            staggerChildren: 0.15
          }}
        >
          <motion.span
            className="momentos-etiqueta"
            variants={revelarTexto}
          >
            CAPÍTULO III
          </motion.span>

          <motion.h2
            className="momentos-titulo"
            variants={revelarTexto}
          >
            Nossos <em>Momentos</em>
          </motion.h2>

          <motion.p
            className="momentos-subtitulo"
            variants={revelarTexto}
          >
            Pequenos instantes, grandes memórias.
          </motion.p>
        </motion.div>

        {/* =====================================
            FOTOGRAFIA PRINCIPAL
        ===================================== */}

        <motion.div
          className="momentos-foto-area"

          initial={
            reduzirMovimento
              ? false
              : "hidden"
          }

          whileInView="visible"

          viewport={{
            once: false,
            amount: 0.15
          }}

          variants={revelarFotografia}
        >
          <div className="momentos-foto-moldura">

            <motion.img
              src={casal2}
              alt="Aldimiro Carlos e Carlota Alfredo juntos"
              className="momentos-foto"

              style={{
                y: imagemY,
                scale: imagemScale
              }}

              loading="lazy"
              decoding="async"
            />

            <div className="momentos-foto-sombra" />

            {/* LEGENDA */}

            <motion.div
              className="momentos-foto-legenda"

              initial={
                reduzirMovimento
                  ? false
                  : {
                      opacity: 0,
                      y: 20
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
                delay: reduzirMovimento ? 0 : 0.2,
                ease: transicao
              }}
            >
              <span>A & C</span>
              <p>Uma história para recordar</p>
            </motion.div>

          </div>
        </motion.div>

        {/* =====================================
            TEXTO EDITORIAL
        ===================================== */}

        <motion.div
          className="momentos-texto"

          initial={
            reduzirMovimento
              ? false
              : "hidden"
          }

          whileInView="visible"

          viewport={viewportConfig}

          transition={{
            staggerChildren: 0.17
          }}
        >
          <motion.span
            className="momentos-texto-etiqueta"
            variants={revelarTexto}
          >
            UMA HISTÓRIA CONSTRUÍDA COM AMOR
          </motion.span>

          <motion.h3 variants={revelarTexto}>
            Há momentos que o tempo
            <em> não apaga.</em>
          </motion.h3>

          <motion.p
            className="momentos-descricao"
            variants={revelarTexto}
          >
            Entre encontros, sorrisos e sonhos
            partilhados, fomos construindo uma
            história feita de cumplicidade,
            carinho e memórias inesquecíveis.
          </motion.p>

          <motion.p
            className="momentos-frase"
            variants={revelarTexto}
          >
            E o nosso capítulo mais especial
            está prestes a começar.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
