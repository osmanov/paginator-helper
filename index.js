(function () {
	'use strict';

	var Params = {
		limitOnPage: 0,
		itemCount: 0,
		pageCount: 0
	};

	function Page(pageIndex) {
		this._setIndex(pageIndex);
	}

	Page.prototype.getItemCount = function () {
		return this._itemCount;
	};

	Page.prototype.setItemCount = function (value) {
		this._itemCount = value;
	};

	Page.prototype._setIndex = function (index) {
		this._index = index;
	};

	Page.prototype.getIndex = function () {
		return this._index;
	};


	function Item() {
		this.setPage = function (page) {
			this._page = page;
		};

		this.getPage = function () {
			return this._page;
		};
	}


	function PaginatorManager(items) {
		this._setItemCountOnLastPage();
		this._setPageCount();
		this._items = {};
		this._setPages(setItems.bind(this));


		function setItems(page) {
			var pageIndex = page.getIndex();
			var startSlice = pageIndex * Params.limitOnPage;
			var itemsPage = items.slice(startSlice, startSlice + Params.limitOnPage);
			var itemsPageLength = itemsPage.length;
			page.setItemCount(itemsPageLength);
			for (var i = 0; i < itemsPageLength; i++) {
				var itemIndex = i + startSlice;
				this._items[itemIndex] = new Item();
				this._items[itemIndex].setPage(page);
			}
		}
	}


	PaginatorManager.prototype = {
		constructor: PaginatorManager,

		_getItemCountOnLastPage: function () {
			return this._itemCountOnLastPage;
		},
		_setItemCountOnLastPage: function () {
			var rest = Params.itemCount % Params.limitOnPage;
			this._itemCountOnLastPage = rest || Params.limitOnPage;
		},
		_setPages: function (callback) {
			this._pages = [];
			for (var i = 0, length = this.getPageCount(); i < length; i++) {
				var page = new Page(i);
				callback(page);
				this._pages.push(page);
			}
		},
		_getPages: function () {
			return this._pages;
		},
		getPageByIndex: function (pageIndex) {
			return this._getPages()[pageIndex];
		},
		_getItems: function () {
			return this._items;
		},
		getItemByIndex: function (itemIndex) {
			return this._getItems()[itemIndex];
		},
		_isLastPageCntItemsLessLimit: function () {
			return this._getItemCountOnLastPage() !== Params.limitOnPage;
		},
		_setPageCount: function () {
			this._pageCount = Params.itemCount / Params.limitOnPage;

			if (this._isLastPageCntItemsLessLimit()) {
				var restedPage = 1;
				this._pageCount = ~~(this._pageCount) + restedPage; //~~gimme the whole part and append to the page with rest
			}
		},
		getPageCount: function () {
			return this._pageCount;
		}
	};


	function PaginationHelper(items, limitOnPage) {
		this._init(items, limitOnPage);
	}

	PaginationHelper.prototype = {
		constructor: PaginationHelper,
		_init: function (items, limitOnPage) {
			Params.itemCount = items.length;
			Params.limitOnPage = limitOnPage;

			this._setPaginatorManager(items.slice());
		},
		update: function (items, limitOnPage) {
			this._init(items, limitOnPage);
		},
		_setPaginatorManager: function (items) {
			this._paginatorManager = new PaginatorManager(items);
		},
		_getPaginatorManager: function () {
			return this._paginatorManager;
		},
		itemCount: function () {
			return Params.itemCount;
		},

		pageCount: function () {
			return this._getPaginatorManager().getPageCount();
		},
		pageItemCount: function (pageIndex) {
			var page = this._getPaginatorManager().getPageByIndex(pageIndex);
			return (page) ? page.getItemCount() : -1;
		},
		pageIndex: function (itemIndex) {
			var item = this._getPaginatorManager().getItemByIndex(itemIndex);
			return (item) ? item.getPage().getIndex() : -1;
		}
	};


	if (typeof module !== 'undefined' && module.exports) {
		PaginationHelper.default = PaginationHelper;
		module.exports = PaginationHelper;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'paginationHelper', consistent with npm package name
		define('PaginationHelper', [], function () {
			return PaginationHelper;
		});
	} else {
		window.PaginationHelper = PaginationHelper;
	}
}());
