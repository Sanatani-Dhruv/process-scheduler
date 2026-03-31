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
let ganntBox = document.getElementById('ganntBox');
let avgBurstTimeBox = document.getElementById('avgBurstTimeBox');
let totalBurstTimeBox = document.getElementById('totalBurstTimeBox');
let currentProcessBox = document.getElementById('currentProcessBox');
let colorArr = ['blue', 'red', 'green', 'pink', 'orange'];
let currColor = 0;
let processBlock = document.getElementById('processBlock');

// Process Object
class process {
	static currentTime = 0;
	static totalTime = 0;
	static remainingTime = 0;
	static totalBurstTime = 0;
	static avgBurstTime = 0;
	static finishedBurstTime = 0;
	static running  = false;
	static pArray = [];
	static processCount = 0;
	static currentIndex = 0;
	constructor(processName, burstTime = 5) {
		this.processName = processName;
		this.id = ++process.processCount;
		this.burstTime = burstTime;
		this.waitingTime = 0;
		console.log(`New Process Created with ID: ${this.id}`);
		// console.log(`Name: ${this.processName}, ID: ${this.id}, burstTime: ${this.burstTime}sec`);
		this.arrivalTime = process.currentTime;
		this.burstTime;
		process.pArray.push(this);
		console.log(process.pArray);
	}

	static addProcess() {
		if (nameInput.value.trim() != '' && burstTimeInput.value.trim() != '') {
			let name = nameInput.value;
			let burstTime = +burstTimeInput.value;
			if (burstTime < 1) {
				notification('Duration Should be Greater than or Equal to 1', 'red');
				return false;
			}
			let newProcess = new process(name, burstTime);
			nameInput.value = '';
			burstTimeInput.value = '';
			process.remainingTime += burstTime;
			process.totalBurstTime += burstTime;
			process.avgBurstTime = (process.totalBurstTime / process.pArray.length);

			remainingTimeBox_1.innerHTML = `${process.remainingTime}`
			remainingTimeBox_2.innerHTML = remainingTimeBox_1.innerHTML;
			totalBurstTimeBox.innerHTML = process.totalBurstTime;
			avgBurstTimeBox.innerHTML = process.avgBurstTime;

			if (currentProcessBox.innerHTML === '')
				currentProcessBox.innerHTML = process.pArray[0].processName;

			console.log(`Process Name: ${name}, Burst Time: ${burstTime}`);
			console.log(`Number of Process: ${process.processCount}`);
			let noteContent = `New Process Created with Name: ${name}<br>burstTime: ${burstTime}`;
			process.addProcessBlock(name, newProcess.id, newProcess.burstTime);

			// Creating Notification
			notification(noteContent)
		} else {
			let noteContent = 'Fill Input Fields with proper Values';
			notification(noteContent, 'red')
		}
	}

	static generateGanntChartInstance(pArr) {
		let arr = pArr;
		for (let i=0; i < arr.length;i++) {
			let pr = arr[i];
			// if (i == 0) {
			let block = document.createElement('div');
			block.className = `border-r border-l w-max p-2 relative`;
			block.innerHTML = `${pr.processName}`;
			let child = document.createElement('div');
			child.className = `absolute -left-2.5 -bottom-6`;
			if (i == 0) {
				child.innerHTML = `${pr.arrivalTime}s`;
			} else {
				for (let j = 0;j < i;j++) {
					console.log(`Burst Time: ${arr[j]}`);
					child.innerHTML = +child.innerHTML+ arr[j].burstTime;
				}
				child.innerHTML += 's';
			}

			if (i == arr.length) {
				child.innerHTML 
			}
			block.appendChild(child);
			console.log(block);
			ganntBox.appendChild(block);
			// }
		}
	}

	static addProcessBlock(name, id, bt) {
		// Parent
		let node = document.createElement('div');
		node.id = `nodeId-${id}`;

		// Children
		let nodeChildMain = document.createElement('div');
		let nodeChildSub = document.createElement('div');
		let nodeChildStatus = document.createElement('div');
		nodeChildStatus.id = `nodeStatus-${id}`;
		nodeChildStatus.className = `absolute -top-10 text-black p-2 pt-1 pb-1 rounded`;
		// nodeChildStatus.style.top = -10;

		// Child-1 && Child-2 of Sub-Parent-2
		let nodeChildSub1 = document.createElement('div');
		let nodeChildSub2 = document.createElement('div');
		let nodeChildSub3 = document.createElement('div');

		// Setting Class Names
		nodeChildMain.className = `text-lg mb-2`;
		nodeChildSub.className = `text-sm w-max flex flex-col`;
		nodeChildSub1.className = `w-max`;
		nodeChildSub2.className = `w-max`;
		nodeChildSub3.className = `w-max`;

		node.appendChild(nodeChildMain);
		node.appendChild(nodeChildSub);
		node.appendChild(nodeChildStatus);
		nodeChildSub.appendChild(nodeChildSub1);
		nodeChildSub.appendChild(nodeChildSub2);
		nodeChildSub.appendChild(nodeChildSub3);

		let btSpan = document.createElement('span');
		let atSpan = document.createElement('span');
		let wtSpan = document.createElement('span');
		let btValue = document.createElement('span');
		let atValue = document.createElement('span');
		let wtValue = document.createElement('span');

		// ID Setting 
		let btId = document.createAttribute('id');
		let atId = document.createAttribute('id');
		let wtId = document.createAttribute('id');
		btId.value = `bt-${id}`;
		atId.value = `at-${id}`;
		wtId.value = `wt-${id}`;
		btValue.setAttributeNode(btId);
		atValue.setAttributeNode(atId);
		wtValue.setAttributeNode(wtId);

		// Labels setting of BT and AT in DOM
		btSpan.innerText = "BT: ";
		atSpan.innerText = "AT: ";
		wtSpan.innerText = "WT: ";

		btValue.innerHTML = bt;
		atValue.innerHTML = process.currentTime;
		wtValue.innerHTML = '0';

		// Setting Burst and Arrival Time of Process in DOM
		nodeChildSub1.appendChild(btSpan);
		btSpan.appendChild(btValue);
		nodeChildSub2.appendChild(atSpan);
		atSpan.appendChild(atValue);
		nodeChildSub3.appendChild(wtSpan);
		wtSpan.appendChild(wtValue);

		// Seconds Label putting
		btSpan.innerHTML += 's';
		atSpan.innerHTML += 's';
		wtSpan.innerHTML += 's';

		nodeChildMain.innerHTML = name;
		console.log(btValue.innerHTML)

		let processClass = `relative shadow-xl hover:scale-110 transition-all text-lg p-10 rounded font-medium w-22 h-40 flex flex-col justify-center items-center text-white bg-${colorArr[currColor++]}-600`;
		if (currColor == 5)
			currColor = 0;
		node.className = processClass;
		// node.innerHTML = name;
		console.log('Process Block:');
		processBlock.appendChild(node);
	}

	static handleStoppedRunning() {
		runBtn.disabled = false; // Enable till Process End
		runBtn.innerText = 'Run Processes';
		if (process.remainingTime == 0 && process.currentTime != 0) {
			notification('Process Completed!!');
			ganntBox.innerHTML = '';
			process.generateGanntChartInstance(process.pArray);
			for (let i = 0; i < process.pArray.length;i++) {
				document.getElementById(`nodeStatus-${i+1}`).innerHTML = `<div class='text-md'>Completed</div>`;
			}
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

			// runBtn.innerText = 'Stop Process!!';
			// runBtn.removeEventListener('click', process.runProcess); // Removing Event Listener
			// runBtn.addEventListener('click', process.stopProcess); // Add New Event Listener
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
				let currentProcess = process.pArray[process.currentIndex];
				let previousProcess = process.pArray[process.currentIndex - 1];
				let previousProcessNode = document.getElementById(`nodeId-${process.currentIndex}`);
				currentProcessBox.innerHTML = currentProcess.processName;
				if (currentProcess && (process.finishedBurstTime + currentProcess.burstTime) === process.currentTime) {
					console.log(`Process with PID: ${process.pArray[process.currentIndex].id} Completed`);
					notification(`Process with PID: ${process.pArray[process.currentIndex].id} Completed`);
					process.currentIndex++;
					process.finishedBurstTime += currentProcess.burstTime;
				}

				if (previousProcessNode && previousProcessNode.innerHTML) {
					let statusText;
					statusText = document.getElementById(`nodeStatus-${process.currentIndex}`);
					console.log(statusText);
					statusText.innerHTML = "Completed";
					statusText.style.display = 'block';
					console.log(previousProcessNode.childNodes[0]);
				}

				console.log(process.finishedBurstTime + currentProcess.burstTime);
				for (let i = process.currentIndex; i < process.pArray.length;i++) {
					if (process.pArray[i] !== currentProcess) {
						console.log(document.getElementById(`wt-${i+1}`));
						document.getElementById(`wt-${i+1}`).innerHTML = process.pArray[i].waitingTime;
						console.log(`WT[${process.pArray[i].processName}]: ${process.pArray[i].waitingTime}`);
						process.pArray[i].waitingTime++;
					}
				}

				if (process.remainingTime > 0) {
					console.log(`Finished BT: ${process.finishedBurstTime}`);
					process.remainingTime--;
					process.currentTime++;
					passedTimeBox_1.innerHTML = process.currentTime;
					passedTimeBox_2.innerHTML = passedTimeBox_1.innerHTML;
					remainingTimeBox_2.innerHTML = `${+process.remainingTime}`;
					remainingTimeBox_1.innerHTML = `${+process.remainingTime}`;
					resolve();
				} else {
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
		notes.innerHTML += "<h1 class='text-center font-bold text-xl'>Notifications</h1>"
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
