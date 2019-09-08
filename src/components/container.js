import React from 'react';

import Icon from './icons';
import Drawer from './drawer';

import { Scrollbars } from 'react-custom-scrollbars';

import marked from 'marked';

import CodeMirror from '@uiw/react-codemirror';

import 'codemirror/addon/selection/active-line';

import localSync from '../utils/localsync';

const __CONFIG = require('../config');

let scrollTimmer = null,
    isScroll = null;

let markdownTheme;

import(`../themes/${ __CONFIG.theme }/markdown/markdown.min`).then( ( json ) => {
    markdownTheme = json;
} );

import('../config.json').then( ( config ) => {
    
    import(`../themes/${ config.theme }/config.json`).then( ( json ) => {
        
        if( !global.Editor ){
            return ;
        }
        
        let list = localSync.get(),
            currentIdx = -1;
        
        list.forEach( ( item, idx ) => ( ( item.active ) && ( currentIdx = idx ) ) );
        
        global.Editor.setState({
            code:list[ currentIdx ] ? list[ currentIdx ].content : json.markdownPreview.join('\n')
        });
        
    } );
    
} );

const docGenerator = (title, theme, result) => {
    let string = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${ title }</title>
                <style>
                    ${ theme }
                </style>
            </head>
            <body>
                <div class="markdown-body">
                    ${ result }
                </div>
            </body>
        </html>
    `;
    
    return string;
}

const eval1 = (str) => {
    let script = document.createElement('script');
    
    script.type="text/javascript";
    script.text=str;
    document.getElementsByTagName('head')[0].appendChild(script);
    document.head.removeChild(document.head.lastChild);
}

class CodeEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            str:'icon-zuoyouduiqi',
            id:0
        };
        
        this.getCode = this.getCode.bind( this );
        this.onScroll = this.onScroll.bind( this );
        this.setFullScreen = this.setFullScreen.bind( this );
        this.update = this.update.bind( this );
        
    }
    
    componentDidMount(){
        
        global.Editor = this;
        
        let codemirrorObj = this.refs.codemirrorObj;
        
        //bind event
        codemirrorObj.editor.on('change', this.update);
        codemirrorObj.editor.options.scrollbarStyle = null;
    }
    
    getCode(){
        
        let codemirrorObj = this.refs.codemirrorObj;
        
        return codemirrorObj.editor.getValue();
        
    }
    
    update(){
        
        let code = this.getCode();
        
        global.Preview.update( code );
        
        this.setState({
            code:code
        });
        
        if( !global.DocList ){
            return ;
        }
        
        let lists = global.DocList.state.list || [],
            idx = this.state.id;
        
        for( let i = 0; i < lists.length; i++ ){
            ( lists[i].id === idx ) && ( lists[i].content = code );
        }
        
        global.DocList.setState({
            list:lists
        });
        
        localSync.set( lists );
    }
    
    scroll( target ){
        
        let scroller = this.refs['codeScroller'];
        
        scroller.scrollTop( target.top * ( scroller.getScrollHeight() - scroller.getClientHeight() ) );
        
    }
    
    onScroll( e ){
        
        if( isScroll === 'preview' ){
            return ;
        }
        
        clearTimeout( scrollTimmer );
        
        isScroll = 'code';
        
        scrollTimmer = setTimeout( () => {
            isScroll = null;
        }, 200 );
        
        let cur = ( this.refs.codeScroller.getValues() );
        
        if( !global.Preview ){
            return ;
        }
        
        global.Preview.scroll( cur );
        
    }
    
    setFullScreen(){
        
        let mode = global.container.state.mode,
            setVal = ( mode === 'split' ) ? 'code' : 'split',
            str = ( mode === 'split' ) ? 'icon-fenlan' : 'icon-zuoyouduiqi';
        
        global.container.setMode( setVal );
        
        this.setState({
            str:str
        });
        
    }
    
    render(){
        
        return (
            <div style={ this.props.style || '' } className="CodeEditor" onClick={ this.getCode }>
                <Scrollbars className="scroll" ref="codeScroller" onScroll={ this.onScroll }>
                    <CodeMirror
                      ref={'codemirrorObj'} 
                      width={'96%'} 
                      height={'auto'} 
                      value={ this.state.code } 
                      minHeight={'100%'} 
                      options={{
                        theme: 'ttcn',
                        keyMap: 'sublime',
                        mode: 'markdown',
                        htmlMode: 'raw',
                        lineWrapping: true,
                        styleActiveLine: true
                      }} 
                    />
                </Scrollbars>
                <div className="BIconWrap">
                    <div className={'BIcon btn'} onClick={ this.setFullScreen }>
                        <Icon size={17} icon={ this.state.str } />
                    </div>
                </div>
            </div>
        );
    }
}

class CodePreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            preview:'',
            str:'icon-zitiyulan'
        };
        
        this.onScroll = this.onScroll.bind( this );
        this.setFullScreen = this.setFullScreen.bind( this );
        this.resultEvent = this.resultEvent.bind( this );
    }

    componentDidMount(){
        global.Preview = this;
    }
    
    update( value ){
        this.setState({
            preview:value
        })
    }
    
    scroll( target ){
        
        let scroller = this.refs['previewScroller'];
        
        scroller.scrollTop( target.top * ( scroller.getScrollHeight() - scroller.getClientHeight() ) );
        
    }

    onScroll( e ){
        
        if( isScroll === 'code' ){
            return ;
        }
        
        clearTimeout( scrollTimmer );
        
        isScroll = 'preview';
        
        scrollTimmer = setTimeout( () => {
            isScroll = null;
        }, 200 );
        
        let cur = ( this.refs.previewScroller.getValues() );
        
        if( !global.Editor ){
            return ;
        }
        
        global.Editor.scroll( cur );
        
    }
    
    setFullScreen(){
        
        let mode = global.container.state.mode,
            setVal = ( mode === 'split' ) ? 'preview' : 'split',
            str = ( mode === 'split' ) ? 'icon-fenlan' : 'icon-zitiyulan';
        
        global.container.setMode( setVal );
        
        this.setState({
            str:str
        });
        
    }
    
    resultEvent(){
        
        //docGenerator
        let codemirrorObj = global.Editor.refs.codemirrorObj;
        let val = codemirrorObj.editor.getValue();
        
        let sourceCode = docGenerator('Untitle', markdownTheme.minify, marked( val ) );
        
        if( __CONFIG.result === 'export' ){
            eval1(__CONFIG.getResult);
            return global.getResult( sourceCode );
        }
        
        let eleLink = document.createElement('a');
        
        eleLink.download = 'preview.html';
        eleLink.style.display = 'none';
        
        var blob = new Blob([ sourceCode ]);
        eleLink.href = URL.createObjectURL(blob);
        
        document.body.appendChild(eleLink);
        eleLink.click();
        
        document.body.removeChild(eleLink);
    }
    
    render(){
        let result = {
            __html: marked( this.state.preview )
        };
        
        return (
            <div className="CodePreview" style={ this.props.style || '' }>
                <Scrollbars ref="previewScroller" className="scroll" onScroll={ this.onScroll }>
                    <div className="markdown-body" dangerouslySetInnerHTML={ result }></div>
                </Scrollbars>
                <div className="BIconWrap">
                    <div className={'BIcon btn'} onClick={ this.setFullScreen }>
                        <Icon size={17} icon={ this.state.str } />
                    </div>
                    <div className={'BIcon btn'} onClick={ this.resultEvent }>
                        <Icon size={17} icon={ ( __CONFIG.result === 'export' ? 'icon-icon_baocun' : 'icon-yunduanxiazai' ) } />
                    </div>
                </div>
            </div>
        );
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode:'split'
        };
    }
    
    componentDidMount(){
        global.container = this;
    }
    
    setMode( mode ){
        this.setState({
            mode: mode
        });
    }
    
    render(){
        
        let mode = this.state.mode,
            codeStyle = {},
            previewStyle = {};
        
        switch( mode ){
            
            case 'split' :
                
                codeStyle = {
                    width:'50%'
                };
                previewStyle = {
                    width:'50%'
                };
                
            break ;
                
            case 'code' :
                
                codeStyle = {
                    width:'100%'
                };
                previewStyle = {
                    width:'0%'
                };
                
            break ;
                
            case 'preview' :
                
                codeStyle = {
                    width:'0%'
                };
                previewStyle = {
                    width:'100%'
                };
                
            break ;
            
            default :
                
                codeStyle = {
                    width:'50%'
                };
                previewStyle = {
                    width:'50%'
                };
                
                break ;
        }
        
        return (
            <div className="Container">
                <CodeEditor style={ codeStyle } />
                <CodePreview style={ previewStyle } />
                <Drawer />
            </div>
        );
    }
}

export default Container;