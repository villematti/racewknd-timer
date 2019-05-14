export class Start {
    constructor(
        public startName: string,
        public blackFlag: boolean = false,
        public classId: string,
        public competitors: string[],
        public currentLap: number = 0,
        public finished: boolean = false,
        public id: string,
        public laps: number,
        public lastLap: boolean = false,
        public raceId: string,
        public redFlag: boolean = false,
        public started: boolean = false,
        public yellowFlag: boolean = false,
        public startTime?: number
    ) {}
}
