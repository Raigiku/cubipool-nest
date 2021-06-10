export class GetAllPrizesUserStoryOutput {
  userAvailablePoints: number;
  prizes: GetAllPrizesPrizeUserStoryOutput[];

  constructor(
    availablePoints: number,
    prizes: GetAllPrizesPrizeUserStoryOutput[]
  ) {
    this.userAvailablePoints = availablePoints;
    this.prizes = prizes;
  }
}

export class GetAllPrizesPrizeUserStoryOutput {
  id: string;
  name: string;
  description: string;
  pointsNeeded: number;

  constructor(
    id: string,
    name: string,
    description: string,
    pointsNeeded: number
  ) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.pointsNeeded = pointsNeeded;
  }
}
