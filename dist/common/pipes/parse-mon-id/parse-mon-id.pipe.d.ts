import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseMonIdPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): string;
}
