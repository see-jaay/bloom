/**
 * @format
 */

// import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from '../../app.json';


import React from 'react';
import { createRoot } from 'react-dom/client';
import WebRoot from './Root';


const root = createRoot(document.getElementById('bloom_root'));
root.render(<WebRoot />);
