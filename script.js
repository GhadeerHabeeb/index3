let input=document.querySelector(".inputs");
let resetBtn=document.querySelector(".reset-btn");
let hint=document.querySelector('.hint span');
 
let GuessLeft=document.querySelector('.guess-left span');

let wrongLetter=document.querySelector('.wrong-letter span');
let typingInput=document.querySelector('.typing-input');
const svgContainer=document.getElementById('svg');
const animItem=bodymovin.loadAnimation({
    wrapper:svgContainer,
    animType:'svg',
    loop:false,
    autoplay:false,
    path:'https://assets3.lottiefiles.com/packages/lf20_tiviyc3p.json',
});

let word,maxGuesse,incorrect=[],correct=[];
function randomWord()
{
    let ranObj= wordList[Math.floor(Math.random() * wordList.length)];
      word=ranObj.word;
    let hi=ranObj.hint;
    maxGuesse=8;incorrect=[];correct=[];
    console.log(word);
    hint.innerText=hi;
    GuessLeft.innerText=maxGuesse;
    wrongLetter.innerText=incorrect;

    let html="";
    for(let i=0;i<word.length;i++)
    {
        html+=`<input type="text" disabled>`;
    }
    input.innerHTML=html;

    

}
randomWord();


function initGame(e)
{
    let key=e.target.value;
    if(key.match(/^[A-Za-z]+$/)&& !incorrect.includes(`${key}`) && !correct.includes(key))
    {
        console.log(key);
        if(word.includes(key))
        {
            for(let i=0 ; i<word.length;i++)
            {
                if(word[i]===key)
                {   correct.push(key);
                    input.querySelectorAll('input')[i].value=key;
                    
                }
                animItem.goToAndPlay(0,true); 
                    
            }
        }
        else{
            maxGuesse--;
           
          incorrect.push(`${key}`);
        }
        GuessLeft.innerText=maxGuesse;
         wrongLetter.innerText=incorrect;

    }
   
    typingInput.value='';
    setTimeout(()=>{
           if(correct.length===word.length)
    {
        alert(`congrats! you found the word ${word.toUpperCase()}`) ;
        randomWord();
    }
    else  if(maxGuesse<1)
            {
              alert("Game Over! you don't have remaining Guesses") ;
              for(let i=0 ; i<word.length;i++)
              { 
                      input.querySelectorAll('input')[i].value=word[i];
                      
                  }
                 
                      
              
            }
    },5);
 
    
}
resetBtn.addEventListener('click',randomWord);
typingInput.addEventListener('input',initGame);
input.addEventListener('click',()=>typingInput.focus());
document.addEventListener('keydown',()=>typingInput.focus());


 

 
 