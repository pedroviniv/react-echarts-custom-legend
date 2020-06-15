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
                  formatter: '{d}%',
                  textStyle: {
                    color: '#000000'
                  },
              }, // criar richText styles pra cada legenda, as legendas que n devem mostrar vai ter alguma propriedade de cortransparente ou display none
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: true,
                  lineStyle: {
                    color: '#000000'
                  }
              },
              data: seriesData,
          }
        ]
    };
};