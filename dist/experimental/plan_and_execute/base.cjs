"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainStepExecutor = exports.LLMPlanner = exports.ListStepContainer = exports.BaseStepContainer = exports.BaseStepExecutor = exports.BasePlanner = void 0;
class BasePlanner {
}
exports.BasePlanner = BasePlanner;
class BaseStepExecutor {
}
exports.BaseStepExecutor = BaseStepExecutor;
class BaseStepContainer {
}
exports.BaseStepContainer = BaseStepContainer;
class ListStepContainer extends BaseStepContainer {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addStep(action, result) {
        this.steps.push({ action, result });
    }
    getSteps() {
        return this.steps;
    }
    getFinalResponse() {
        return this.steps[this.steps.length - 1]?.result?.response;
    }
}
exports.ListStepContainer = ListStepContainer;
class LLMPlanner extends BasePlanner {
    constructor(llmChain, outputParser) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: llmChain
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: outputParser
        });
    }
    async plan(inputs, runManager) {
        const output = await this.llmChain.run(inputs, runManager);
        return this.outputParser.parse(output);
    }
}
exports.LLMPlanner = LLMPlanner;
class ChainStepExecutor extends BaseStepExecutor {
    constructor(chain) {
        super();
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: chain
        });
    }
    async step(inputs, runManager) {
        const chainResponse = await this.chain.call(inputs, runManager);
        return { response: chainResponse.output };
    }
}
exports.ChainStepExecutor = ChainStepExecutor;
