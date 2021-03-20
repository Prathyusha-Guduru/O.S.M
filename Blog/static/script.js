const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
	{
	  question: "Describe your current mood",
	  answers: {
		a: ["Terrible,I'm fed up ",4],
		b: ["I'm worried abour some things",2],
		c: ["Antisocial",3],
		d : ["Pretty happy",1]
	  }
	},
	{
		question: "How do people describe you?",
		answers: {
		  a: ["Happy ",1],
		  b: ["Unhappy",4],
		  c: ["Socially akward",2],
		  d : ["Cold",3]
		}
	  },
	  {
		question: "Do you think you have a mental health issue?",
		answers: {
		  a: ["Well,I feel very sad a lot of the time",4],
		  b: ["I'm worried that I'm too anxious",2],
		  c: ["I don't think so",1],
		  d : ["I think I'm too antisocial",3]
		}
	  },
	  {
		question: "What is your role in your family?",
		answers: {
		  a: ["I don't have a role",3],
		  b: ["The sensible one",2],
		  c: ["The fun sociable one",1],
		  d : ["The quiet one",4]
		}
	  },
	  {
		question: "Do you like to socialize?",
		answers: {
		  a: ["Yes, If it's with people I know",2],
		  b: ["Yes, I love hanging out",1],
		  c: ["I like being alone",3],
		  d : ["If I can avoid it, I will",4]
		}
	  },
	  {
		question: "Choose a quote",
		answers: {
		  a: ["Life's a bitch, then you die",3],
		  b: ["Hard times reveal true friends",4],
		  c: ["Worrying is as productive as chewing gum",2],
		  d : ["Alright look on the bright side of the life",1]
		}
	  },
	  {
		question: "Are you in control of your emotions?",
		answers: {
		  a: ["Yes, I'd say so ",4],
		  b: ["I don't really have emotions",3],
		  c: ["Yes, pretty much all of the time",1],
		  d : ["Not really, No,",2]
		}
	  },
	  {
		question: "How do you spend your free time?",
		answers: {
		  a: ["Thinking about things",2],
		  b: ["I love to watch horror movies",3],
		  c: ["Listening to music",4],
		  d : ["Seeing friends and family",1]
		}
	  },
	  {
		question: "Choose one wish",
		answers: {
		  a: ["To always be happy",1],
		  b: ["To be on my own more",3],
		  c: ["To be able to stop worrying",2],
		  d : ["To atleast feel content",4]
		}
	  },
	  {
		question: "Do you love life?",
		answers: {
		  a: ["I try but its a struggle for me",4],
		  b: ["I do, I wish it was easier",2],
		  c: ["Yes, I really do",1],
		  d : ["No, not really",3]
		}
	  },
	  {
		question: "How do people describe you",
		answers: {
		  a: ["Happy ",1],
		  b: ["Unhappy",4],
		  c: ["Socially akward",2],
		  d : ["Cold",3]
		}
	}

	
  ];

const disorderFree = "You don't seem to be suffering from any symptoms, and overall you are balanced and happy. Remember that mental health issues affect a lot of people, so keep an eye on your friends and family to make sure they're well and happy."
const anxiety = "You are a serious worrier, and you fear that a panic attack could strike at any time. This holds you back from living your life to the full. Confiding in those around you and talking about your worries can help, and meditation and breathing."
const antisocial = "You prefer to be on your own and you struggle to develop relationships with others. You lack empathy and you don't exhibit any emotions. Getting to the root of this problem will help you to understand it and tackle it. so speak up. "
const depression = "You are burdened by feelings of hopelessness and helplessness, and you aren't truly engaged in life. You deserve to be happy and healthy, and talking to a doctor could go a long way towards getting you to a more content place. "


function buildQuiz(){
	const output = [];

	
	myQuestions.forEach((currentQuestion,questionNumber) =>{
		const answers = [];
		
		for(letter in currentQuestion.answers){
			answers.push(`<label>
		  <input type="radio" name="question${questionNumber}" value="${letter}">
		  ${letter} :
		  ${currentQuestion.answers[letter][0]}
		</label>`)
		}
	
		output.push(`<div class="question"> ${currentQuestion.question} </div>
		<div class="answers"> ${answers.join('<br>')} </div>`)
	});
	
	quizContainer.innerHTML = output.join('');
}

function showResults(){
	  
	  const answerContainers = quizContainer.querySelectorAll('.answers');

	  
	  let score = 0;
	
	  
	  myQuestions.forEach( (currentQuestion, questionNumber) => {
	
		
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;
		console.log(`selector is ${selector}`);
		console.log(`userAnwser is ${userAnswer}`);
		score += myQuestions[questionNumber].answers[userAnswer][1]
		console.log(myQuestions[questionNumber].answers[userAnswer][1]);
	  });
	  let result = "lol"
	  if ( score >= 10 && score <=16){
		console.log(`disorder free : ${score}`);
		  result = disorderFree
		  disorderName = 'normal'
	  }
	  else if(score >= 17 && score <=24){
		console.log(`anxiery : ${score}`);
		result = anxiety
		disorderName = 'anxious'
	  }
	  else if(score >= 25 && score <=32){
		console.log(`anti social : ${score}`);
		result = antisocial
		disorderName = 'antisocial'
	  }
	  else if(score >= 33 && score <= 40){
		console.log(`depression : ${score}`);
		  result = depression
		  disorderName = 'depressed'
	  }
	  console.log(result);
	  resultsContainer.innerHTML = `You are mentally <strong>${disorderName}</strong>, ${result}`;
	  $.post("/mental_health", {
		mentalHealthStaus: disorderName
	});
}


buildQuiz();

submitButton.addEventListener('click', showResults);

