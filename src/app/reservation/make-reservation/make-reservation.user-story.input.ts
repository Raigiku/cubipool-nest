export class MakeReservationUserStoryInput {

  startTime:string;
  userId:string;
  cubicleId:string;
  constructor(startTime: string, userId: string,cubicleId:string) {
    
      this.cubicleId=cubicleId;
      this.startTime=startTime;
      this.userId=userId;

  }
}
