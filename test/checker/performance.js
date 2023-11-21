// performanceTest.js
const { performance } = require('perf_hooks');
const assert = require('assert');
const Checker = require('../../src/checker');

describe('Performance Checker', () => {

    const testPerformance = (func, arg) => {
        const startTime = performance.now();
        for (let i = 0; i < 1000000; i++) {
            func(arg);
        }
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        it(`Does not allow execution more than 1 second for ${func.name}`, () => {
            console.log(`Execution time for ${func.name}: ${executionTime} milliseconds`);
            assert(executionTime < 1000, `${func.name} took more than 1 second to execute.`);
        })
    }

    const testValue = 'test';
    testPerformance(Checker.isFunction, testValue);
    testPerformance(Checker.isDefined, testValue);
    testPerformance(Checker.isArray, testValue);
    testPerformance(Checker.isArrayWithType, testValue);
    testPerformance(Checker.isIterable, testValue);
    testPerformance(Checker.isArrayWithTypeValid, testValue);
    testPerformance(Checker.isString, testValue);
    testPerformance(Checker.isBoolean, testValue);


})

