import React from 'react';
import ReactDOM from 'react-dom';
import { calculate } from './math/calculate';
import { App } from './ui/app';

export const infty = 2 ** 31;

ReactDOM.render(<App calculate={calculate}/>, document.getElementById('root'));