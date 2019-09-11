import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import CodeMirror from '@uiw/react-codemirror';

import 'codemirror/addon/selection/active-line';

class Textarea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code:''
        };
        
        this.update = this.update.bind( this );
    }
    
    componentDidMount(){
        let codemirrorObj = this.refs.insertCode;
        
        codemirrorObj.editor.on('change', this.update);
        
        this.props.getTextarea.call(this);
    }
    
    getCode(){
        let codemirrorObj = this.refs.insertCode;
        
        return codemirrorObj.editor.getValue();
    }
    
    update() {
        let code = this.getCode();
        
        this.setState({
            code:code
        });
    }
    
    render(){
        return (
            <div className="codeWrap">
                <Scrollbars ref={'scroll'}>
                    <CodeMirror
                      className="CodeInsert" 
                      ref={'insertCode'} 
                      width={'98%'} 
                      margin={'0'} 
                      height={'auto'} 
                      value={ this.state.code } 
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
            </div>
        );
    }
}

export default Textarea;