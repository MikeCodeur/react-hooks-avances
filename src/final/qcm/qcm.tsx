// DO NOT EDIT THIS FILE !!!
import React from 'react'

interface IQuestion {
  question: string
  options:string[]
  answer: string
}

interface IQCMInterface {
  exerciseId: string
  exerciseTitle : string
  quiz: IQuestion[]
}

const QCM: Array<IQCMInterface> = [
  {
    exerciseId: 'src/exercise/01.md',
    exerciseTitle: 'useReducer : Compteur',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/02.md',
    exerciseTitle: 'Hooks Personnalisés : Logique réutilisable',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/03.md',
    exerciseTitle: 'useCallBack',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/04.md',
    exerciseTitle: 'useLayoutEffect',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/05.md',
    exerciseTitle: 'useImperativeHandle',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/06.md',
    exerciseTitle: 'useContext',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  
  {
    exerciseId: 'src/exercise/07.md',
    exerciseTitle: 'useDebugValue',
    quiz: [
      {
        question: "DOM cest quoi  ?",
        options: ["chrome", "bbb", "sss", "ddd"],
        answer: "0"
      }
    ],
  },
]

//export default QCM;

const QcmComponent = () => {
  return (<>{ JSON.stringify(QCM, null, 2) }</>);
}
export default QcmComponent
