# Query Params syntax guide

Simple library to set and get the search string

## Example

```
import { getQueryParams, setQueryParams } from "query-params-utils"

/** example.com?arr=1&arr=2&param=3 */
console.log(getQueryParams()); // { arr:[1,2], param: 3 }

setQueryParams({ arr:[1,2], param: 3 }); // example.com?arr=1&arr=2&param=3

```
