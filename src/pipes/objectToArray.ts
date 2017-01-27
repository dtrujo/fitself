import { Injectable, Pipe } from '@angular/core';

/**
 Pipe to convert [object object] into a single array
*/
@Pipe({
  name: 'objectToArray'
})
@Injectable()
export class ObjectToArray {
  transform(val) {
    return Array.isArray(val)
          ? val : [ val ];
  }
}
