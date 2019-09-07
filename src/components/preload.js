import React from 'react';

class Preload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true
        };
    }
    
    componentDidMount(){
        global.Preload = this;
    }
    
    close(){
        this.setState({
            open:false
        });
    }
    
    render(){
        return (
            <div className={'Preload'+(this.state.open ? ' open' : '')}></div>
        );
    }
}

export default Preload;