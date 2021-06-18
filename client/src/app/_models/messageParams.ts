import { Message } from "./message";

export class MessageParams {
    pageNumber = 1;
    pageSize = 5;
    container = 'Inbox';

    constructor(message: Message) { }
}