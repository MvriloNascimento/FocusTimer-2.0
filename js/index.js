//Abaixo, estou importando as constantes:
import {
    minutesDisplay,
    secondsDisplay,
    buttonPlay,
    buttonPause,
    buttonStop,
    buttonPlus,
    buttonMinus,
    buttonSoundForest,
    buttonSoundRain,
    buttonSoundCoffeeShop,
    buttonSoundfireplace,
    bgColorForest,
    fontColorForest,
    bgColorRain,
    fontColorRain,
    bgColorCoffeeShop,
    fontColorCoffeeShop,
    bgColorFireplace,
    fontColorFireplace,
  } from "./elements.js"
  
  let audioForest = false
  let audioRain = false
  let audioCoffeeShop = false
  let audioFireplace = false
  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)
  
  // Importando os sons
  import Sounds from "./sounds.js"
  const sound = Sounds()
  
  // Events
  
  buttonPlay.addEventListener('click', function() {
    sound.pressButton()
    play()
    countDown()
  })
  
  buttonPause.addEventListener('click' , function(){
    sound.pressButton()
    hold()
    pause()
  })
  
  buttonStop.addEventListener('click', function(){
    resetTimer()
    resetControls()
    sound.pressButton()
  })
  
  buttonPlus.addEventListener('click', function() {
    addTimerDisplay()
    sound.pressButton()
  })
  
  buttonMinus.addEventListener('click', function(){
    removeTimerDisplay()
    sound.pressButton()
  })
  
  
  // Eventos dos cards: 
  //Armazeno o retorno da minha função, nas variaveis de audio.
  buttonSoundForest.addEventListener('click', function() {
    audioForest = soundCardOnOff(audioForest, sound.audioForest, bgColorForest, fontColorForest)
  })
  
  buttonSoundRain.addEventListener('click', function(){
    audioRain = soundCardOnOff(audioRain, sound.audioRain, bgColorRain, fontColorRain)
  })
  
  buttonSoundCoffeeShop.addEventListener('click', function() {
    audioCoffeeShop = soundCardOnOff(audioCoffeeShop, sound.audioCoffeeShop, bgColorCoffeeShop, fontColorCoffeeShop)
  })
  
  buttonSoundfireplace.addEventListener('click', function(){
    audioFireplace = soundCardOnOff(audioFireplace, sound.audioFireplace, bgColorFireplace, fontColorFireplace)
  })

  function soundCardOnOff(audio, sound, bgColor, fontColor){ 
    if (audio === false){
      sound.play()
      bgColor.style.fill = '#02799D'
      fontColor.style.fill = '#ffffff'
      audio = true
      return audio 
    }else {
      sound.pause()
      bgColor.style.fill = '#E1E1E6'
      fontColor.style.fill = '#323238'
      audio = false
      return audio
    }
  }
  
  
  function updateDisplay(newMinutes, seconds) {
  
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
   
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }
  
  
  function addTimerDisplay(){
    let display = Number(minutesDisplay.textContent)
    if (display < 95){
      display += 5
      updateDisplay(display, 0)
    }else {
      return alert('Não permitido tempo superior a 95 minutos.')
    }
    
  }
  
  function removeTimerDisplay(){
    let display = Number(minutesDisplay.textContent)
    if (display > 5){
      display -= 5
      updateDisplay(display, 0)
    }else {
      return alert('Não prermitido tempo inferior a 5 minutos.')
    }
    
  }
  
 
  function countDown(){
    timerTimeOut = setTimeout(function (){
      let seconds = Number(secondsDisplay.textContent)
      let minutes = Number(minutesDisplay.textContent)
      let isFinished = minutes <= 0 && seconds <= 0
  
      updateDisplay(minutes, 0)
  
      if (isFinished) {
        resetControls()
        updateDisplay()
        sound.timeEnd()
        return
      }
  
      if (seconds <= 0){
        seconds = 60
        --minutes
      }
      //  A lógica a seguir, está decrementando 1 segundo no display. 
      updateDisplay(minutes, String(seconds - 1))
  
      countDown() //Recursão ou recursiva, quando uma função, chama ela mesma.
    }, 1000)
  }
  
  function hold(){
    clearTimeout(timerTimeOut)//o js vai procurar dentro do timeOUt o id referente, e vai pausar.
  }
  
  //A função resetTimer, faz o calback do função updateDisplay e da função clearTimeout(), que limpa o tempo limite que foi definido pela função setTimeout() antes disso.
  function resetTimer(){
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }
  
  //A função resetControls, remove o status hide, no botão play, e adiciona no pause.
  function resetControls(){
    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
  }
  
  //A função play,adiciona o status hide, no botão play e remove do botão pause. 
  function play() {
    buttonPlay.classList.add('hide')
    buttonPause.classList.remove('hide')
  }
  
  //A função pause,adiciona o status hide, no botão pause e remove do botão play. 
  function pause() {
    buttonPause.classList.add('hide')
    buttonPlay.classList.remove('hide')
  }











