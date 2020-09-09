const UnionFind = require('./UnionFind')

module.exports = class Percolation {
	// creates n-by-n grid, with all sites initially blocked
	constructor(size) {
		if (size <= 0) {
			throw Error(`size should be greater than zero`)
		}
		this.size = size
		this.total = size * size + 2 // top & bottom

		this.is_open = []
		this.is_open[0] = true // top
		this.is_open[this.total - 1] = true // bottom

		this.fullUF = new UnionFind(this.total - 1)
		this.percolateUF = new UnionFind(this.total)
		this.number_of_open_sites = 0

		this.top = 0
		this.bottom = this.total - 1

		// 最上排和最下排有 union 不代表有 open
		// for (let i = 1; i <= size; i++) {
		// 	this.percolateUF.union(this.top, i)// connect top
		// 	this.percolateUF.union(this.bottom, (this.size - 1) * this.size + i) // connect bottom

		// 	this.fullUF.union(this.top, i) // connect top
		// }
	}

	// opens the site (row, col) if it is not open already
	open(row, col) {
		if (this.isOpen(this.pos(row, col))) {
			return
		}
		this.is_open[this.pos(row, col)] = true
		this.number_of_open_sites++

		if (row == 1) {
			this.percolateUF.union(this.top, this.pos(row, col))
			this.fullUF.union(this.top, this.pos(row, col))
		}

		if (row == this.size) {
			this.percolateUF.union(this.bottom, this.pos(row, col))
		}

		if (row - 1 > 0 && this.isOpen(row - 1, col)) {
			this.percolateUF.union(this.pos(row - 1, col), this.pos(row, col))
			this.fullUF.union(this.pos(row - 1, col), this.pos(row, col))
		}
		if (row + 1 <= this.size && this.isOpen(row + 1, col)) {
			this.percolateUF.union(this.pos(row + 1, col), this.pos(row, col))
			this.fullUF.union(this.pos(row + 1, col), this.pos(row, col))
		}
		if (col - 1 > 0 && this.isOpen(row, col - 1)) {
			this.percolateUF.union(this.pos(row, col - 1), this.pos(row, col))
			this.fullUF.union(this.pos(row, col - 1), this.pos(row, col))
		}
		if (col + 1 <= this.size && this.isOpen(row, col + 1)) {
			this.percolateUF.union(this.pos(row, col + 1), this.pos(row, col))
			this.fullUF.union(this.pos(row, col + 1), this.pos(row, col))
		}
	}

	pos(row, col) {
		return (row - 1) * this.size + col
	}

	// is the site (row, col) open?
	isOpen(row, col) {
		return this.is_open[this.pos(row, col)]
	}

	// is the site (row, col) full?
	isFull(row, col) {
		return this.fullUF.connected(this.top, this.pos(row, col))
	}

	// returns the number of open sites
	numberOfOpenSites() {
		return this.number_of_open_sites
	}

	// does the system percolate?
	percolates() {
		return this.percolateUF.connected(this.top, this.bottom)
	}
}
