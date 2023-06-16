const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
   id: 1,
    text:'Jeffery Castro ya entro a la mansion a buscar el tesoro y empezo por ...',
    options: [
      {
        text: 'sala',
        nextText: 2
      },
      {
        text:'ir al patio',
        nextText:3
      }
    ]
  },
  {
    id: 2,
    text:'fue a la sala para investigar en ...',
    options:[
      {
        text:'en los sofas',
        nextText:4
      },
      {
      text:'en las macetas',
        nextText:6
      }
    ]
  },
  {
    id:3,
    text:'fue al patio pero solo encontrastes un garage cerrado ',
    options:[
      {
        text:'abrir la puerta',
        requiredState: (currentState) => currentState.key,
        nextText:5
      },
      {
        text:'ir a la sala',
        nextText:2
      }
    ]
  },
  {
    id:4,
    text:'Busco en abajo en los sofa solo encontrastes una llave, decides  ... ',
    
    options:[
      {
        text:'ir a la planta alta',
        nextText:7
      },
      {
        text:'ir al patio',
        setState:{key :true },
        nextText:3
      }
    ]
  },
  {
    id: 5,
    text:'Abres la puerta del garage y solo encuentras un papel escrito 143 ',
    options:[
      {
        text:'Salir e ir a la planta alta',
        setState:{codigo :true },
        nextText: 8
      }
    ]
  },
  {
    id:6,
    text:'Jeffery buscaba en las macetas cuando derepente una se le cayo en la cabeza',
    options:[
      {
        text:'Reiniciar',
        nextText:-1
      }
    ]
  },
  {
    id:7,
    text:'Jeffery piensa que el tesoro esta en la planta alta. Al ir solo encuentra dos lugares , 2 cuartos',
    options:[
  {
    text:'ir al primer cuarto',
    nextText:8,
  },
      {
        text:'ir al segundo cuarto',
        nextText:9,
      }
    ]
  },
  {
    id:8,
    text:'Jeffery fue al primern cuarto  y decide ...',
    options:[
      {
        text:'buscar en los cajones',
        nextText:11
      },
      {
        text:'buscar debajo de la cama',
        nextText:10
      },
      {
        text:'ir al segundo cuarto, no hay nada util ',
        nextText:9
      }
    ]
  },
  {
    id:9,
    text:'Jeffery fue al segundo cuarto y decide ...',
    options:[
  {
    text:'Buscar debajo de la cama',
    nextText:12
  },
  {
    text:'Buscar en los cajones',
    nextText:13
  }
    ]
  },
  {
    id:10,
    text:'Busca abajo de la cama pero no encuentra nada, de repente escucha un sonido de pasos, jeffery va a ...',
    options:[
      {
        text:'ver quien viene',
        nextText:14
      },
      {
        text:'Esconderse de abajo de la cama',
        nextText:15
      }
    ]
  },
  {
    id:11,
    text:'Busca en los cajones pero solo hay ropa muy vieja, y sigues buscando pero escucha pasos pero no le da tiempo para esconderse',
    options:[
      {
        text:'reiniciar',
        nextText:-1
      }
    ]
  },
  {
    id:12,
    text:'encuentras solo un pedazo de una foto,Jeffery decide ...',
    options:[
      {
        text:'ir al otro cuarto',
        nextText:8
      },
      {
        text:'buscar en los cajones',
        nextText:13
      }
    ]
  },
  {
    id:13,
    text:'encontrastes una caja que contiene una clave,',
    options:[
      {
        text:'dejarlo',
        extText:17
      },
      {
        text:'intenar la claves',
        nextText:18
      },
      {
        text:'poner i ♥ you',
        requiredState: (currentState) => currentState.codigo,
        nextText:19
      }
    ]
  },
  {
    id:14,
    text:'Jeffery se acerca a ver quien viene pero cuando se acerca es golpeado, mas tarde Jeffery se despierta, y esta en su casa y la mansion desaparecio',
    options:[
  {
    text:'Final fallido',
    nextText:-1
  }
    ]
  },
  {
    id:15,
    text:'se escondes abajo de la cama, ves que alguien paso ,pero  se va y algo se cayo lo recoge y ves que el tesoro esta en el sotano, va al sotano y lo encuentra al acercase no hay nada en el tesoro ...',
    options:[
      {
        text:'Final neutro',
        nextText:-1
      },
      {
        text:'ver la foto',
        requiredState: (currentState) => currentState.foto,
        nextText:20
      }
    ]
  },
  {
    id:17,
    text:'decidio dejar el cofre',
    options:[
      {
        text:'y mejor se va al primer cuarto cuarto',
        nextText:8
      }
    ]
  },
  {
    id:18,
    text:'intesta en contrar la clave pero Jeferry esta tan atento con el cofre que alguien le golpeo',
    options:[
      {
       text:'Reintentar',
        nextText:-1
      }
    ]
  },
  {
    id:19,
    text:'es otro pedazo de foto, jeffery decide ir al otro cuarto',
    options:[
  {
    text:'ir al otro cuarto',
    setState:{foto :true },
    nextText:8
  }
    ]
  },
  {
    id:20,
    text:'ve la foto y por lo que ves son los antiguos dueños de la masion pero no solo es los dueños tambien esta su hijo',
    options:[
      {
        text:'¿Continuara?',
        nextText:-1
      }
    ]
  }
]
startGame()