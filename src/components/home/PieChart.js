import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  mounted () {
    this.renderChart({
      labels: ['Business', 'Entertainment', 'Food', 'Game', 'Home', 'Music', 'Shopping', 'Tech'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: ['#FCFA70', '#6A99CB', '#4D7CAE', '#375A7F', '#FCFA70', '#6A99CB', '#4D7CAE', '#375A7F'],
          data: [40, 39, 10, 40, 39, 80, 40, 20]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}