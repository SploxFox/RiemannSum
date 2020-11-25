import React from 'react';
import ReactDOM from 'react-dom';
import { calculate } from './math/calculate';
import { App } from './ui/app';



ReactDOM.render(<App calculate={calculate}/>, document.getElementById('root'));