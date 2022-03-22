import EthPrices from './../components/EthPrices/EthPrices';

export default function Header() {
    return (
      <div className="fixed top-0 left-0 right-0 bg-slate-700 z-50 font-light text-sm text-slate-600 shadow-lg p-4 flex flex-col items-center sm:flex-row sm:justify-between">
        <span className="text-white font-bold"><span className="inline-block text-indigo-300 font-semibold">NFT</span> Challenge</span>

        <EthPrices />
      </div>
    )
  };
