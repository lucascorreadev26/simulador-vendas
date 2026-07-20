type ParcelaCardProps = {
  quantidade: number;
  valorParcela: number;
  valorTotal: number;
};

const ParcelaCard = ({
  quantidade,
  valorParcela,
  valorTotal,
}: ParcelaCardProps) => {
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const melhorOpcao = quantidade === 3;
  const maisEscolhida = quantidade === 10;

  return (
    <article  className={`
    flex items-center justify-between
    border-b border-gray-200 px-4 py-3
    ${melhorOpcao ? "bg-[#F0F9F5]" : ""}
    ${maisEscolhida ? "bg-[#EFF6FF]" : ""}
  `}>
      <div>
        <p className="text-lg font-semibold text-gray-900">
          {quantidade === 1 ? "1x à vista" : `${quantidade}x parcelado`}
        </p>

        {melhorOpcao && (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase text-emerald-700">
            Melhor custo-benefício
          </span>
        )}

        {maisEscolhida && (
          <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase text-blue-700">
            Mais escolhida
          </span>
        )}
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-gray-700">
          {quantidade}x {formatarMoeda(valorParcela)}
        </p>

        <p className="mt-1 text-md text-gray-500">
          Total: {formatarMoeda(valorTotal)}
        </p>
      </div>
    </article>
  );
};

export default ParcelaCard;
