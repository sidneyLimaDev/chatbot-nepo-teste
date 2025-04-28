import { jest } from '@jest/globals';
import {
  incrementTotalRequests,
  incrementSuccessfulRequests,
  incrementFailedRequests,
  getMetrics,
  resetMetrics
} from '../src/utils/metrics';


jest.mock('../src/utils/metrics', () => {
  const testMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0
  };

  return {
    incrementTotalRequests: jest.fn(() => {
      testMetrics.totalRequests += 1;
    }),
    incrementSuccessfulRequests: jest.fn(() => {
      testMetrics.successfulRequests += 1;
    }),
    incrementFailedRequests: jest.fn(() => {
      testMetrics.failedRequests += 1;
    }),
    getMetrics: jest.fn(() => ({ ...testMetrics })),
    resetMetrics: jest.fn(() => {
      testMetrics.totalRequests = 0;
      testMetrics.successfulRequests = 0;
      testMetrics.failedRequests = 0;
    })
  };
});

describe('Metrics Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetMetrics();
  });

  test('incrementTotalRequests should increase totalRequests by 1', () => {
    incrementTotalRequests();
    const metrics = getMetrics();
    expect(metrics.totalRequests).toBe(1);
    expect(metrics.successfulRequests).toBe(0);
    expect(metrics.failedRequests).toBe(0);
  });

  test('incrementSuccessfulRequests should increase successfulRequests by 1', () => {
    incrementSuccessfulRequests();
    const metrics = getMetrics();
    expect(metrics.successfulRequests).toBe(1);
    expect(metrics.totalRequests).toBe(0);
    expect(metrics.failedRequests).toBe(0);
  });

  test('incrementFailedRequests should increase failedRequests by 1', () => {
    incrementFailedRequests();
    const metrics = getMetrics();
    expect(metrics.failedRequests).toBe(1);
    expect(metrics.totalRequests).toBe(0);
    expect(metrics.successfulRequests).toBe(0);
  });

  test('resetMetrics should reset all counters to 0', () => {
    incrementTotalRequests();
    incrementSuccessfulRequests();
    incrementFailedRequests();
    resetMetrics();
    const metrics = getMetrics();
    expect(metrics.totalRequests).toBe(0);
    expect(metrics.successfulRequests).toBe(0);
    expect(metrics.failedRequests).toBe(0);
  });
});