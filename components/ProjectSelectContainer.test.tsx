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
    onChange: jest.fn()
  };

  it('should pass defaults as props', () => {
    const rendered = shallow(<ProjectsContainer {...props} />);
    const ProjectSelect = rendered.find('ProjectSelect');

    expect(ProjectSelect.prop('project')).toEqual(undefined);
    expect(ProjectSelect.prop('projects')).toEqual([]);
    expect(ProjectSelect.prop('isLoading')).toEqual(true);
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

  it('should call the proper functions through onListboxChange', async () => {
    let rendered: unknown;
    await act(() => {
      rendered = shallow(<ProjectsContainer {...props} />);

      return Promise.resolve();
    });

    const ProjectSelect = (rendered as ShallowWrapper).find('ProjectSelect');

    const onListboxChange: (project: Project) => void = ProjectSelect.prop('onListboxChange');
    onListboxChange(mockProjects[1]);

    const ProjectSelectUpdated = (rendered as ShallowWrapper).find('ProjectSelect');

    const project: Project = ProjectSelectUpdated.prop('project');
    expect(project.name).toEqual(mockProjects[1].name);
    expect(project.logo).toEqual(mockProjects[1].logo);
    expect(project.floorPrice).toEqual(mockProjects[1].floorPrice);
  });
});
