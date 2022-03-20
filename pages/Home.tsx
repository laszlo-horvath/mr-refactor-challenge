import { FormEvent, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import ProjectSelect from '../components/ProjectSelectContainer';
import Project from 'types/Project';

import styles from '../page.module.css';

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

const FormError = <p className="mt-2 text-red-500">This field is required.</p>

const Home = (props: HomeProps) => {
  const { quantity, project, result, errors, onFormSubmit, onProjectSelectChange, onQuantityChange, onResetClick } = props;

  return (
    <div data-automation-id="home" className={`${styles.container} bg-slate-100 rounded-lg p-6`}>
      <h1 className="text-3xl font-semibold">NFT Floor Sweep Estimator</h1>
      <h2 className="pt-8 pb-4 font-medium">What NFT project do you want to buy?</h2>
      <form className="space-y-4" onSubmit={onFormSubmit}>
        <div>
          <label className="block mb-2">Choose project:</label>
          <ProjectSelect project={project} isValid={!errors.project} onChange={onProjectSelectChange} />
          {errors.project && FormError}
        </div>
        <div>
          <label className="block mb-2">How many items you want to buy?</label>
          <input
            placeholder="Enter a number..."
            type="number"
            min="1"
            value={quantity}
            onChange={onQuantityChange}
            className={classNames('border', 'border-gray-200', 'shadow-md', 'px-3', 'py-2', 'w-full', 'rounded-lg', 'h-12', { 'border-red-300': errors.quantity })}
          />
          {errors.quantity && FormError}
        </div>
        <button className="border border-green-300 bg-green-300 pl-2 pr-2 py-1 rounded font-medium" type="submit">
          Submit
        </button>
        <button
          className="border border-red-300 bg-red-300 pl-2 pr-2 py-1 rounded font-medium ml-4"
          onClick={onResetClick}
        >
          Reset
        </button>

        {result && project && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-2xl">Calculation result</h3>
            <Image
              src={project.logo}
              alt={project.name}
              width={128}
              height={128}
              className="rounded-xl z-10"
            />
            <div>
              To buy {quantity} NFTs from the <b>{project.name}</b> collection you will need at
              least {result} ETH <Image
                src="/eth.png"
                alt="ETH Logo"
                width={18}
                height={18}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
