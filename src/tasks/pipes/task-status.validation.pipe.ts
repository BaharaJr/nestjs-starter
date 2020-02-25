import { PipeTransform } from '@nestjs/common';

export class TaskStatusValidation implements PipeTransform {
  transform(value: any) {
    console.log('value:::', value);
    return value;
  }
}
