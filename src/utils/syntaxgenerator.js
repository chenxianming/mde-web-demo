import logos from '../themes/default/logos.png';

const beweenSyntax = ( editor, cursor, symbolStr ) => {

    let selection = editor.getSelection();
        
    if( !selection ){
        return null;
    }
    
    let rs = `${ symbolStr }${ selection }${ symbolStr }`;
    
    editor.replaceSelection( rs );
}

const paragraphSyntax = ( editor, cursor, symbolStr ) => {
    let selection = editor.getSelection();

    let arr = selection.split('\n'),
        rs = '';

    for( let i = 0; i < arr.length; i++ ){
        
        let replaceSyntax = symbolStr.replace('{index}', (i+1));
        
        let a = replaceSyntax + arr[ i ];
        arr[ i ] = a;
    }

    rs = arr.join('\n');

    editor.replaceSelection( rs );
}

const events = {
    files() {
        global.Drawer.open.call(global.Drawer);

        if (!global.Editor) {
            return;
        }

        global.Editor.update.call(global.Editor);
    },
    undo() {
        global.Editor.refs.codemirrorObj.editor.undo()
    },
    redo() {
        global.Editor.refs.codemirrorObj.editor.redo()
    },
    headline() {
        
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        let text = editor.getLine( cursor.line );
        
        let char = '#',
            charIndex = [];
        
        text.split('').forEach( ( txt, idx ) => ( ( ( txt === char ) && ( idx <= 5 ) ) && ( charIndex.push( idx ) ) ) );
        
        let rs = '';
        
        switch( charIndex.length ){
            case 0 :
                rs = '# '+text;
            break ;
                
            case 1 :
            case 2 :
            case 3 :
            case 4 :
                rs = '#' + text;
            break ;
                
            case 5 :
                rs = text.replace('##### ','');
            break ;
                
            default :
                
            break ;
        }
        
        editor.replaceRange( rs, {
            line:cursor.line,
            ch:0
        },{
            line:cursor.line,
            ch:text.length
        } );
    },
    bold() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        beweenSyntax( editor, cursor, '**' );
    },
    italic() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        beweenSyntax( editor, cursor, '*' );
    },
    deleteline() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        beweenSyntax( editor, cursor, '~~' );
    },
    list() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        paragraphSyntax( editor, cursor, '- ' );
    },
    olist() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        paragraphSyntax( editor, cursor, '{index}. ' );
    },
    quote() {
        let editor = global.Editor.refs.codemirrorObj.editor,
            cursor = editor.getCursor();
        
        paragraphSyntax( editor, cursor, '> ' );
    },
    code() {
        global.Dialog.open({
            title:'Insert code',
            description:'Insert code to editor.',
            status:'insertCode',
            bgColor:'#ffffff'
        });
    },
    table() {
        global.Dialog.open({
            title:'Insert table',
            description:'Insert table to editor',
            status:'insertTable',
            bgColor:'#ffffff'
        });
    },
    link() {
        global.Dialog.open({
            title:'Insert link',
            description:'Insert link to editor.',
            status:'insertLink',
            bgColor:'#ffffff'
        });
    },
    image() {
        global.Dialog.open({
            title:'Insert Image',
            description:'Insert Image to editor.',
            status:'insertImage',
            bgColor:'#ffffff'
        });
    },
    embed() {},
    about() {
        global.Dialog.open({
            title:'About MDE',
            description:`
<p>
    MED = Mark Down Extract, that means will be simple and easy to use.<br />
    MED across Desktop / Web / App platform.<br />
    The editor core can be embed to your project or replace your WYGWYSI editor.<br />
    Also, MED is a opensource  and reposition on GITHUB.
</p>
<p>
    <h5 style="margin-top:10px;margin-bottom:5px;"><b style="font-weight:700;font-size:14px;">Tech stack</b></h5>
    <img src="${ logos }" />
</p>
<p>
    <h5 style="margin-top:10px;margin-bottom:5px;"><b style="font-weight:700;font-size:14px;">More</b></h5>
    <b style="font-weight:500;font-size:12px;margin-right:10px">MarkDown syntax</b><b style="font-weight:500;font-size:12px;margin-right:10px">MED for Desktop</b><b style="font-weight:500;font-size:12px;margin-right:10px">MED for Android</b>
    <br />
    <br />
</p>
            `,
            status:'about',
            bgColor:'#f5f5f5'
        });
    },
};

export default events;