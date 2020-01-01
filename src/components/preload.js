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
        
        // remove preload mask when layout was prepeared
        setTimeout( global.Preload.close.bind( global.Preload ), 300 );
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