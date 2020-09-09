const Percolation = require('./Percolation')
const assert = require('assert')

describe('Percolation', function () {
	it('input 3 - true', function () {
		const data = {
			size: 3,
			open: [
				[1, 3],
				[2, 3],
				[3, 3],
				[3, 1],
				[2, 1],
				[1, 1],
			]
		}
		const percolation = new Percolation(data.size)
		data.open.forEach(open => {
			percolation.open(open[0], open[1])
		})
		const result = percolation.percolates() ? true : false
		assert.equal(result, true)
	}),
		it('input 2 - false', function () {
			const data = {
				size: 2,
				open: [
					[1, 1],
					[2, 2]
				]
			}
			const percolation = new Percolation(data.size)
			data.open.forEach(open => {
				percolation.open(open[0], open[1])
			})
			const result = percolation.percolates() ? true : false
			assert.equal(result, false)
		}),
		it('input 6 - true', function () {
			const data = {
				size: 6,
				open: [
					[1, 6],

					[2, 6],
					[3, 6],
					[4, 6],
					[5, 6],
					[5, 5],
					[4, 4],
					[3, 4],
					[2, 4],
					[2, 3],
					[2, 2],
					[2, 1],
					[3, 1],
					[4, 1],
					[5, 1],
					[5, 2],
					[6, 2],
					[5, 4]
				]
			}
			const percolation = new Percolation(data.size)
			data.open.forEach(open => {
				percolation.open(open[0], open[1])
			})
			const result = percolation.percolates() ? true : false
			assert.equal(result, true)
		})
})
