import { 
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsTimeZone 
} from 'class-validator';
  
export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  openingTime: string;

  @IsString()
  @IsNotEmpty()
  closingTime: string;

  id: number;
}