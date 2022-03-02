export type Nome = {
    id: number;
    name: string;
}

type UserEvent = Event & { UserId: string }