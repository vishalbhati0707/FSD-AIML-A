const url="http://dummyjson.com/users?";
const pr = fetch(url);
    pr.then(functionfunction(res){
        return res.json();
    })
    .then((data) =>{
        console.log('Data',,data);
    })
    .catch((.err)=>{
        console.log('Error:',err);
    })
    .finally(()=>{
        console.log('Inside Finally')
    })

    const f1=async()=>{
        try{
        const res=await fetch(url);
        const data=await res.json();
        console.log('Dats',data);
        }
        catch(err){
            console.error('Eroe')
        }
    }