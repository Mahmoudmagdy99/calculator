import './App.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';


function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();
  
  //return true or false
  const isOperator = (symbol)=>{
    return /[*/+-]/.test(symbol);
  }

  const buttonPress = (symbol)=>{
    if(symbol === "clear"){
      setAnswer("");
      setExpression("0");
    }
    else if (symbol === "negative"){
      if(answer === "")return;
      setAnswer(
        answer.toString().charAt(0) === "-"
        ? answer.slice(1)
        :"-" + answer
      );
    }
    else if(symbol === "percent"){
      if (answer === "")return;
      setAnswer((parseFloat(answer) / 100).toString());
    }
    else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } 
    else if (symbol === "="){
      calculate();
    }
    else if( symbol === "0"){
      if(expression.charAt(0) !== "0"){
        setExpression(expression+symbol);
      }
    }
    else if(symbol === "."){
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if(!lastNumber)return;
      if(lastNumber.includes(".")) return;
      setExpression(expression+symbol);
    }
    else{
      if (expression.charAt(0) === "0"){
        setExpression(expression.slice(1)+symbol);
      }else{
        setExpression(expression+symbol);
      }
    }
  };
  
  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } 
      
      else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(evaluate(answer + newExpression));
    } else {
      setAnswer(evaluate(newExpression));
    }
    setExpression("");
  };

  return (
    <div className="container">
      <div id="first">
      <h1>Calculator Application</h1>
      </div>
      
      <div id="calculator">
        <div id="display" style={{textAlign:'right'}}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <button
        id="clear"
        className="light-btn"
        onClick={()=>buttonPress("clear")}
        >
        C
        </button>
      
        <button
        id="negative"
        className="light-btn"
        onClick={()=>buttonPress("negative")}
        >
        +/-
        </button>
      
        <button
        id="percentage"
        className="light-btn"
        onClick={()=>buttonPress("percent")}
        >
        %
        </button>
      
        <button
        id="divide"
        className="yellow-btn"
        onClick={()=>buttonPress("/")}
        >
        /
        </button>
      
        <button
        id="seven"
        className="dark-btn"
        onClick={()=>buttonPress("7")}
        >
        7
        </button>
      
        <button
        id="eight"
        className="dark-btn"
        onClick={()=>buttonPress("8")}
        >
        8
        </button>
      
        <button
        id="nine"
        className="dark-btn"
        onClick={()=>buttonPress("9")}
        >
        9
        </button>
      
        <button
        id="multiply"
        className="yellow-btn"
        onClick={()=>buttonPress("*")}
        >
        *
        </button>
      
        <button
        id="four"
        className="dark-btn"
        onClick={()=>buttonPress("4")}
        >
        4
        </button>
      
        <button
        id="five"
        className="dark-btn"
        onClick={()=>buttonPress("5")}
        >
        5
        </button>
      
        <button
        id="six"
        className="dark-btn"
        onClick={()=>buttonPress("6")}
        >
        6
        </button>
      
        <button
        id="subtract"
        className="yellow-btn"
        onClick={()=>buttonPress("-")}
        >
        -
        </button>
      
        <button
        id="one"
        className="dark-btn"
        onClick={()=>buttonPress("1")}
        >
        1
        </button>
      
        <button
        id="two"
        className="dark-btn"
        onClick={()=>buttonPress("2")}
        >
        2
        </button>
      
        <button
        id="three"
        className="dark-btn"
        onClick={()=>buttonPress("3")}
        >
        3
        </button>
      
        <button 
        id="add"
        className="yellow-btn"
        onClick={()=>buttonPress("+")}
        >
        +
        </button>
      
        <button
        id="zero"
        className="dark-btn"
        onClick={()=>buttonPress("0")}
        >
        0
        </button>
      
        <button
        id="decimal"
        className="dark-btn"
        onClick={()=>buttonPress(".")}
        >
        .
        </button>
      
        <button
        id="equals"
        className="yellow-btn"
        onClick={()=>buttonPress("=")}
        >
        =
        </button>
      </div>
    </div>
  );
}

export default App;