/**
 * @jest-environment jsdom
 */

import React from 'react'
import { shallow, mount } from 'enzyme';

import ProjectSelect from './ProjectSelect';
import { mockProjects } from './projectFixtures';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: (image: Image) => {
    return `${image.alt} Image Stub`;
  }
}));

describe('Project Select', () => {
  it('should render the loading state', () => {
    const props = {
      isLoading: true,
      project: undefined,
      projects: [],
      isValid: false,
      onListboxChange: jest.fn()
    };

    const rendered = shallow(<ProjectSelect {...props} />);

    const divs = rendered.find('div');
    expect(divs).toHaveLength(1);
    expect(divs.at(0).text().toLowerCase()).toContain('loading');
  });

  it('should render the empty dropdown', () => {
    const props = {
      isLoading: false,
      project: undefined,
      projects: [],
      isValid: true,
      onListboxChange: jest.fn()
    };

    const rendered = mount(<ProjectSelect {...props} />);

    const listbox = rendered.find('Listbox Button div');
    expect(listbox.text().toLowerCase()).toContain('select one');
  });

  it('should render the dropdown with content based on props', () => {
    const props = {
      isLoading: false,
      isValid: true,
      project: mockProjects[1],
      projects: mockProjects,
      onListboxChange: jest.fn()
    };

    let rendered = mount(<ProjectSelect {...props} />);

    const listbox = rendered.find('Listbox Button');
    listbox.simulate('click');

    const options = rendered.find('Options Option');
    expect(options).toHaveLength(3);

    expect(options.at(0).find('default').prop('src')).toBe(mockProjects[0].logo);
    expect(options.at(0).find('default + div').text()).toBe(mockProjects[0].name);

    expect(options.at(2).find('default').prop('src')).toBe(mockProjects[2].logo);
    expect(options.at(2).find('default + div').text()).toBe(mockProjects[2].name);

    const nftDispalyed = rendered.find('Listbox Button');
    expect(nftDispalyed.find('default').prop('src')).toBe(mockProjects[1].logo);
    expect(nftDispalyed.find('default + label').text()).toContain(mockProjects[1].name);
  });

  it('should handle Listbox\'s change event', () => {
    const props = {
      isLoading: false,
      isValid: true,
      project: mockProjects[1],
      projects: [],
      onListboxChange: jest.fn()
    };

    let rendered = shallow(<ProjectSelect {...props} />);

    const listbox = rendered.find('Listbox');
    listbox.simulate('change', mockProjects[1]);
    expect(props.onListboxChange).toHaveBeenCalledTimes(1);
  });

  it('should have border for invalid state based on prop', () => {
    const props = {
      isLoading: false,
      isValid: false,
      project: undefined,
      projects: [],
      onListboxChange: jest.fn()
    };

    let rendered = mount(<ProjectSelect {...props} />);

    const listboxButton = rendered.find('Listbox Button');
    expect(listboxButton.hasClass('border-red-300')).toBe(true);
  });
});
