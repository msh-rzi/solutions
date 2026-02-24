import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum PostingDirection {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class PostingDto {
  @ApiProperty({
    description: 'Account identifier associated with this posting.',
    example: 1,
  })
  @IsNumber()
  accountId!: number;

  @ApiProperty({
    description:
      'Positive numeric amount represented as a string with up to 4 decimals.',
    example: '150.2500',
  })
  @IsString()
  @Matches(/^\d+(\.\d{1,4})?$/, {
    message: 'Amount must be a valid numeric string',
  })
  amount!: string;

  @ApiProperty({ enum: PostingDirection, example: PostingDirection.DEBIT })
  @IsEnum(PostingDirection)
  direction!: PostingDirection;
}

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Human-readable transaction description.',
    example: 'Invoice payment settlement',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Set of postings that must balance to zero.',
    type: [PostingDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostingDto)
  postings!: PostingDto[];
}
