import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { act } from '@testing-library/react';

import Project from 'types/Project';
import HomeContainer from './index';

describe('Home Container', () => {
  it('should pass defaults as props', () => {
    const rendered = shallow(<HomeContainer />);
    const Home = rendered.find('Home');

    expect(Home.prop('quantity')).toEqual(1);
    expect(Home.prop('project')).toEqual(undefined);
    expect(Home.prop('result')).toEqual(undefined);
    expect(Home.prop('errors')).toEqual({ quantity: false, project: false });
    expect(Home.prop('onFormSubmit')).toBeInstanceOf(Function);
    expect(Home.prop('onProjectSelectChange')).toBeInstanceOf(Function);
    expect(Home.prop('onQuantityChange')).toBeInstanceOf(Function);
    expect(Home.prop('onResetClick')).toBeInstanceOf(Function);
  });

  it('should set project & quantity then calculate the result and reset', async () => {
    let rendered: unknown;
    await act(() => {
      rendered = shallow(<HomeContainer />);

      return Promise.resolve();
    });
    const Home = (rendered as ShallowWrapper).find('Home');

    const onFormSubmitHandler: EventHandler = Home.prop('onFormSubmit');
    const eventMockObject = { preventDefault: jest.fn() };
    onFormSubmitHandler(eventMockObject);
    expect(eventMockObject.preventDefault).toHaveBeenCalledTimes(1);

    const HomeWithErrors = (rendered as ShallowWrapper).find('Home');
    expect(HomeWithErrors.prop('errors')).toEqual({ quantity: false, project: true });

    const onProjectSelectChange: (project: Project) => void = Home.prop('onProjectSelectChange');
    const mockProject: Project = {
      name: 'My Project',
      logo: 'logo1.png',
      floorPrice: 15.25
    };
    onProjectSelectChange(mockProject);

    const HomeUpdatedWithProject = (rendered as ShallowWrapper).find('Home');
    expect(HomeUpdatedWithProject.prop('project')).toEqual(mockProject);
    expect(HomeUpdatedWithProject.prop('result')).toEqual(undefined);

    type EventHandler = (event: Object) => void;
    const onQuantityChange: EventHandler = HomeUpdatedWithProject.prop('onQuantityChange');
    const mockChangeEvent = { target: { value: 12.25 } };
    onQuantityChange(mockChangeEvent);

    const HomeUpdatedWithQuantity = (rendered as ShallowWrapper).find('Home');
    expect(HomeUpdatedWithQuantity.prop('quantity')).toEqual(12);
    expect(HomeUpdatedWithQuantity.prop('result')).toEqual(undefined);

    const onFormSubmit: EventHandler = HomeUpdatedWithQuantity.prop('onFormSubmit');
    const eventMock = { preventDefault: jest.fn() };
    onFormSubmit(eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);

    const HomeWithoutErrors = (rendered as ShallowWrapper).find('Home');
    expect(HomeWithoutErrors.prop('errors')).toEqual({ quantity: false, project: false });

    const HomeUpdatedWithResult = (rendered as ShallowWrapper).find('Home');
    expect(HomeUpdatedWithResult.prop('result')).toEqual(15.25 * 12);

    const onResetClick: EventHandler = HomeUpdatedWithResult.prop('onResetClick');
    const mockMouseEvent = { preventDefault: jest.fn() };
    onResetClick(mockMouseEvent);
    expect(mockMouseEvent.preventDefault).toHaveBeenCalledTimes(1);

    const HomeReset = (rendered as ShallowWrapper).find('Home');
    expect(HomeReset.prop('quantity')).toEqual(1);
    expect(HomeReset.prop('project')).toEqual(undefined);
    expect(HomeReset.prop('result')).toEqual(undefined);
  });

  it('should set quantity to empty string if become isNaN', () => {
    const rendered = shallow(<HomeContainer />);
    const Home = rendered.find('Home');

    type EventHandler = (event: Object) => void;
    const onQuantityChange: EventHandler = Home.prop('onQuantityChange');
    const mockChangeEvent = { target: { value: 'not a number' } };
    onQuantityChange(mockChangeEvent);

    const HomeUpdated = rendered.find('Home');
    expect(HomeUpdated.prop('quantity')).toEqual('');
  });
});
