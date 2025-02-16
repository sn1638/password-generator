import React, { useState, useCallback, useEffect, useRef} from 'react'

function App() {

  const[length, setLength] = useState(8);
  const[numberallowed, setNumberallowed] = useState(false);
  const[characterallowed, setCharacterallowed] = useState(false);
  const[password, setPassword] = useState();
  
  const passwordgenerator = useCallback(()=>{
    let pass = '';
    let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(numberallowed){
      str+='0123456789';
    }
    if(characterallowed){
      str+='!@#$%^&*()_+';
    }
    for(let i=0; i<length; i++){
      pass=pass+str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(pass)
  }, [length, numberallowed, characterallowed, setPassword]);

  const copypasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    },[password]);
  useEffect(()=>{
    passwordgenerator();
  },[length, numberallowed, characterallowed]);
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
    <div className="bg-gray-400 w-2xl h-36 text-amber-900 rounded-lg">
      <div className='w-[100%]'>
        <input type='text' value={password} className=' p-1.5 rounded-lg h-10 bg-white m-2 w-[80%]'readOnly />
        <button  onClick={copypasswordToClipboard} className='cursor-pointer bg-blue-400 h-10 w-[15%] rounded-lg'>copy</button>
      </div>
        <div>
          <input type='range' min='4' max='50' value={length} className=' cursor-pointer mr-2 ml-2' onChange={(e)=>{setLength(e.target.value)
          }}/>
          <label>Length: ({length})</label> 
          <input type='checkbox' defaultChecked={numberallowed} onChange={()=>{
            setNumberallowed(!numberallowed)
          }} className='cursor-pointer mr-2 ml-2'/>Numbers
          <input type='checkbox' defaultChecked={characterallowed} onChange={()=>{
            setCharacterallowed(!characterallowed)
          }} className='cursor-pointer mr-2 ml-2'/>Characters
        </div>
      </div>
    </div>
    </>
  )
}
export default App