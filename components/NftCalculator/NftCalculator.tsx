import { FormEvent, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import ProjectSelect from './../ProjectSelect/ProjectSelectContainer';
import { FormError } from './../Form/FormError';
import Project from 'types/Project';

interface HomeProps {
  quantity: number;
  project: Project | undefined;
  result: number | undefined;
  errors: {
    project: boolean;
    quantity: boolean;
  };
  onFormSubmit: (event: FormEvent) => void;
  onProjectSelectChange: (project: Project) => void;
  onQuantityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetClick: (event: MouseEvent) => void;
}

const NftCalculator = (props: HomeProps) => {
  const {
    quantity,
    project,
    result,
    errors,
    onFormSubmit,
    onProjectSelectChange,
    onQuantityChange,
    onResetClick,
  } = props;

  return (
    <div
      data-automation-id="home"
      className="max-w-screen-lg my-10 p-6 mx-auto bg-slate-800 rounded-xl shadow-lg ring-1 ring-white/10 ring-inset text-center"
    >
      <section data-automation-id="section-form">
        <header>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">NFT Floor Sweep Estimator</h1>
          <h2 className="mt-2 mb-4 text-lg text-slate-400">What NFT project do you want to buy?</h2>
        </header>
        <form data-automation-id="form-nft-projects" className="space-y-4" onSubmit={onFormSubmit}>
          <section data-automation-id="section-content">
            <div data-automation-id="fieldset-projects" className="mb-4">
              <label htmlFor="projects" className="block mb-2 text-slate-400">
                Choose project:
              </label>
              <ProjectSelect
                project={project}
                isValid={!errors.project}
                onChange={onProjectSelectChange}
              />
              {errors.project && <FormError />}
            </div>
            <div data-automation-id="fieldset-quantity" className="mb-4">
              <label htmlFor="quantity" className="block mb-2 text-slate-400">
                How many items you want to buy?
              </label>
              <input
                data-automation-id="field-quantity"
                id="quantity"
                name="quantity"
                placeholder="Enter a number..."
                type="number"
                min="1"
                value={quantity}
                onChange={onQuantityChange}
                className={classNames(
                  'border',
                  'border-gray-200',
                  'shadow-md',
                  'px-3',
                  'py-2',
                  'w-full',
                  'rounded-lg',
                  'h-12',
                  'w-80',
                  { 'border-4 border-red-300': errors.quantity }
                )}
              />
              {errors.quantity && <FormError />}
            </div>
          </section>
          <footer data-automation-id="footer">
            <button
              data-automation-id="button-submit"
              type="submit"
              className="border border-indigo-500 bg-indigo-500 text-white px-6 py-3 rounded font-medium"
            >
              Submit
            </button>
            <button
              data-automation-id="button-reset"
              className="border border-red-500 bg-red-500 text-white px-6 py-3 rounded font-medium ml-4"
              onClick={onResetClick}
            >
              Reset
            </button>
          </footer>
        </form>
      </section>
      {result && project && (
        <section data-automation-id="section-result" className="mt-6">
          <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">Calculation result</h3>
          <Image
            src={project.logo}
            alt={project.name}
            width={128}
            height={128}
            className="rounded-xl z-10"
          />
          <p data-automation-id="result-content" className="mt-2 mb-4 text-lg text-slate-400">
            To buy {quantity} NFTs from the <b className="text-indigo-500">{project.name}</b> collection you will need at least{' '}
            <b className="text-indigo-500">{result} ETH </b><Image src="/eth.png" alt="ETH Logo" width={18} height={18} />
          </p>
        </section>
      )}
    </div>
  );
};

export default NftCalculator;
