import { Test, TestingModule } from '@nestjs/testing';
import { CondosController } from './condos.controller';

describe('CondosController', () => {
  let controller: CondosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondosController],
    }).compile();

    controller = module.get<CondosController>(CondosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
