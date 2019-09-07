import React from 'react';

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size:props.size || '125%',
            color:props.color || null
        };
    }
    
    render(){
        
        let renderStyle = {};
        
        this.state.size && ( renderStyle['fontSize'] = this.state.size );
        this.state.color && ( renderStyle['color'] = this.state.color );
        
        return (
            <i className={"iconfont "+this.props.icon} style={ renderStyle }></i>
        );
    }
}

export default Icon;