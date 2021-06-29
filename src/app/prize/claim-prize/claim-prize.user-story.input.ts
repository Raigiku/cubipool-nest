export class ClaimPrizeUserStoryInput {
  userId: string;
  prizeId: string;
  constructor(userId: string, prizeId: string) {
    this.userId = userId;
    this.prizeId = prizeId;
  }
}
