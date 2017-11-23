var PaginationHelper = require('./index');
var helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);

describe("PaginatororHelper", function () {
	test("pageCount() should == 2", function () {
		expect(helper.pageCount()).toBe(2);
	});
	test("itemCount() should == 6", function () {
		expect(helper.itemCount()).toBe(6);
	});

	test("pageItemCount(0) should == 4", function () {
		expect(helper.pageItemCount(0)).toBe(4);
	});


	test("pageItemCount(1) last page - should == 2", function () {
		expect(helper.pageItemCount(1)).toBe(2);
	});

	test("pageItemCount(2) should == -1 since the page is invalid", function () {
		expect(helper.pageItemCount(2)).toBe(-1);
	});


	test("pageIndex(5) should == 1 (zero based index)", function () {
		expect(helper.pageIndex(5)).toBe(1);
	});


	test("pageIndex(2) should == 0", function () {
		expect(helper.pageIndex(2)).toBe(0);
	});


	test("pageIndex(20) should == -1", function () {
		expect(helper.pageIndex(20)).toBe(-1);
	});


	test("pageIndex(-10) should == -1", function () {
		expect(helper.pageIndex(-10)).toBe(-1);
	});
});
