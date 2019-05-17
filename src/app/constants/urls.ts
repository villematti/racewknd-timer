export class Constants {
    static readonly BASE_URL = "https://racewkndapp.com";
    static readonly GET_RACES = Constants.withPath("/get-races");
    static readonly GET_STARTS = Constants.withPath("/get-starts");
    static readonly GET_COMPETITORS = Constants.withPath("/get-competitors");
    static readonly GET_CLASSES = Constants.withPath("/get-classes");
    static readonly CREATE_START = Constants.withPath("/create-start");
    static readonly SET_START_FLAG = Constants.withPath("/set-start-flag");
    static readonly GET_START_BY_ID = Constants.withPath("/get-start-by-id");
    static readonly START_START = Constants.withPath("/start-start");
    static readonly ADD_LAPTIME = Constants.withPath("/add-laptime");
    static readonly GET_DRIVERS = Constants.withPath("/get-drivers-by-class");
    static readonly GET_STANDINGS = Constants.withPath("/get-current-standings");
    
    static withPath(val: string): string {
        return `${Constants.BASE_URL}${val}`;
    }
}