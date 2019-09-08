import React from 'react';
import Icon from './icons';

import events from '../utils/syntaxgenerator.js';

class MenuBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color:props.color || null, 
            size:props.size || '125%',
            icon:props.icon || '',
            active:props.active || null
        };
        
        this.onClick = this.onClick.bind( this, this.props.event );
    }
    
    onClick( mapName, evt ){
        
        evt.preventDefault();
        
        events[mapName].call( this );
        
    }
    
    render(){
        return (
            <div onClick={ this.onClick } className={"icon"+(this.state.active ? ' active' : '')}><Icon color={ this.state.color || null } size={ this.state.size } icon={ this.state.icon } /></div>
        );
    }
}

export default MenuBtn;