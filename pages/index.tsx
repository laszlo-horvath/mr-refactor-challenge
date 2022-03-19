import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import Home from './Home';
import Project from 'types/Project';

const DEFAULT_QUANTITY = 1;

const HomeContainer = () => {
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [project, setProject] = useState<Project>();
  const [result, setResult] = useState<number>();

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (project) {
      setResult(project.floorPrice * quantity);
    }
  };

  const onProjectSelectChange = (project: Project) => {
    setProject(project);
    setResult(undefined);
  };

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(event.target.value);
    setQuantity(parsed);
    setResult(undefined);
  };

  const onResetClick = (event: MouseEvent) => {
    event.preventDefault();

    setQuantity(DEFAULT_QUANTITY);
    setProject(undefined);
    setResult(undefined);
  };

  return (
    <Home
      quantity={quantity}
      project={project}
      result={result}
      onFormSubmit={onFormSubmit}
      onProjectSelectChange={onProjectSelectChange}
      onQuantityChange={onQuantityChange}
      onResetClick={onResetClick}
    />
  );
};

export default HomeContainer;
