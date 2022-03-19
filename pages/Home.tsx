import { FormEvent, ChangeEvent, MouseEvent } from 'react';
import ProjectSelect from '../components/ProjectSelectContainer';
import Project from 'types/Project';

import styles from '../page.module.css';

interface HomeProps {
  quantity: number;
  project: Project | undefined;
  result: number | undefined;
  onFormSubmit: (event: FormEvent) => void;
  onProjectSelectChange: (project: Project) => void;
  onQuantityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetClick: (event: MouseEvent) => void;
}

const Home = (props: HomeProps) => {
  const { quantity, project, result, onFormSubmit, onProjectSelectChange, onQuantityChange, onResetClick } = props;

  return (
    <div className={styles.container}>
      <div className="text-3xl font-semibold">NFT Floor Sweep Estimator</div>
      <div className="pt-8 pb-4 font-medium">What NFT project do you want to buy?</div>
      <form className="space-y-4" onSubmit={onFormSubmit}>
        <div>
          Choose project:
          <ProjectSelect onChange={onProjectSelectChange} />
        </div>
        <div>
          <div>How many items you want to buy?</div>
          <input
            type="text"
            value={quantity}
            onChange={onQuantityChange}
            className="border border-gray-200 px-3 py-2"
            width="400"
          />
        </div>
        <button className="border border-green-300 pl-2 pr-2 py-1 rounded font-medium">
          Submit
        </button>
        <button
          className="border border-red-300 pl-2 pr-2 py-1 rounded font-medium ml-4"
          onClick={onResetClick}
        >
          Reset
        </button>

        {result && project && (
          <div className="pt-16">
            <h3 className="font-semibold mb-2 text-2xl">Calculation result</h3>
            <div>
              To buy {quantity} NFTs from the <b>{project.name}</b> collection you will need at
              least {result} ETH.
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
