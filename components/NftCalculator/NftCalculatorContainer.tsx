import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import NftCalculator from './NftCalculator';
import Project from 'types/Project';

const DEFAULT_QUANTITY = 1;

const NftCalculatorContainer = () => {
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [project, setProject] = useState<Project>();
  const [result, setResult] = useState<number>();
  const [errors, setFormErrors] = useState({ quantity: false, project: false });

  if (isNaN(quantity)) {
    // @ts-ignore
    setQuantity('');
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFormErrors({
      ...errors,
      quantity: !quantity,
      project: !project
    });

    if (project && quantity) {
      const parsedResult = Math.floor(project.floorPrice * quantity);
      setResult(parsedResult);
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
    <NftCalculator
      quantity={quantity}
      project={project}
      result={result}
      errors={errors}
      onFormSubmit={onFormSubmit}
      onProjectSelectChange={onProjectSelectChange}
      onQuantityChange={onQuantityChange}
      onResetClick={onResetClick}
    />
  );
};

export default NftCalculatorContainer;
