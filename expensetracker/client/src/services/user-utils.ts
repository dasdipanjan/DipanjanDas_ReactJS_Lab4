import IUserItem from "../models/user";
import { getAllUserItems } from "./users-service";

const isValidUser = (userItems: IUserItem[], username: string | undefined, password: string | undefined): boolean => {
    let isValidUser: boolean = false;
    userItems.forEach((userItem) => {
        if (userItem.username === username && userItem.password === password) {
            isValidUser = true;
        }
    });
    return isValidUser;
}

export { isValidUser }