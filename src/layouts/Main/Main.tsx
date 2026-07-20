import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import ListaParcela from "../../components/ListaParcela";

const Main = () => {
  const [valorEmCentavos, setValorEmCentavos] = useState<number>(0);
  const [salvandoImagem, setSalvandoImagem] = useState(false);

  const areaCapturaRef = useRef<HTMLDivElement>(null);

  const valorConvertido = valorEmCentavos / 100;

  const valorFormatado = valorConvertido.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleValorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = event.target.value.replace(/\D/g, "");

    setValorEmCentavos(Number(apenasNumeros));
  };

  const salvarSimulacao = async () => {
    const areaCaptura = areaCapturaRef.current;

    if (!areaCaptura) {
      console.error("A área da simulação não foi encontrada.");
      return;
    }

    if (valorConvertido < 480) {
      console.error("O valor precisa ser maior ou igual a R$ 480,00.");
      return;
    }

    try {
      setSalvandoImagem(true);

      const moduloHtml2canvas = await import("html2canvas-pro");
      const html2canvas = moduloHtml2canvas.default;

      const canvas = await html2canvas(areaCaptura, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const imagemBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Não foi possível gerar o arquivo PNG."));

            return;
          }

          resolve(blob);
        }, "image/png");
      });

      const urlImagem = URL.createObjectURL(imagemBlob);

      const linkDownload = document.createElement("a");

      linkDownload.href = urlImagem;
      linkDownload.download = "simulacao-parcelas.png";

      document.body.appendChild(linkDownload);
      linkDownload.click();
      linkDownload.remove();

      setTimeout(() => {
        URL.revokeObjectURL(urlImagem);
      }, 1000);
    } catch (erro) {
      console.error("Não foi possível salvar a simulação:", erro);
    } finally {
      setSalvandoImagem(false);
    }
  };

  return (
    <main className="min-h-dvh bg-slate-100 px-3 py-4">
      <div className="mx-auto w-full max-w-md">
        {/* Área que não será salva */}
        <div className="bg-slate-100 p-1">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Simulador de Vendas
            </h1>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Simulação instantânea em até 10x
            </p>
          </header>

          {/* Card do input */}
          <div className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <label
              htmlFor="valorProduto"
              className="text-xs font-medium text-gray-500"
            >
              Valor do produto
            </label>

            <input
              id="valorProduto"
              type="text"
              inputMode="numeric"
              value={valorFormatado}
              onChange={handleValorChange}
              className="
                mt-1 w-full border-b-2 border-emerald-500
                bg-transparent py-1 text-2xl font-semibold
                text-gray-900 outline-none
              "
            />
          </div>
        </div>

        {/* Área que será salva como PNG */}
        {valorConvertido >= 480 ? (
          <div ref={areaCapturaRef} className="mt-4">
            <ListaParcela valorDoProduto={valorConvertido} />
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
            <p className="text-sm font-medium text-amber-700">
              O valor mínimo para visualizar as parcelas é de R$ 480,00.
            </p>
          </div>
        )}

        {/* Botão fora da área capturada */}
        {valorConvertido >= 480 && (
          <button
            type="button"
            onClick={salvarSimulacao}
            disabled={salvandoImagem}
            className="
              mt-5 w-full rounded-xl bg-emerald-600
              px-4 py-3 font-semibold text-white
              transition-colors hover:bg-emerald-700
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {salvandoImagem ? "Gerando imagem..." : "Salvar simulação"}
          </button>
        )}
      </div>
    </main>
  );
};

export default Main;
