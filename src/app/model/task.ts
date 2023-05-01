export interface ITask {
    id: number;
    deadline: string;
    text: string,  
    state: string,
    title: string,
    // images: Array<File>;
    listOfImage: Array<string>;
    // images: number[];
}