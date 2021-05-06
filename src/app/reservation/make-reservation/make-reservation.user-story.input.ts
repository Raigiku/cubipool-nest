export class MakeReservationUserStoryInput {
  startTime: string;
  userId: string;
  cubicleId: string;
  endTime: string;
  constructor(
    startTime: string,
    userId: string,
    cubicleId: string,
    endTime: string
  ) {
    this.cubicleId = cubicleId;
    this.startTime = startTime;
    this.userId = userId;
    this.endTime = endTime;
  }
}
