import React from 'react';

import Topbar from './components/topbar';
import Container from './components/container';
import Preload from './components/preload';
import Dialog from './components/dialog';

//import css additional
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ttcn.css';

const __CONFIG = require('./config.json');

import(`./themes/${ __CONFIG.theme }/webfont/brelaregular.css`);
import(`./themes/${ __CONFIG.theme }/iconfont/iconfont.css`);
import(`./themes/${ __CONFIG.theme }/markdown/markdown.css`);

import(`./themes/${ __CONFIG.theme }/style.less`).then( () => {
    setTimeout( global.Preload.close.bind( global.Preload ), 300 );
} );

function App() {
  return (
    <div className="App">
        <Topbar />
        <Container />
        <Dialog />
        <Preload />
    </div>
  );
}

export default App;
