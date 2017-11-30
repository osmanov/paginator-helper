# PaginationHelper

[![Build Status](https://travis-ci.org/osmanov/paginator-helper.svg?branch=master)](https://travis-ci.org/osmanov/paginator-helper)

PaginationHelper class is a utility class helpful for querying paging information related to an array.
The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page.

## Usage
The constructor takes in an array of items and an integer indicating how many items fit within a single page:

```js
const helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
helper.pageCount(); // 2
helper.itemCount(); // 6
helper.pageItemCount(0); // 4
helper.pageItemCount(1); // 2
helper.pageItemCount(2); // -1

// pageIndex takes an item index and returns the page that it belongs on
helper.pageIndex(5); // 1
helper.pageIndex(2); // 0
helper.pageIndex(20); // -1
helper.pageIndex(-10); // -1
```

## API

 ### itemCount()
 returns the number of items within the entire collection.
 
 ### pageCount()
 returns the number of pages
 
 ### pageItemCount(pageIndex)
 returns the number of items on the current page.This method will return -1 for `pageIndex` values that are out of range.
 
 ### pageIndex(itemIndex)
 determines what page an item is on.This method will return -1 for `itemIndex` values that are out of range

## License

[MIT](LICENSE). Copyright (c) 2017 Renat Osmanov.