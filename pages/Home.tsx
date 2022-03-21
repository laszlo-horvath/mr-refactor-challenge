import { FormEvent, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import ProjectSelect from '../components/ProjectSelect/ProjectSelectContainer';
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

const FormError = (
  <p data-automation-id="form-error-message" className="text-red-500">
    This field is required.
  </p>
);

const Home = (props: HomeProps) => {
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
      className="max-w-screen-lg my-10 mx-auto bg-slate-100 rounded-lg p-6"
    >
      <section data-automation-id="section-form">
        <header>
          <h1 className="text-3xl mb-2 font-semibold">NFT Floor Sweep Estimator</h1>
          <h2 className="mt-4 mb-6 font-medium">What NFT project do you want to buy?</h2>
        </header>
        <form data-automation-id="form-nft-projects" className="space-y-4" onSubmit={onFormSubmit}>
          <section data-automation-id="section-content">
            <div data-automation-id="fieldset-projects" className="mb-4">
              <label htmlFor="projects" className="block mb-2">
                Choose project:
              </label>
              <ProjectSelect
                project={project}
                isValid={!errors.project}
                onChange={onProjectSelectChange}
              />
              {errors.project && FormError}
            </div>
            <div data-automation-id="fieldset-quantity" className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
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
                  { 'border-red-300': errors.quantity }
                )}
              />
              {errors.quantity && FormError}
            </div>
          </section>
          <footer data-automation-id="footer">
            <button
              data-automation-id="button-submit"
              type="submit"
              className="border border-green-300 bg-green-300 pl-2 pr-2 py-1 rounded font-medium"
            >
              Submit
            </button>
            <button
              data-automation-id="button-reset"
              className="border border-red-300 bg-red-300 pl-2 pr-2 py-1 rounded font-medium ml-4"
              onClick={onResetClick}
            >
              Reset
            </button>
          </footer>
        </form>
      </section>
      {result && project && (
        <section data-automation-id="section-result" className="mt-6">
          <h3 className="font-semibold mb-2 text-2xl">Calculation result</h3>
          <Image
            src={project.logo}
            alt={project.name}
            width={128}
            height={128}
            className="rounded-xl z-10"
          />
          <p data-automation-id="result-content">
            To buy {quantity} NFTs from the <b>{project.name}</b> collection you will need at least{' '}
            {result} ETH <Image src="/eth.png" alt="ETH Logo" width={18} height={18} />
          </p>
        </section>
      )}
    </div>
  );
};

export default Home;
