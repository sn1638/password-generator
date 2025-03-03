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
    <div className='flex justify-center items-center mt-10 w-screen'>
    <div className="bg-gray-400 w-[100%] h-36 text-amber-900 rounded-lg">
      <div className='w-[99%] flex justify-between m-1 h-10'>
        <input type='text' value={password} className=' p-1.5 rounded-lg  bg-white w-[80%]'readOnly />
        <button  onClick={copypasswordToClipboard} className='cursor-pointer active:bg-blue-600 bg-blue-400 w-[18%] rounded-lg ml-1'>Copy</button>
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