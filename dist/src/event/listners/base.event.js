"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    constructor(data) {
        this.data = data;
    }
    toString() {
        return JSON.stringify({
            data: this.data,
        });
    }
    toJSON() {
        return this.data;
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base.event.js.map