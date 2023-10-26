const { getPryvatCurrency, getMonoCurrency } = require("./axios");
const { botMessage } = require("./botMessage");

const isMessageCurrency = async (chatId, bot, currency) => {
  const { exchangeRate } = await getPryvatCurrency();
  const monoCurency = await getMonoCurrency();

  if (currency === "USD") {
    const monoUSD = monoCurency.find((option) => option.currencyCodeA === 840);

    const { saleRate, purchaseRate } = exchangeRate[23];
    return bot.sendMessage(
      chatId,
      `ПриватБанк 
    Продаж USD ${Number(saleRate).toFixed(2)}
    Купівля USD ${Number(purchaseRate).toFixed(2)}

МоноБанк
    Продаж USD ${Number(monoUSD.rateSell).toFixed(2)}
    Купівля USD ${Number(monoUSD.rateBuy).toFixed(2)} `
    );
  }
  if (currency === "EUR") {
    const monoEUR = monoCurency.find((option) => option.currencyCodeA === 978);
    const { saleRate, purchaseRateNB } = exchangeRate[8];
    return bot.sendMessage(
      chatId,
      `ПриватБанк 
    Продаж EUR ${Number(saleRate).toFixed(2)}
    Купівля EUR ${Number(purchaseRateNB).toFixed(2)}

МоноБанк
    Продаж EUR ${Number(monoEUR.rateSell).toFixed(2)}
    Купівля EUR ${Number(monoEUR.rateBuy).toFixed(2)} `
    );
  }
};

module.exports = { isMessageCurrency };
