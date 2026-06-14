import { PartialType } from '@nestjs/swagger';
import { CreateProducaoDto } from './create-producao.dto';

export class UpdateProducaoDto extends PartialType(CreateProducaoDto) {}
