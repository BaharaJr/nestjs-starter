import { TaskStatus } from "../tasks.model";

export class TasksFilterDto {
    status: TaskStatus;
    search: string;
}