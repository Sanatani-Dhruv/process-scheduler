// Variable Initialization
let runBtn = document.getElementById('runBtn');
let nameInput = document.getElementById('nameInput');
let addBtn = document.getElementById('addProcessBtn');
let durationInput = document.getElementById('durationInput');
let notes = document.getElementById('notifications');
let processAddBlock = document.getElementById('processAddBlock');
let remainingTimeBox = document.getElementById('remainingTimeBox');
let colorArr = ['blue', 'red', 'green', 'pink', 'orange'];
let currColor = 0;
let processBlock = document.getElementById('processBlock');

// Process Object
class process {
	static currentTime = 0;
	static totalTime = 0;
	static remainingTime = 0;
	static running  = false;
	static processArray = [];
	static processCount = 0;
	constructor(processName, duration = 5) {
		this.processName = processName;
		this.id = ++process.processCount;
		this.duration = duration;
		console.log(`New Process Created with ID: ${this.id}`);
		// console.log(`Name: ${this.processName}, ID: ${this.id}, Duration: ${this.duration}sec`);
		this.arrivalTime = process.currentTime;
		this.burstTime;
		this.calcArrivalTime();
		process.processArray.push(this);
	}

	static addProcess() {
		if (nameInput.value.trim() != '' && durationInput.value.trim() != '') {
			let name = nameInput.value;
			let duration = durationInput.value;
			let newProcess = new process(name, duration);
			nameInput.value = '';
			durationInput.value = '';
			process.remainingTime += +duration;
			remainingTimeBox.innerHTML = `${process.remainingTime}s`
			console.log(`Process Name: ${name}, Duration: ${duration}`);
			console.log(`Number of Process: ${process.processCount}`);
			let noteContent = `New Process Created with Name: ${name}<br>Duration: ${duration}s`;
			process.addProcessBlock(name);

			// Creating Notification
			notification(noteContent)
		} else {
			let noteContent = 'Fill Input Fields with proper Values';
			notification(noteContent, 'red')
		}
	}

	static addProcessBlock(name) {
		let processNode = document.createElement('div');
		let processClass = `shadow-xl hover:scale-110 transition-all text-xl p-10 rounded font-medium w-10 h-40 flex justify-center items-center text-white bg-${colorArr[currColor++]}-600`;
		if (currColor == 5)
			currColor = 0;
		processNode.className = processClass;
		processNode.innerHTML = name;
		console.log('Process Block:');
		processBlock.appendChild(processNode);
	}

	calcArrivalTime() {
		(!this.arrivalTime) ?? arrivalTime++;
		let arrivalTime = console.log(`Arrival Time of ${this.id}: ${process.totalTime}s`);
	}

	static async runProcess() {
		process.running = true;
		let i=0;
		while (process.running) {
			process.running = await process.runProcessInstance()
				.then(() => {console.log('Complete');return true})
				.catch(() => false);
			console.log('Process Ran')
		}
	}

	static runProcessInstance() {
		return new Promise((resolve, reject) => {
			if (process.remainingTime > 0) {
				process.remainingTime--;
				setTimeout(() => {
					remainingTimeBox.innerHTML = `${+process.remainingTime}s`;
					resolve();
				}, 1000);
			} else {
				reject();
			}
		});
	}
}

remainingTimeBox.innerHTML = `${+process.remainingTime}s`

function notification(content, color = 'green', textcolor = 'white', classes = `p-3 rounded pl-8 pr-8 font-bold shadow-xl`) {
	let newNote = document.createElement('div');
	newNote.className= classes + ` bg-${color}-700 text-${textcolor}`;
	newNote.innerHTML = content;
	if (!notes.childNodes[1]) {
		notes.innerHTML+="<h1 class='text-center font-bold text-xl'>Notifications</h1>"
	}
	newNote.addEventListener('click',(e) => {
		e.target.remove();
		if (!notes.childNodes[1]) {
			notes.innerHTML='';
		}
	});
	notes.appendChild(newNote);
	setInterval(() => {
		newNote.remove();
		if (!notes.childNodes[1]) {
			notes.innerHTML='';
		}
	}, 3000)
	return newNote;
}

runBtn.addEventListener('click', process.runProcess);

addBtn.addEventListener('click', process.addProcess);
