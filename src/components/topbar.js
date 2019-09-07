import React from 'react';
import logo from '../themes/default/logo.svg';

import MenuBtn from './button';

class Logo extends React.Component {
    render(){
        return (
            <div className="logo">
                <a href="/"><img alt="logo" className="logoImg" src={logo} /></a>
            </div>
        );
    }
}

class MenuGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:this.props.list || [],
            unline:this.props.unline || null
        };
    }
    
    render(){
        
        let icons = this.props.list.map( ( i, key ) => {
            return ( <MenuBtn key={ key } icon={ i.icon } event={ i.event } active={ i.active } /> )
        } );
        
        return (
            <div className={"MenuGroup" + ( this.state.unline ? ' unline' : '' ) }>
                { icons }
            </div>
        );
    }
}

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <header className="Topbar">
                <div className="TopbarLeft">
                    <Logo />
                    <MenuGroup list={ [{icon:'icon-dakai', event:'files'}, {icon:'icon-shangyibu', event:'undo'}, {icon:'icon-xiayibu', event:'redo'}] } />
                    <MenuGroup list={ [{icon:'icon-zitibiaoti', event:'headline'}, {icon:'icon-zitijiacu', event:'bold'}, {icon:'icon-zitixieti', event:'italic'}, {icon:'icon-zitishanchuxian', event:'deleteline'}] } />
                    <MenuGroup list={ [{icon:'icon-wuxupailie', event:'list'}, {icon:'icon-youxupailie', event:'olist'}] } />
                    <MenuGroup unline={ true } list={ [{icon:'icon-yinyong', event:'quote'}, {icon:'icon-zitidaima', event:'code'}, {icon:'icon-biaodanzujian-biaoge', event:'table'}, {icon:'icon-charulianjie', event:'link'}, {icon:'icon-charutupian', event:'image'}] } />
                </div>
                <div className="TopbarRight">
                    <MenuGroup unline={ true } list={ [{icon:'icon-shebeikaifa', event:'embed'}, {icon:'icon-xinxikongxin', event:'about', active:'true'}] } />
                </div>
            </header>
        );
    }
}

export default Topbar;