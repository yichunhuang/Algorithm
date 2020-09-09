class UnionFind {

	constructor(size) {
		this.parent = new Array(size)
		this.rank = new Array(size)
		// this.topLine = new Array(size);
		// this.bottomLine = new Array(size);
		for (let i = 0; i < size; i++) {
			this.parent[i] = i
			this.rank[i] = 0
		}
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x])
		}
		return this.parent[x];
	}

	connected(x, y) {
		return this.find(x) == this.find(y)
	}

	union(x, y) {
		let xr = this.find(x);
		let yr = this.find(y);
		if (xr === yr) {
			return false; // already have the same parent
		} else if (this.rank[xr] < this.rank[yr]) {
			this.parent[xr] = yr;
		} else if (this.rank[xr] > this.rank[yr]) {
			this.parent[yr] = xr;
		} else {
			// same height
			this.parent[yr] = xr;
			this.rank[xr]++;
		}
		return true;
	}
}

module.exports = UnionFind
