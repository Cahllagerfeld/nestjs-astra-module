import { Test, TestingModule } from '@nestjs/testing';
import { AstraService } from './astra.service';
import { CLIENT_OPTIONS } from './constants';
import { AstraCoreModule } from './astra-core.module';
import { StargateConfig } from './interfaces/stargate-config.interface';

describe('AstraService', () => {
  let service: AstraService;

  beforeEach(async () => {
    const options: StargateConfig = {
      authToken: 'asdf',
      baseApiPath: 'v2/namespaces',
      baseUrl: 'http://localhost:8082',
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [AstraCoreModule.forRoot(options)],
      providers: [{ provide: CLIENT_OPTIONS, useValue: options }, AstraService],
    }).compile();

    service = module.get<AstraService>(AstraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
