let object = {
    set( data ){
        let saveData = typeof( data ) === 'object' ? JSON.stringify( data ) : data;
        localStorage.setItem('list', saveData);
    },
    get(){
        let list = localStorage.getItem('list');
        
        try{
            return JSON.parse( list );
        }catch(e){
            return list;
        }
    }
}

export default object;