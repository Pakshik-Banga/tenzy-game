import React, { useEffect } from "react";
import "./App.css" 
import Box from './div'
import {nanoid} from "nanoid"
import Text from "./Text"
import Confetti from "./Confetti";
export default function App(){

     function newValue(){
          return {
               number : Math.floor(Math.random()*6) + 1,
               isHeld : false,
               id : nanoid()
          }
     }
     


    const [numArr,setnumArr] = React.useState(allNewDice())
    const [Tenzies,setTenzies] = React.useState(false)
    const [loose,setLoose] = React.useState(false)
    let [count,SetCount] = React.useState(0)


        
      function changeTanzies(value){
             setTenzies((value)=>{
               return !value
             })

             console.log("You won")  
      }



    function allNewDice(){
                    let n = [];
                    for(let i=0;i<10;i++){
                    n.push(newValue())
                    }
               
                    return n
   }



   function checkHeld(){
         return  numArr.every((ind)=>{
                         return ind.isHeld
             })
   }



   function checkValue(){
     let firstNum  = numArr[0].number

       return numArr.every((ind)=>{
          return firstNum===ind.number
       })

   }

    React.useEffect(()=>{
                 if(checkHeld() && checkValue()){
                    setTenzies(()=>{
                         return true;
                    })
                 }else if(checkHeld() && !checkValue()){
                    setLoose(()=>{
                         return true;
                    })
                 }
    },[numArr])

            

 
      function holdDice(Id){

              setnumArr((oldDice)=>{
                 return oldDice.map((die)=>{
                    return die.id===Id? {
                           ...die,
                           isHeld : !die.isHeld
                    }:die
                 })
              })

      }
  
  
    let [c,changeC] = React.useState(0)
  
    function newNum(){

     
         SetCount((prevCount)=>{
            return prevCount+1
         })
       
        
        
      
        return setnumArr((oldDice)=>{
                         console.log(Tenzies,"tenzies")
                         console.log(loose,"loose")
         
       
                              if(Tenzies){ setTenzies(()=>{
                              
                                   console.log("hello veryone")
                                   
                                                  if(localStorage.getItem("time")){
                                                       
                                                       if(count<Number(localStorage.getItem("bestScore"))){
                                                            localStorage.setItem("bestScore",count)
                                                       }

                                                  }else{
                                                   
                                                       localStorage.setItem("bestScore",Number(count))
                                                  }

                              

                                   localStorage.setItem("time",true)
                               
                                   SetCount(0)
                                   return !Tenzies
                              })}else if(loose){
                                                  setLoose(()=>{
                                                       return !loose
                                                  })
                                           
                                                  SetCount(0)
                              }else{
                                   return oldDice.map(die=>{
                                        return die.isHeld? die : newValue()
                                      })
                              }
         
                         
                              return allNewDice()
          })

          
     }       
    

      
 
  const t = numArr.map((ind)=>{
     return <Box held={ind.isHeld} num={ind.number} key={ind.id} click={()=>holdDice(ind.id)} loose={loose}/>
})



  return <div className="outer"> 
       <main>

          <Text />
          <div className="container">
               
               {t}

          </div>
            <div className="btn-div">
                  
                <button className="btn" onClick={newNum}>{(Tenzies)?"Play Game":(loose)?"You Loose":"Roll"}</button>
                <div className="btn-count">Number of Rolls : {count}</div>
{ localStorage.getItem("time") && <div className="btn-count">Best Score: {localStorage.getItem("bestScore")}</div>}
                
                

                
                


          </div>

        </main>
        {Tenzies && <Confetti />}
  </div>
}