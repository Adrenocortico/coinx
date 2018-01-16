'use strict';

const Promise = require('bluebird');
const API = require('coinbase').Client;

class Coinbase {
	constructor(apiKey, apiSecret) {
		this.name = 'coinbase';
		this.api = Promise.promisifyAll(new API({'apiKey': apiKey, 'apiSecret': apiSecret}));
	};

/*
	getBTCinUSD() {
		let pair = 'BTC-USD';
		return this.api.apiAsync('Ticker', {
			pair: pair
		})
		.then( data => {
			if (data.error && data.error.length){
				return data.error;
			} else {
				return {
					exchange: 'coinbase',
					symbol: 'BTC',
					priceUSD: parseFloat(data.result[pair].a[0]),
					available: true
				}
			}
		})
		.catch( e => {
			return {
				exchange: 'coinbase',
				symbol: 'BTC',
				available: false
			}
		});
	};

	getPriceInBTC(symbol) {
		if (symbol == 'BTC') {
			return Promise.reject('Use getBTCinUSD to get BTC price.');
		} else {
			return new Promise((resolve, reject) => {
				let pair = 'BTC-' + symbol;
				this.api.getticker({
					market: pair
				}, data => {
					if (!data.success) {
						resolve({
							exchange: 'coinbase',
							symbol: symbol,
							available: false
						});
					} else {
						let result = {
							exchange: 'coinbase',
							symbol: symbol,
							priceBTC: data.result.Ask,
							available: true
						};
						resolve(result);
					};
				});
			});
		};
	}

	getBalances() {
		return new Promise((resolve, reject) => {
      let coinbaseAccount = new Coinbase(credential)
      coinbaseAccount.getAccounts({}, function(err, accounts) {
        if (err) {
          return reject(err)
        }
        let result = []
        accounts.forEach(account => {
          let symbol = account.balance.currency
          result.push(new Coin(symbol, account.balance.amount, 'Coinbase'))
        })
        resolve(result)
      })
    })
	};

	getOrderHistory(market) {
		var options = {};
		if (market) options.market = market;

		return new Promise((resolve, reject) => {
			this.api.getorderhistory(options, function(data) {
				if (!data.success) {
					reject(data.message);
				} else {
					resolve(data.result);
				}
			});
		});
	};

	buy(symbol, USDAmount) {
		var self = this;
		let orderNumber;
		let numCoinsToBuy;
		let rate;
		let btcUSD;

		return new Promise((resolve, reject) => {
				this.api.getmarketsummaries(data => {
					if (!data.success) {
						reject(data.message);
					} else {
						data.result.forEach(market => {
							if (market.MarketName == 'USDT-BTC') {
								btcUSD = market.Ask;
							} else if (market.MarketName == 'BTC-' + symbol) {
								rate = parseFloat(market.Ask);
							}
						});

						numCoinsToBuy = (USDAmount / (rate * btcUSD)).toFixed(8);

						var options = {
							market: 'BTC-' + symbol,
							quantity: numCoinsToBuy,
							rate: rate
						}
						self.api.buylimit(options, function(data) {
							if (!data.success) {
								reject(data.message);
							} else {
								orderNumber = data.result.uuid;
								resolve();
							}
						});
					}
				});
			})
			.delay(500)
			.then(data => {
				return new Promise( ( resolve, reject ) => {
					var options = {
						uuid: orderNumber
					}
					return self.api.getorder(options, data => {
						if (data.success){
							resolve(data.result);
						} else {
							reject(data.message);
						}
					});
				})
			})
			.then(order => {
				let result = {
					market: 'coinbase',
					orderNumber: orderNumber,
					numCoinsBought: order.Quantity,
					rate: order.PricePerUnit,
					complete: (order.QuantityRemaining == 0),
					usdValue: order.PricePerUnit * order.Quantity * btcUSD
				}
				return result;
			});
	}
*/
};

module.exports = Coinbase;
