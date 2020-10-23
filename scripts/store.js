const store = {
  details: [{bmr: 10, tr: .33, tp: .2}],
  createItem: function(bmp, tr, tp) {
    return {
      id: cuid(),
      bmp: bmp,
      tr: tr,
      tp: tp,
    };
  },
  subTotal: 0.00,
  tip: 0.00,
  total: 0.00,
  tipTotal: 0.00,
  mealCount: 0,
  avgTPM: 0.00,
  getSubtotal: function() {
    const set = this.details[this.details.length - 1];
    this.subTotal = set.bmp + (set.bmp * set.tr);
  },
  getTip: function() {
    const set = this.details[this.details.length - 1];
    console.log(set);
    const tip = set.bmp * set.tp;
    this.tip = tip;
    this.tipTotal += tip;
  },
  getTotal: function() {
    this.total = this.subTotal + this.tip;
  },
  getAvgTPM: function() {
    this.avgTPM = this.tipTotal / this.mealCount;
  },
  
};

export default store;

// export default {
//   details,
//   createItem,
//   mealCount,
//   subTotal,
//   tip,
//   total,
//   tipTotal,
//   avgTPM,
// };