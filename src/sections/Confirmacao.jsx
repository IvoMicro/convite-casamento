
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion
} from "motion/react";

import "./Confirmacao.css";

// NOVO ENDEREÇO DO GOOGLE APPS SCRIPT
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyCUsArsYXxzrSMd0ujZk6Z2Yj-n7Aodr0EVEUs-UcprPzK8l5R03S8SyfraPfdrG1w/exec";

// ANIMAÇÕES
const animacaoEntrada = {
  hidden: {
    opacity: 0,
    y: 40
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Confirmacao() {
  const reduzirMovimento = useReducedMotion();

  // DADOS DO FORMULÁRIO
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [presenca, setPresenca] = useState("");

  // ESTADOS
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  // ENVIAR PARA O GOOGLE APPS SCRIPT
  async function enviarFormulario(evento) {
    evento.preventDefault();

    if (enviando) return;

    setErro("");

    const nomeLimpo = nome.trim();
    const numero = telefone.replace(/\D/g, "");

    const numeroLocal = numero.startsWith("258")
      ? numero.slice(3)
      : numero;

    // VALIDAR NOME
    if (nomeLimpo.length < 3) {
      setErro("Introduz o teu nome completo.");
      return;
    }

    // VALIDAR TELEFONE
    if (!/^8[2-7]\d{7}$/.test(numeroLocal)) {
      setErro(
        "Introduz um número de telefone válido com 9 dígitos."
      );
      return;
    }

    // VALIDAR PRESENÇA
    if (
      presenca !== "Sim, poderei" &&
      presenca !== "Não poderei"
    ) {
      setErro("Selecciona uma opção de presença.");
      return;
    }

    setEnviando(true);

    try {
      const dados = {
        nome: nomeLimpo,
        telefone: numeroLocal,
        presenca: presenca
      };

      console.log("Dados enviados:", {
        nome: nomeLimpo,
        presenca
      });

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(dados)
      });

      // O pedido foi enviado pelo navegador.
      // Com no-cors, não é possível confirmar
      // automaticamente a gravação no Google Forms.
      setPedidoEnviado(true);

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      setErro(
        "Não foi possível enviar o pedido. " +
        "Verifica a ligação à internet e tenta novamente."
      );

    } finally {
      setEnviando(false);
    }
  }

  // LIMPAR FORMULÁRIO
  function novaResposta() {
    setNome("");
    setTelefone("");
    setPresenca("");

    setErro("");
    setPedidoEnviado(false);
  }

  return (
    <section
      className="confirmacao-section"
      id="confirmacao"
    >
      <div
        className="confirmacao-brilho"
        aria-hidden="true"
      />

      <div className="confirmacao-container">

        {/* CABEÇALHO */}
        <motion.header
          className="confirmacao-cabecalho"
          initial={
            reduzirMovimento ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.span
            className="confirmacao-etiqueta"
            variants={animacaoEntrada}
          >
            A SUA PRESENÇA É ESPECIAL
          </motion.span>

          <motion.h2 variants={animacaoEntrada}>
            Confirmação de <em>Presença</em>
          </motion.h2>

          <motion.div
            className="confirmacao-ornamento"
            variants={animacaoEntrada}
            aria-hidden="true"
          >
            <span />
            <i />
            <span />
          </motion.div>

          <motion.p variants={animacaoEntrada}>
            Gostaríamos muito de contar com a tua
            presença neste dia especial.
          </motion.p>
        </motion.header>

        {/* CARTÃO DO FORMULÁRIO */}
        <motion.div
          className="confirmacao-formulario-area"
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
            once: true,
            amount: 0.15
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div className="confirmacao-formulario-topo">
            <span>ALDIMIRO & CARLOTA</span>
            <span>19 · 12 · 2026</span>
          </div>

          <div className="confirmacao-formulario-corpo">
            <AnimatePresence mode="wait">

              {!pedidoEnviado ? (

                <motion.form
                  key="formulario"
                  onSubmit={enviarFormulario}
                  initial={{
                    opacity: 0,
                    y: 15
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -15
                  }}
                  transition={{
                    duration: 0.35
                  }}
                >

                  {/* NOME COMPLETO */}
                  <div className="confirmacao-campo">
                    <label htmlFor="nome-convidado">
                      Nome completo
                    </label>

                    <input
                      id="nome-convidado"
                      type="text"
                      placeholder="Escreva o seu nome completo"
                      value={nome}
                      onChange={(e) =>
                        setNome(e.target.value)
                      }
                      required
                      minLength={3}
                      maxLength={120}
                      autoComplete="name"
                    />
                  </div>

                  {/* TELEFONE */}
                  <div className="confirmacao-campo">
                    <label htmlFor="telefone-convidado">
                      Número de telefone
                    </label>

                    <input
                      id="telefone-convidado"
                      type="tel"
                      placeholder="Ex.: 875707624"
                      value={telefone}
                      onChange={(e) =>
                        setTelefone(e.target.value)
                      }
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                    />
                  </div>

                  {/* CONFIRMAÇÃO DE PRESENÇA */}
                  <fieldset className="confirmacao-presenca">
                    <legend>
                      Poderás estar presente?
                    </legend>

                    <div className="confirmacao-opcoes">

                      {/* SIM */}
                      <label
                        className={`confirmacao-opcao ${
                          presenca === "Sim, poderei"
                            ? "selecionada"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="presenca"
                          value="Sim, poderei"
                          checked={
                            presenca === "Sim, poderei"
                          }
                          onChange={(e) =>
                            setPresenca(e.target.value)
                          }
                          required
                        />

                        <span className="confirmacao-opcao-icone">
                          ✓
                        </span>

                        <span>
                          Sim, poderei ir
                        </span>
                      </label>

                      {/* NÃO */}
                      <label
                        className={`confirmacao-opcao ${
                          presenca === "Não poderei"
                            ? "selecionada"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="presenca"
                          value="Não poderei"
                          checked={
                            presenca === "Não poderei"
                          }
                          onChange={(e) =>
                            setPresenca(e.target.value)
                          }
                          required
                        />

                        <span className="confirmacao-opcao-icone">
                          ×
                        </span>

                        <span>
                          Não poderei ir
                        </span>
                      </label>

                    </div>
                  </fieldset>

                  {/* ERROS */}
                  {erro && (
                    <p
                      className="confirmacao-erro"
                      role="alert"
                    >
                      {erro}
                    </p>
                  )}

                  {/* PRIVACIDADE */}
                  <p className="confirmacao-privacidade">
                    Os dados fornecidos serão utilizados
                    apenas para organizar a celebração.
                  </p>

                  {/* BOTÃO */}
                  <motion.button
                    type="submit"
                    className="confirmacao-botao"
                    disabled={enviando}
                    whileHover={
                      reduzirMovimento || enviando
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.01
                          }
                    }
                    whileTap={
                      reduzirMovimento || enviando
                        ? undefined
                        : {
                            scale: 0.98
                          }
                    }
                  >
                    {enviando
                      ? "A enviar..."
                      : "Confirmar Presença"}

                    {!enviando && (
                      <span aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </motion.button>

                </motion.form>

              ) : (

                /* MENSAGEM APÓS O ENVIO */
                <motion.div
                  key="mensagem"
                  className="confirmacao-sucesso"
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.6
                  }}
                  role="status"
                >
                  <div className="confirmacao-sucesso-icone">
                    ♡
                  </div>

                  <h3>
                    Obrigado pela tua resposta!
                  </h3>

                  <p>
                    O pedido de confirmação foi enviado.
                    Agradecemos o carinho e a atenção.
                  </p>

                  <p className="confirmacao-privacidade">
                    O registo ainda não pôde ser
                    confirmado automaticamente.
                  </p>

                  <button
                    type="button"
                    onClick={novaResposta}
                    className="confirmacao-nova-resposta"
                  >
                    Preencher novamente
                  </button>
                </motion.div>

              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* MENSAGEM FINAL */}
        <motion.p
          className="confirmacao-mensagem-final"
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
            once: true
          }}
          transition={{
            duration: 0.8
          }}
        >
          A nossa felicidade será ainda maior
          com a tua presença.
        </motion.p>

      </div>
    </section>
  );
}
