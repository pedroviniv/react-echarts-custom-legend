export function toOption(data) {
  const legends = data.map(item => item.label);

    const seriesData = data.map(item => ({
      name: item.label,
      value: item.value,
    }));

    return {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: legends,
        show: false,
      },
      series: [
          {
              name: 'Informe o seu sexo',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: seriesData,
          }
        ]
    };
};