
import { useEffect, useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion
} from "motion/react";

import casalImage from "../assets/casal.jpg";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];

const aparecer = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease
    }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2
    }
  }
};

export default function Hero() {
  const heroRef = useRef(null);
  const [imagemPronta, setImagemPronta] = useState(false);

  const reduzirMovimento = useReducedMotion();

  /* ======================================
     MOVIMENTO DO RATO
  ====================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 35,
    damping: 25
  });

  const y = useSpring(mouseY, {
    stiffness: 35,
    damping: 25
  });

  /* ======================================
     PARALLAX AO FAZER SCROLL
  ====================================== */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scrollSuave = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25
  });

  const imagemY = useTransform(
    scrollSuave,
    [0, 1],
    ["0%", "18%"]
  );

  const conteudoY = useTransform(
    scrollSuave,
    [0, 1],
    [0, -90]
  );

  const conteudoOpacity = useTransform(
    scrollSuave,
    [0, 0.85],
    [1, 0]
  );

  /* ======================================
     CARREGAMENTO DA IMAGEM
  ====================================== */

  useEffect(() => {
    const imagem = new Image();

    imagem.onload = () => setImagemPronta(true);
    imagem.onerror = () => setImagemPronta(true);
    imagem.src = casalImage;

    if (imagem.complete) {
      setImagemPronta(true);
    }

    return () => {
      imagem.onload = null;
      imagem.onerror = null;
    };
  }, []);

  /* ======================================
     MOVIMENTO INTERACTIVO
  ====================================== */

  function moverImagem(evento) {
    if (
      reduzirMovimento ||
      evento.pointerType === "touch"
    ) {
      return;
    }

    const area =
      evento.currentTarget.getBoundingClientRect();

    const posicaoX =
      (evento.clientX - area.left) / area.width - 0.5;

    const posicaoY =
      (evento.clientY - area.top) / area.height - 0.5;

    mouseX.set(posicaoX * -18);
    mouseY.set(posicaoY * -12);
  }

  function pararMovimento() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={heroRef}
      className="hero"
      id="inicio"
      onPointerMove={moverImagem}
      onPointerLeave={pararMovimento}
    >
      {/* ===================================
          FOTOGRAFIA CINEMATOGRÁFICA
      =================================== */}

      <motion.div
        className="hero-background-parallax"
        style={{
          y: reduzirMovimento ? 0 : imagemY
        }}
        aria-hidden="true"
      >
        <motion.div
          className="hero-background"
          style={{
            backgroundImage: `url("${casalImage}")`,
            x: reduzirMovimento ? 0 : x,
            y: reduzirMovimento ? 0 : y
          }}
          initial={
            reduzirMovimento
              ? false
              : {
                  scale: 1.17,
                  opacity: 0.65
                }
          }
          whileInView={{
            scale: 1.05,
            opacity: 1
          }}
          viewport={{
            once: false,
            amount: 0.15
          }}
          transition={{
            duration: reduzirMovimento ? 0 : 2.4,
            ease
          }}
        />
      </motion.div>

      {/* CAMADAS VISUAIS */}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-light" aria-hidden="true" />

      {/* ===================================
          CONTEÚDO PRINCIPAL
      =================================== */}

      <motion.div
        className="hero-content-parallax"
        style={{
          y: reduzirMovimento ? 0 : conteudoY,
          opacity: reduzirMovimento
            ? 1
            : conteudoOpacity
        }}
      >
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial={
            reduzirMovimento ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.15
          }}
        >
          {/* ETIQUETA */}

          <motion.p
            className="hero-eyebrow"
            variants={aparecer}
          >
            THE WEDDING OF
          </motion.p>

          {/* NOMES */}

          <h1 className="hero-names">
            <motion.span
              className="first-name"
              variants={aparecer}
            >
              Aldimiro Carlos
            </motion.span>

            <motion.span
              className="ampersand"
              variants={aparecer}
            >
              <motion.span
                className="ampersand-inner"
                animate={
                  reduzirMovimento
                    ? undefined
                    : {
                        y: [0, -5, 0]
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                &
              </motion.span>
            </motion.span>

            <motion.span
              className="second-name"
              variants={aparecer}
            >
              Carlota Alfredo
            </motion.span>
          </h1>

          {/* ORNAMENTO */}

          <motion.div
            className="hero-ornament"
            variants={aparecer}
            aria-hidden="true"
          >
            <motion.span
              initial={
                reduzirMovimento
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{
                scaleX: 1
              }}
              viewport={{
                once: false
              }}
              transition={{
                duration: 1.2,
                ease
              }}
            />

            <i />

            <motion.span
              initial={
                reduzirMovimento
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{
                scaleX: 1
              }}
              viewport={{
                once: false
              }}
              transition={{
                duration: 1.2,
                ease
              }}
            />
          </motion.div>

          {/* MENSAGEM */}

          <motion.p
            className="hero-message"
            variants={aparecer}
          >
            É uma honra convidá-lo para celebrar connosco
            este momento único e inesquecível.
          </motion.p>

          {/* DATA */}

          <motion.div
            className="hero-date-container"
            variants={aparecer}
          >
            <span className="save-date">
              SAVE THE DATE
            </span>

            <time
              className="wedding-date"
              dateTime="2026-12-19"
            >
              19 DE DEZEMBRO DE 2026
            </time>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ===================================
          INDICADOR DE SCROLL
      =================================== */}

      <motion.div
        className="hero-scroll"
        initial={
          reduzirMovimento
            ? false
            : {
                opacity: 0,
                y: 15
              }
        }
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: false
        }}
        transition={{
          duration: 1,
          delay: reduzirMovimento ? 0 : 0.7
        }}
      >
        <span>
          UMA HISTÓRIA PARA CELEBRAR
        </span>

        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
