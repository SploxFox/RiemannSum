import { ValFn } from "./fn-builder";

export function leftRiemann(from: number, to: number, numberOfRectangles: number, fn: ValFn): ValFn {
    const dt = numberOfRectangles / (to - from);
    return x => {
        let sum = 0;
        for (let i = 0; i < numberOfRectangles; i++) {
            let t = i * numberOfRectangles * dt + from;
            sum += fn(t) * dt;
        }
        return sum;
    }
}