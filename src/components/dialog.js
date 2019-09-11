import React from 'react';
import Icon from './icons';
import Input from './input';
import Textarea from './textarea';

let cacheComponent = [],
    cacheTextarea = null;

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            description:'',
            rename:'',
            inputs:[]
        };
        
        this.removeDoc = this.removeDoc.bind( this );
        this.renameDoc = this.renameDoc.bind( this );
        this.close = this.close.bind( this );
        this.onChange = this.onChange.bind( this );
        this.insertCode = this.insertCode.bind( this );
        this.insertTable = this.insertTable.bind( this );
        this.insertLink = this.insertLink.bind( this );
        this.insertImage = this.insertImage.bind( this );
    }
    
    componentDidMount(){
        global.Dialog = this;
    }
    
    open( data ){
        
        let obj = Object.assign( {}, {
            isOpen:true
        }, data );
        
        this.setState( obj );
        
        cacheComponent.forEach( ( cache ) => {
            ( cache && cache.refs.input ) && ( cache.refs.input.value = '' );
            ( cache && cache.refs.insertCode ) && ( cache.refs.insertCode.editor.setValue('') );
        } );
        
    }
    
    close(){
        this.setState({
            isOpen:false,
            inputs:[]
        });
    }
    
    removeDoc(){
        
        let idx = global.Editor.state.id,
            lists = global.DocList.state.list,
            listNew = [],
            newIdx = -1;
        
        if( global.DocList.state.list.length <= 1 ){
            return ;
        }
        
        this.close();
        
        lists.forEach( ( lst ) => ( ( lst.id !== idx ) && ( listNew.push( lst ) ) ) );
        
        listNew.forEach( ( lst ) => ( ( lst.id === ( idx - 1 ) ) && ( newIdx = idx - 1 ) ) );
        
        ( newIdx < 0 ) && ( newIdx = listNew[listNew.length - 1].id );
        
        global.DocList.setState({
            list:[]
        });
        
        setTimeout( () => {
            global.DocList.setState({
                list:listNew
            });
        }, 1 );
        
        setTimeout( () => {
            global.DocList.onActive.call( global.DocList, newIdx );
        }, 2 );
        
    }
    
    renameDoc(){
        
        let idx = global.Editor.state.id,
            rename = this.state.rename;
        
        let lists = global.DocList.state.list;
        
        for( let i = 0; i < lists.length; i++ ){
            
            let lst = lists[i];
            
            ( lst.id === idx ) && ( lists[ i ].title = rename );
        }

        this.close();
        
        global.DocList.setState({
            list:[]
        });
        
        setTimeout( () => {
            global.DocList.setState({
                list:lists
            });
        }, 1 );
    }
    
    onChange( e, idx ){
        
        let val = e.target.value;
        
        if( !isNaN( idx ) ){
            let table = this.state.inputs;
            
            table[ idx ] = val;
            
            this.setState({
                inputs:table
            });
        }else{
            
            this.setState({
                rename:val
            });
        }
    }
    
    getInput(){
        cacheComponent.push( this );
    }
    
    getTextarea(){
        cacheComponent.push( this );
        cacheTextarea = this;
    }
    
    insertCode(){
        
        let code = cacheTextarea.state.code,
            codemirrorObj = global.Editor.refs.codemirrorObj,
            cursor = codemirrorObj.editor.getCursor();
        
        this.close();
        
        let arr = code.split('\n'),
            replace = '';
        
        
        replace = '\n``` \n' + arr.join('\n') + '\n``` \n';
        
        codemirrorObj.editor.replaceRange(replace, {
            line: cursor.line,
            ch: cursor.ch
        }, {
            line: cursor.line,
            ch: cursor.ch
        });
    }
    
    insertTable(){
        
        let codemirrorObj = global.Editor.refs.codemirrorObj,
            cursor = codemirrorObj.editor.getCursor();
        
        this.close();
        
        let table = this.state.inputs,
            str = '';
        
        for( let i = 0; i < table.length; i++ ){
            table[ i ] *= 1;
        }
        
        !table[0] && ( table[0] = 1 );
        ( !table[1] || ( table[1] < 2 ) ) && ( table[1] = 2 );
        
        //render th
        for( let i = 0; i < table[0] + 1; i++ ){
            str += ( i===table[0] ) ? `|` : `|   `;
        }
        
        str += '\n';
        
        for( let i = 0; i < table[0] + 1; i++ ){
            str += ( i===table[0] ) ? `|` : `| - `;
        }
        
        str += '\n';
        
        for( let j = 0; j < table[1]-1; j++ ){
            for( let i = 0; i < table[0] + 1; i++ ){
                str += ( i===table[0] ) ? `|` : `|   `;
            }
            str += '\n';
        }
        
        codemirrorObj.editor.replaceRange('\n'+str+'\n', {
            line: cursor.line,
            ch: cursor.ch
        }, {
            line: cursor.line,
            ch: cursor.ch
        });
    }
    
    insertLink(){
        
        let codemirrorObj = global.Editor.refs.codemirrorObj,
            cursor = codemirrorObj.editor.getCursor();
        
        this.close();
        
        let link = this.state.inputs,
            trasferTypeMatch = link[0].match('http') || link[0].match('https'),
            str = '';
        
        str = `[${ link[1] }](${ trasferTypeMatch ? link[0] : ('http://'+link[0]) } "${ link[1] }")`;
        
        codemirrorObj.editor.replaceRange('\n'+str+'\n', {
            line: cursor.line,
            ch: cursor.ch
        }, {
            line: cursor.line,
            ch: cursor.ch
        });
    }
    
    insertImage(){
        
        let codemirrorObj = global.Editor.refs.codemirrorObj,
            cursor = codemirrorObj.editor.getCursor();
        
        this.close();
        
        let link = this.state.inputs,
            trasferTypeMatch = link[0].match('http') || link[0].match('https'),
            str = '';
        
        str = `![markdown](${trasferTypeMatch ? link[0] : ('http://'+link[0]) } "${ link[1] }")`;
        
        codemirrorObj.editor.replaceRange('\n'+str+'\n', {
            line: cursor.line,
            ch: cursor.ch
        }, {
            line: cursor.line,
            ch: cursor.ch
        });
        
    }
    
    render(){
        
        let self = this;
        
        let getDom = () => {
            
            let wrap = '';
            
            switch( this.state.status ){
                
                case 'removeDoc' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div className="check"><div onClick={ self.removeDoc } className="btn sure checkBtn">Sure</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div>);
                break ;
                
                case 'renameDoc' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div><Input getInput={ this.getInput } input={ this.state.input } onChange={ this.onChange } /><div className="check"><div onClick={ self.renameDoc } className="btn sure checkBtn">Submit</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div></div>);
                break ;
                
                case 'insertCode' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div><Textarea getTextarea={ this.getTextarea } input={ this.state.input } onChange={ this.onChange } /><div className="check"><div onClick={ self.insertCode } className="btn sure checkBtn">Submit</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div></div>);
                break ;
                
               case 'insertTable' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div><Input hor={ true } isNum={ true } getInput={ this.getInput } input={ 'rows' } onChange={ e => this.onChange(e, 0) } /><Input hor={ true } isNum={ true } getInput={ this.getInput } input={ 'colums' } onChange={ e => this.onChange( e, 1 ) } /><div className="check"><div onClick={ self.insertTable } className="btn sure checkBtn">Submit</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div></div>);
                break ;
                
                case 'insertLink' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div><div className="check"> <Input getInput={ this.getInput } input={ 'linkUrl' } onChange={ e => this.onChange(e, 0) } /> <Input getInput={ this.getInput } input={ 'linkText' } onChange={ e => this.onChange(e, 1) } /> <div onClick={ self.insertLink } className="btn sure checkBtn">Submit</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div></div>);
                break ;
        
                case 'insertImage' :
                    wrap = React.createElement("div", {className: "DiaWrap"}, <div><div className="check"> <Input getInput={ this.getInput } input={ 'imageUrl' } onChange={ e => this.onChange(e, 0) } /> <Input getInput={ this.getInput } input={ 'imageDescription' } onChange={ e => this.onChange(e, 1) } /> <div onClick={ self.insertImage } className="btn sure checkBtn">Submit</div><div onClick={ self.close } className="btn cancel checkBtn">Cancel</div></div></div>);
                break ;
                
                default :
                    wrap = React.createElement("div", {className: "DiaWrap"});
                    break ;
            }
            
            return wrap;
        }
        
        return (
            <div className={"Dialog" + ( this.state.isOpen ? ' active' : '' ) }>
                <div className="DialogMask" onClick={ this.close }></div>
                <div className="DialogContent" style={ {background:this.state.bgColor} }>
                    <div className="close btn" onClick={ this.close }>
                        <Icon icon={ 'icon-guanbi' } size={ 21 } />
                    </div>
                    <div className="DialogTitle"><span>{ this.state.title }</span></div>
                    <div className="DialogDescription" dangerouslySetInnerHTML={{ __html: this.state.description }}></div>
                    <div className="DialogActions">
                        { getDom() }
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog;