
import { useEffect, useRef } from "react";

export default function Musica() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    const removerEventos = () => {
      document.removeEventListener("pointerdown", iniciarMusica);
      document.removeEventListener("touchstart", iniciarMusica);
      document.removeEventListener("keydown", iniciarMusica);
    };

    const iniciarMusica = () => {
      if (!audio.paused) return;

      audio.play()
        .then(() => {
          // Música iniciada com sucesso
          removerEventos();
        })
        .catch((erro) => {
          console.warn(
            "Não foi possível iniciar a música:",
            erro
          );
        });
    };

    // Iniciar no primeiro toque ou clique
    document.addEventListener("pointerdown", iniciarMusica);
    document.addEventListener("touchstart", iniciarMusica);
    document.addEventListener("keydown", iniciarMusica);

    // Tentar iniciar automaticamente
    iniciarMusica();

    return () => {
      removerEventos();
      audio.pause();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={`${import.meta.env.BASE_URL}audio/best.mp3`}
      preload="auto"
      loop
      playsInline
    />
  );
}
