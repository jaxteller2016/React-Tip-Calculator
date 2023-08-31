import { useState } from 'react';
import './styles.css';

const tips = [
  {
    id: 1,
    question: 'How did you like the service?',
    answer: [
      { text: 'Dissatisfied', tip: 0 },
      { text: 'It was okay', tip: 5 },
      { text: 'It was good', tip: 10 },
      { text: 'Absolutely amazing!', tip: 20 }
    ]
  },
  {
    id: 2,
    question: 'How did your friend like the service?',
    answer: [
      { text: 'Dissatisfied', tip: 0 },
      { text: 'It was okay', tip: 5 },
      { text: 'It was good', tip: 10 },
      { text: 'Absolutely amazing!', tip: 20 }
    ]
  }
];

export default function App() {
  return (
    <div className='App'>
      <h3>Hi! 👋🏼 Welcome to the TIP Calculator App 💸</h3>
      <Form />
    </div>
  );
}

function Form() {
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  const [bill, setBill] = useState('');
  const averageTip = (bill * (tip1 + tip2)) / 100 / 2;

  function handleReset() {
    setBill((b) => (b = ''));
    setTip1((tip1) => (tip1 = 0));
    setTip2((tip2) => (tip2 = 0));
  }

  return (
    <>
      <form className='form'>
        <div className='container'>
          <h4>How much was the bill?</h4>
          <input
            className='input'
            type='text'
            name='bill'
            value={bill}
            placeholder='Enter Bill amount'
            onChange={(e) => setBill(Number(e.target.value))}
          ></input>
        </div>

        <FormOption tip={tips[0]} myTip={tip1} onTipChange={setTip1} />
        <FormOption tip={tips[1]} myTip={tip2} onTipChange={setTip2} />
      </form>
      {bill !== 0 && tip1 !== 0 && (
        <div className='results_container'>
          <h2>
            For this bill you have to pay {bill + averageTip}$ in total (
            {`Bill:${bill}$ +
          Tip:${averageTip}$`}
            )
          </h2>
          <div className='buttons'>
            <Button bgColor='#F90207' textColor='#fff' onClick={handleReset}>
              Reset<span>🔄</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function FormOption({ tip, myTip, onTipChange }) {
  function handleChange(e) {
    onTipChange((myTip) => (myTip <= 20 ? myTip + Number(e.target.value) : 0));
    console.log(e.target.value);
    console.log(myTip);
  }

  return (
    <div className='container'>
      <h4>{tip.question}</h4>
      <select
        className='input'
        type='select'
        name='satisfaction'
        required
        onChange={handleChange}
        value={myTip}
      >
        {tip.answer.map((answer) => (
          <Option answer={answer} key={answer.text} />
        ))}
      </select>
    </div>
  );
}

function Option({ answer }) {
  return (
    <option value={answer.tip}>
      {answer.text}({`${answer.tip}%`})
    </option>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
