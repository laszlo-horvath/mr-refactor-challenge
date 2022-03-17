import nftsHandler from './nfts';

describe('API/nfts', () => {
  it('should return no data without collection query', () => {
    const jsonMock = jest.fn(data => data);
    const statusMock = jest.fn(() => ({
        json: jsonMock
    }));

    const mockRequest = {
      query: {}
    };
    const mockResponse = {
        status: statusMock
    };
    nftsHandler(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(404);

    expect(jsonMock).toBeCalledTimes(1);
    expect(jsonMock.mock.calls[0][0]).toEqual([]);
  });

  it('should return data properly', () => {
    const jsonMock = jest.fn(data => data);
    const statusMock = jest.fn(() => ({
        json: jsonMock
    }));

    const mockRequest = {
      query: {
        collection: 'My Collection Name'
      }
    };
    const mockResponse = {
        status: statusMock
    };
    nftsHandler(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(200);

    expect(jsonMock).toBeCalledTimes(1);

    const mockFirstCallParams = jsonMock.mock.calls[0][0];
    expect(mockFirstCallParams.length).toBeGreaterThanOrEqual(10);
    expect(mockFirstCallParams.length).toBeLessThanOrEqual(20);

    const response1 = mockFirstCallParams[0];
    expect(response1.id).toEqual('nft_0');
    expect(response1.name).toEqual('My Collection Name #1');
    expect(response1.imageUrl).toBeDefined();
    expect(response1.price).toBeDefined();
    expect(response1.currency).toBeDefined();

    const response10 = mockFirstCallParams[9];
    expect(response10.id).toEqual('nft_9');
    expect(response10.name).toEqual('My Collection Name #10');
    expect(response10.imageUrl).toBeDefined();
    expect(response10.price).toBeDefined();
    expect(response10.currency).toBeDefined()
  });
})
