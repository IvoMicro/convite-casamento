
import Hero from "./components/Hero";
import Musica from "./components/Musica";

import Contagem from "./sections/Contagem";
import NossosMomentos from "./sections/NossosMomentos";
import Programa from "./sections/Programa";
import Confirmacao from "./sections/Confirmacao";
import Rodape from "./sections/Rodape";

export default function App() {
  return (
    <>
      <Musica />

      <main>
        <Hero />
        <Contagem />
        <NossosMomentos />
        <Programa />
        <Confirmacao />
      </main>

      <Rodape />
    </>
  );
}
