import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

export type SortingOptions = [[string, string]] | undefined

@Injectable()
export class SortingQueryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): SortingOptions {
        const validSortFields = ['rating', 'price']

        if (value) {
            const [sortBy, sortOrder] = value.split(',')

            if (validSortFields.includes(sortBy)) {
                return [[sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']]
            }
        }

        return undefined
    }
}
