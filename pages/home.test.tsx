import React from 'react'
import { shallow } from 'enzyme';

import Home from './Home';
import Project from 'types/Project';

// ignore the CSS file in unit tests
jest.mock('../page.module.css', () => ({}));

describe('Home', () => {
  const mockProject: Project = {
    name: 'My Project',
    logo: 'logo1.png',
    floorPrice: 15.25
  };

  const props = {
    quantity: 3,
    project: mockProject,
    result: 155.25,
    errors: {
      project: false,
      quantity: false
    },
    onFormSubmit: jest.fn(),
    onProjectSelectChange: jest.fn(),
    onQuantityChange: jest.fn(),
    onResetClick: jest.fn()
  };

  it('should render properly based on props', () => {
    let rendered = shallow(<Home {...props} />);

    let inputField = rendered.find('[data-automation-id="field-quantity"]');
    expect(inputField.prop('value')).toBe(3);

    const resultSection = rendered.find('[data-automation-id="section-result"]')
    const result = resultSection.find('[data-automation-id="result-content"]');
    const resultText = result.text();
    expect(resultText).toContain(props.quantity.toString());
    expect(resultText).toContain(mockProject.name);
    expect(resultText).toContain((props.result.toString()));
  });

  it('should call the event handlers properly', () => {
    let rendered = shallow(<Home {...props} />);

    const projectSelect = rendered.find('Projects');
    projectSelect.simulate('change', mockProject);
    expect(props.onProjectSelectChange).toHaveBeenCalledTimes(1);

    let inputField = rendered.find('[data-automation-id="field-quantity"]');
    inputField.simulate('change');
    expect(props.onQuantityChange).toBeCalledTimes(1);

    const form = rendered.find('[data-automation-id="form-nft-projects"]');
    form.simulate('submit');
    expect(props.onFormSubmit).toBeCalledTimes(1);

    const resetButton = rendered.find('[data-automation-id="button-reset"]');
    expect(resetButton.text().toLowerCase()).toBe('reset');
    resetButton.simulate('click');
    expect(props.onResetClick).toBeCalledTimes(1);
  });

  it('should show form error messages', () => {
    const localProps = {
      ...props,
      errors: {
        project: true,
        quantity: true
      }
    };
    let rendered = shallow(<Home {...localProps} />);

    let projects = rendered.find('Projects');
    expect(projects.prop('isValid')).toBe(false);

    let projectErrorMessage = rendered.find('Projects + [data-automation-id="form-error-message"]');
    expect(projectErrorMessage.text()).toContain('field is required');

    let quantityErrorMessage = rendered.find('[data-automation-id="field-quantity"] + [data-automation-id="form-error-message"]');
    expect(quantityErrorMessage.text()).toContain('field is required');
  });
});
