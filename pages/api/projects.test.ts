import projectsHandler from './projects';

describe('API/projects', () => {
  it('should return data properly', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const jsonMock = jest.fn(data => data);
    const statusMock = jest.fn(() => ({
        json: jsonMock
    }));

    const mockRequest = {};
    const mockResponse = {
        status: statusMock
    };
    projectsHandler(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(200);

    expect(jsonMock).toBeCalledTimes(1);
    expect(jsonMock.mock.calls[0][0].length).toBe(7);

    expect(consoleSpy).toBeCalledTimes(2);
    expect(consoleSpy.mock.calls[0][0]).toBe('API start');
    expect(consoleSpy.mock.calls[1][0]).toBe('END API response');
  });
})
