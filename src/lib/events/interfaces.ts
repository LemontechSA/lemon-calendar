export interface IEvent {
  id: number;
  title: string;
  location: string;
  description: string | null;
  startAt: Date;
  endAt: Date;
  allDay: boolean;
}
