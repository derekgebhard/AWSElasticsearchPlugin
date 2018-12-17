/**
 * index.test.js: Unit Tests for elasticsearch plugin class
 */

const EsPlugin = require('../../src/index.js');

function getServerlessMock() {
  const provider = {};
  provider.getStage = jest.fn().mockReturnValue('dev');
  const serverless = {};
  serverless.getProvider = jest.fn().mockReturnValue(provider);
  return serverless;
}

function getOptionsMock() {
  return {};
}

describe('Test Cases for Elasticsearch Plugin class', () => {
  test('Test Constructor', () => {
    const serverlessMock = getServerlessMock();
    const optionsMock = getOptionsMock();
    const plugin = new EsPlugin(serverlessMock, optionsMock);
    expect(serverlessMock.getProvider.mock.calls.length).toBe(1);
    expect(serverlessMock.getProvider.mock.calls[0][0]).toBe('aws');
    expect(plugin.serverless).toBe(serverlessMock);
    expect(plugin.options).toBe(optionsMock);
    expect(plugin.hooks).toBeDefined();
    expect(plugin.commands).toBeDefined();
  });
});
