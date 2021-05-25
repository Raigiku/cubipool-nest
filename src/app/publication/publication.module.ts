import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { CreatePublicationUserStory } from "./create-publication";
import { PublicationController } from "./publication.controller";

@Module({
  imports: [PersistenceModule],
  controllers: [PublicationController],
  providers: [CreatePublicationUserStory],
})
export class PublicationModule {}
