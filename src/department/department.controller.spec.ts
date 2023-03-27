import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from 'src/department/department.controller';
import { DepartmentService } from 'src/department/department.service';

describe('DepartmentController', () => {
  let controller: DepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [DepartmentService],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
