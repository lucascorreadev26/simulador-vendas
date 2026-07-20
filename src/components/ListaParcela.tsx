import fatoresParcelas from "../data/fatoresParcelas";
import ParcelaCard from "./ParcelaCard";

type ListaParcelaProduto = {
  valorDoProduto: number;
};

const ListaParcela = ({ valorDoProduto }: ListaParcelaProduto) => {
  return (
    <div className=" px-4 py-3 bg-white shadow-sm mt-8">
      {fatoresParcelas.map((parcela) => {
        const valorParcela = valorDoProduto * parcela.fator;

        const valorTotal = valorParcela * parcela.quantidade;

        return (
            <ParcelaCard
              key={parcela.quantidade}
              quantidade={parcela.quantidade}
              valorParcela={valorParcela}
              valorTotal={valorTotal}
            />
        );
      })}
    </div>
  );
};

export default ListaParcela;
