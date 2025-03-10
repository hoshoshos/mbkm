function drawBarChart(arr,title,canvas) {
  let labels = arr.slice(0,1)[0].slice(1);
  let dt = arr.slice(1,-2);
  let total = arr.slice(-2,-1)[0].slice(1);

  let datasets = [];
  for(d=0;d<dt.length;d++) {
    datasets.push({label:dt[d].slice(0,1), data:dt[d].slice(1), borderWidth:1})
  }

  let cfg = new ChartBarConfig();
  cfg.data = {labels, datasets};
  cfg.options.plugins.title.text = title;
  cfg.options.plugins.datalabels.formatter = function(val, ctx) { return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  cfg.options.plugins.tooltip.callbacks.label = function(ctx) {
    let label = ctx.dataset.label + ': ' + ctx.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
    return label += ' dari ' + total[labels.indexOf(ctx.label)].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
  }

  new Chart(canvas, cfg);
}
