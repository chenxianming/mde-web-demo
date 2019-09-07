import React from 'react';

let permitRange = [
    49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    8, 37, 38, 39, 40
];

class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        
        this.checkInput = this.checkInput.bind( this );
    }
    
    componentWillUpdate(){
        this.props.getInput.call(this);
    }
    
    checkInput( e ){
        let keyCode = e.keyCode,
            numLimit = this.props.isNum;
        
        ( !permitRange.includes( keyCode ) && numLimit ) && e.preventDefault()
    }
    
    render(){
        
        let isHor = this.props.hor;
        
        return (
            <div className={"InputWrap" + ( isHor ? ' hor' : '' ) }>
                <input onKeyDown={ this.checkInput } ref={'input'} defaultValue={''} placeholder={ this.props.input } onChange={ this.props.onChange } className="Input" />
            </div>
        );
    }
    
}

export default Input;