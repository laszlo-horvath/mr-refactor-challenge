import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { act } from '@testing-library/react';

import Project from 'types/Project';
import ProjectsContainer from './ProjectSelectContainer';
import { mockProjects } from './projectFixtures';

// we need to mock fetch because Node JS doesn't know about it
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => mockProjects,
  })
);

describe('Project Select Container', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch.mockClear();
  });

  const props = {
    project: mockProjects[0],
    isValid: false,
    onChange: () => {}
  };

  it('should pass defaults as props', () => {
    const rendered = shallow(<ProjectsContainer {...props} />);
    const ProjectSelect = rendered.find('ProjectSelect');

    expect(ProjectSelect.prop('project')).toEqual(mockProjects[0]);
    expect(ProjectSelect.prop('projects')).toEqual([]);
    expect(ProjectSelect.prop('isLoading')).toEqual(true);
    expect(ProjectSelect.prop('isValid')).toEqual(false);
    expect(ProjectSelect.prop('onListboxChange')).toBeInstanceOf(Function);
  });

  it('should fetch data and pass them as props', async () => {
    React.useEffect = jest.fn().mockImplementationOnce(cb => cb());

    let rendered: unknown;
    await act(() => {
      rendered = shallow(<ProjectsContainer {...props} />);

      return Promise.resolve();
    });

    const ProjectSelect = (rendered as ShallowWrapper).find('ProjectSelect');
    expect(ProjectSelect.prop('projects')).toHaveLength(mockProjects.length);
    expect(ProjectSelect.prop('projects')).toEqual(mockProjects);
    expect(ProjectSelect.prop('isLoading')).toEqual(false);
  });

  it('should call the proper functions through onChange', async () => {
    const localProps = {
      ...props,
      onChange: jest.fn()
    };

    let rendered: unknown;
    await act(() => {
      rendered = shallow(<ProjectsContainer {...localProps} />);

      return Promise.resolve();
    });

    const ProjectSelect = (rendered as ShallowWrapper).find('ProjectSelect');

    const onChange: (project: Project) => void = ProjectSelect.prop('onListboxChange');
    onChange(mockProjects[1]);

    expect(localProps.onChange).toHaveBeenCalledTimes(1);
  });
});
