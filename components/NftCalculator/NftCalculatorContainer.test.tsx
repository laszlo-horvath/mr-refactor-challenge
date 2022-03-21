import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { act } from '@testing-library/react';

import Project from 'types/Project';
import NftCalculatorContainer from './NftCalculatorContainer';

describe('Nft Calculator Container', () => {
  it('should pass defaults as props', () => {
    const rendered = shallow(<NftCalculatorContainer />);
    const NftCalculator = rendered.find('NftCalculator');

    expect(NftCalculator.prop('quantity')).toEqual(1);
    expect(NftCalculator.prop('project')).toEqual(undefined);
    expect(NftCalculator.prop('result')).toEqual(undefined);
    expect(NftCalculator.prop('errors')).toEqual({ quantity: false, project: false });
    expect(NftCalculator.prop('onFormSubmit')).toBeInstanceOf(Function);
    expect(NftCalculator.prop('onProjectSelectChange')).toBeInstanceOf(Function);
    expect(NftCalculator.prop('onQuantityChange')).toBeInstanceOf(Function);
    expect(NftCalculator.prop('onResetClick')).toBeInstanceOf(Function);
  });

  it('should set project & quantity then calculate the result and reset', async () => {
    let rendered: unknown;
    await act(() => {
      rendered = shallow(<NftCalculatorContainer />);

      return Promise.resolve();
    });
    const NftCalculator = (rendered as ShallowWrapper).find('NftCalculator');

    const onFormSubmitHandler: EventHandler = NftCalculator.prop('onFormSubmit');
    const eventMockObject = { preventDefault: jest.fn() };
    onFormSubmitHandler(eventMockObject);
    expect(eventMockObject.preventDefault).toHaveBeenCalledTimes(1);

    const NftCalculatorWithErrors = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorWithErrors.prop('errors')).toEqual({ quantity: false, project: true });

    const onProjectSelectChange: (project: Project) => void = NftCalculator.prop('onProjectSelectChange');
    const mockProject: Project = {
      name: 'My Project',
      logo: 'logo1.png',
      floorPrice: 15.25
    };
    onProjectSelectChange(mockProject);

    const NftCalculatorWithProject = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorWithProject.prop('project')).toEqual(mockProject);
    expect(NftCalculatorWithProject.prop('result')).toEqual(undefined);

    type EventHandler = (event: Object) => void;
    const onQuantityChange: EventHandler = NftCalculatorWithProject.prop('onQuantityChange');
    const mockChangeEvent = { target: { value: 12.25 } };
    onQuantityChange(mockChangeEvent);

    const NftCalculatorWithQuantity = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorWithQuantity.prop('quantity')).toEqual(12);
    expect(NftCalculatorWithQuantity.prop('result')).toEqual(undefined);

    const onFormSubmit: EventHandler = NftCalculatorWithQuantity.prop('onFormSubmit');
    const eventMock = { preventDefault: jest.fn() };
    onFormSubmit(eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);

    const NftCalculatorWithoutErrors = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorWithoutErrors.prop('errors')).toEqual({ quantity: false, project: false });

    const NftCalculatorWithResult = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorWithResult.prop('result')).toEqual(15.25 * 12);

    const onResetClick: EventHandler = NftCalculatorWithResult.prop('onResetClick');
    const mockMouseEvent = { preventDefault: jest.fn() };
    onResetClick(mockMouseEvent);
    expect(mockMouseEvent.preventDefault).toHaveBeenCalledTimes(1);

    const NftCalculatorReset = (rendered as ShallowWrapper).find('NftCalculator');
    expect(NftCalculatorReset.prop('quantity')).toEqual(1);
    expect(NftCalculatorReset.prop('project')).toEqual(undefined);
    expect(NftCalculatorReset.prop('result')).toEqual(undefined);
  });

  it('should set quantity to empty string if become isNaN', () => {
    const rendered = shallow(<NftCalculatorContainer />);
    const NftCalculator = rendered.find('NftCalculator');

    type EventHandler = (event: Object) => void;
    const onQuantityChange: EventHandler = NftCalculator.prop('onQuantityChange');
    const mockChangeEvent = { target: { value: 'not a number' } };
    onQuantityChange(mockChangeEvent);

    const NftCalculatorUpdated = rendered.find('NftCalculator');
    expect(NftCalculatorUpdated.prop('quantity')).toEqual('');
  });
});
