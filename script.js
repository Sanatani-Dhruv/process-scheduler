// Variable Initialization
let runBtn = document.getElementById('runBtn');
let nameInput = document.getElementById('nameInput');
let addBtn = document.getElementById('addProcessBtn');
let burstTimeInput = document.getElementById('burstTimeInput');
let notes = document.getElementById('notifications');
let processAddBlock = document.getElementById('processAddBlock');
let remainingTimeBox_1 = document.getElementById('remainingTimeBox-1');
let remainingTimeBox_2 = document.getElementById('remainingTimeBox-2');
let passedTimeBox_1 = document.getElementById('passedTimeBox-1');
let passedTimeBox_2 = document.getElementById('passedTimeBox-2');
let burstTimeBox = document.getElementById('burstTimeBox');
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
	constructor(processName, burstTime = 5) {
		this.processName = processName;
		this.id = ++process.processCount;
		this.burstTime = burstTime;
		console.log(`New Process Created with ID: ${this.id}`);
		// console.log(`Name: ${this.processName}, ID: ${this.id}, burstTime: ${this.burstTime}sec`);
		this.arrivalTime = process.currentTime;
		this.burstTime;
		process.processArray.push(this);
		console.log(process.processArray);
	}

	static sortOnBurstTime() {

	}

	static addProcess() {
		if (nameInput.value.trim() != '' && burstTimeInput.value.trim() != '') {
			let name = nameInput.value;
			let burstTime = +burstTimeInput.value;
			if (burstTime < 1) {
				notification('burstTime Should be Greater than 1', 'red');
				return false;
			}
			let newProcess = new process(name, burstTime);
			nameInput.value = '';
			burstTimeInput.value = '';
			process.remainingTime += burstTime;
			remainingTimeBox_1.innerHTML = `${process.remainingTime}`
			remainingTimeBox_2.innerHTML = remainingTimeBox_1.innerHTML;
			console.log(`Process Name: ${name}, Burst Time: ${burstTime}`);
			console.log(`Number of Process: ${process.processCount}`);
			let noteContent = `New Process Created with Name: ${name}<br>burstTime: ${burstTime}`;
			process.addProcessBlock(name);

			// Creating Notification
			notification(noteContent)
		} else {
			let noteContent = 'Fill Input Fields with proper Values';
			notification(noteContent, 'red')
		}
	}

	static addProcessBlock(name) {
		// Parent
		let node = document.createElement('div');

		// Children
		let nodeChildMain = document.createElement('div');
		let nodeChildSub = document.createElement('div');

		// Child-1 && Child-2 of Sub-Parent-2
		let nodeChildSub1 = document.createElement('div');
		let nodeChildSub2 = document.createElement('div');

		// Setting Class Names
		nodeChildMain.className = `text-lg mb-2`;
		nodeChildSub.className = `text-sm w-max flex flex-col`;
		nodeChildSub1.className = `w-max`;
		nodeChildSub2.className = `w-max`;

		node.appendChild(nodeChildMain);
		node.appendChild(nodeChildSub);
		nodeChildSub.appendChild(nodeChildSub1);
		nodeChildSub.appendChild(nodeChildSub2);

		let btSpan = document.createElement('span');
		let atSpan = document.createElement('span');
		let btValue = document.createElement('span');
		let atValue = document.createElement('span');
		let btId = document.createAttribute('id');
		let atId = document.createAttribute('id');

		// ID Setting Remaining Note For You
		btSpan.innerText = "BT:";
		atSpan.innerText = "AT:";

		nodeChildSub1.appendChild(btSpan);
		nodeChildSub1.appendChild(atSpan);

		nodeChildMain.innerHTML = name;

		let processClass = `shadow-xl hover:scale-110 transition-all text-lg p-10 rounded font-medium w-22 h-40 flex flex-col justify-center items-center text-white bg-${colorArr[currColor++]}-600`;
		if (currColor == 5)
			currColor = 0;
		node.className = processClass;
		// node.innerHTML = name;
		console.log('Process Block:');
		processBlock.appendChild(node);
	}

	static handleStoppedRunning() {
		console.log('No Process in Queue!!');
		runBtn.disabled = false; // Enable till Process End
		runBtn.innerText = 'Run Processes';
		if (process.remainingTime == 0 && process.totalTime != 0) {
			notification('Process Completed!!');
		} else {
			notification('No Process in Queue!!', 'yellow')
		}
	}

	static async runProcess() {
		process.running = true;
		let i=0;
		do {
			if (process.remainingTime === 0 ) {
				process.handleStoppedRunning();
				break;
			}

			runBtn.innerText = 'Stop Process!!';
			// runBtn.removeEventListener('click', process.runProcess); // Removing Event Listener
			// runBtn.addEventListener('click', process.stopProcess); // Add New Event Listener
			console.log(runBtn);
			runBtn.disabled = true; // Disable till Process End

			process.running = await process.runProcessInstance()
				.then(() => {
					console.log('Process Running!!');
					return true;
				})
				.catch(() => {
					process.handleStoppedRunning();
					return false;
				});
		} while (process.running);
	}

	static runProcessInstance() {
		return new Promise((resolve, reject) => {
			console.log(process.remainingTime)
			setTimeout(()=> {
				if (process.remainingTime > 0) {
					console.log(process.processArray);
					process.remainingTime--;
					process.currentTime++;
					passedTimeBox_1.innerHTML = ++process.totalTime;
					passedTimeBox_2.innerHTML = passedTimeBox_1.innerHTML;
					remainingTimeBox_2.innerHTML = `${+process.remainingTime}`;
					remainingTimeBox_1.innerHTML = `${+process.remainingTime}`;
					resolve();
				} else {
					process.remainingTime = 0;
					reject();
				}
			}, 1000);
		});
	}
}

// Setting Default remaining Time in remainingTimeBlock;
remainingTimeBox_1.innerHTML = process.remainingTime;
remainingTimeBox_2.innerHTML = process.remainingTime;

function notification(content, color = 'green', textcolor = 'white') {
	let newNote = document.createElement('div');
	newNote.className = `p-3 cursor-pointer rounded pl-8 pr-8 font-bold shadow-xl bg-${color}-700 text-${textcolor}`;
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
	}, 5000)
	return newNote;
}

// Handling Global Event Listener
runBtn.addEventListener('click', process.runProcess);
addBtn.addEventListener('click', process.addProcess);
