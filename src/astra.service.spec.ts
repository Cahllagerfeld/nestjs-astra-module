import { Test, TestingModule } from "@nestjs/testing";
import { AstraService } from "./astra.service";

describe("AstraService", () => {
  let service: AstraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AstraService],
    }).compile();

    service = module.get<AstraService>(AstraService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
