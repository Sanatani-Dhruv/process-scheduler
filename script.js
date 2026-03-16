class process {
	static totalTime = 0;
	constructor(processName, id, duration = 5) {
		this.processName = processName;
		this.id = id;
		this.duration = duration;
		console.log("New Process Created");
		console.log(`Name: ${this.processName}, ID: ${this.id}, Duration: ${this.duration}sec`);
		this.arrivalTime;
		this.burstTime;
		this.calcArrivalTime();
	}

	calcArrivalTime() {
		console.log(process.totalTime);
	}
}

let newPro = new process("P1",10, 20);

let processArray = [];
processArray.push(newPro);
console.log(processArray);

let oldprocessArray = processArray;

while (process.totalTime == 30) {
	console.log();
	process.totalTime++;
}
