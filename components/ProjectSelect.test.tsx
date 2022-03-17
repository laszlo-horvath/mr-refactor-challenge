import React from 'react'
import { act } from '@testing-library/react';
import { shallow } from 'enzyme';

import Projects from './ProjectSelect';

const mockProjects = [
  { logo: 'project1.png', name: 'Project 1', floorPrice: 50.55 },
  { logo: 'project2.png', name: 'Project 2', floorPrice: 150.12 },
  { logo: 'project3.png', name: 'Project 3', floorPrice: 31 },
];

// we need to mock fetch because Node JS doesn't know about it
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => mockProjects,
  })
);

describe('Project Select', () => {
  beforeEach(() => {
    // @ts-ignore
    fetch.mockClear();
  });

  const props = {
    onChange: jest.fn()
  };

  it('should render the loading state', () => {
    const rendered = shallow(<Projects {...props} />);

    const divs = rendered.find('div');
    expect(divs).toHaveLength(1);
    expect(divs.at(0).text().toLowerCase()).toContain('loading');
  });

  it('should render dropdown ', async () => {
    React.useEffect = jest.fn().mockImplementationOnce(cb => cb());

    let rendered: any;
    await act(() => {
      rendered = shallow(<Projects {...props} />);

      return Promise.resolve();
    });

    const options = rendered.find('Options Option');
    expect(options).toHaveLength(3);

    expect(options.at(0).find('img').prop('src')).toBe(mockProjects[0].logo);
    expect(options.at(0).find('img + div').text()).toBe(mockProjects[0].name);

    expect(options.at(2).find('img').prop('src')).toBe(mockProjects[2].logo);
    expect(options.at(2).find('img + div').text()).toBe(mockProjects[2].name);

    const listbox = rendered.find('Listbox');
    listbox.simulate('change', mockProjects[1]);
    rendered.update();

    const nftDispalyed = rendered.find('Listbox Button');
    expect(nftDispalyed.find('div').text()).toContain(mockProjects[1].name);
    expect(nftDispalyed.find('img').prop('src')).toBe(mockProjects[1].logo);
  });
});
