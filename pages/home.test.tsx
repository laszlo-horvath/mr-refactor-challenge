import React from 'react'
import { shallow } from 'enzyme';

import Home from './index';

// ignore the CSS file in unit tests
jest.mock('../page.module.css', () => ({}));

describe('Home', () => {
  it('should render & update component properly', async () => {
    let rendered = shallow(<Home />);

    const projectSelect = rendered.find('Projects');
    const mockProject = { logo: 'project1.png', name: 'Project 1', floorPrice: 50.55 };
    projectSelect.simulate('change', mockProject);

    const input = rendered.find('input[type="text"]');
    const quantity = 15;
    input.simulate('change', { target: { value: quantity.toString() } });

    const form = rendered.find('form');
    const preventDefaultMock = jest.fn();
    form.simulate('submit', { preventDefault: preventDefaultMock });
    expect(preventDefaultMock).toBeCalledTimes(1);

    const result = rendered.find('h3 + div');
    const resultText = result.text();
    expect(resultText).toContain(quantity.toString());
    expect(resultText).toContain(mockProject.name);
    expect(resultText).toContain((quantity * mockProject.floorPrice).toString());
  });
});
