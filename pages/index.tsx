import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ProjectSelect from '../components/ProjectSelect';
import styles from '../page.module.css';

const Home = () => {
  const [quantity, setQuantity] = useState(1);
  const [project, setProject] = useState();
  const [result, setResult] = useState();

  const onSubmit = event => {
    event.preventDefault();
    setResult(project.floorPrice * quantity);
  };

  return (
    <div className={styles.container}>
      <div className="text-3xl font-semibold">NFT Floor Sweep Estimator</div>
      <div className="pt-8 pb-4 font-medium">What NFT project do you want to buy?</div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          Choose project:
          <ProjectSelect
            onChange={project => {
              setProject(project);
              setResult(undefined);
            }}
          />
        </div>
        <div>
          <div>How many items you want to buy?</div>
          <input
            type="text"
            value={quantity}
            onChange={e => {
              setQuantity(e.target.value);
              setResult(undefined);
            }}
            className="border border-gray-200 px-3 py-2"
            width="400"
          />
        </div>
        <button className="border border-green-300 pl-2 pr-2 py-1 rounded font-medium">
          Submit
        </button>
        <button
          className="border border-red-300 pl-2 pr-2 py-1 rounded font-medium ml-4"
          onClick={e => {
            console.log('Clicked');
            e.preventDefault();
            setQuantity(1);
            setProject(undefined);
            setResult(undefined);
          }}
        >
          Reset
        </button>

        {result && (
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
