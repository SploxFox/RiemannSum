/// <reference types="react" />
interface Props {
    toSlider?: (num: number) => number;
    fromSlider?: (num: number) => number;
    onChange: (val: number) => void;
    label?: string;
    value: number;
}
export declare function NumberSlider(props: Props): JSX.Element;
export {};
//# sourceMappingURL=number-slider.d.ts.map