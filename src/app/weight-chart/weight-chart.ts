import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WeightEntry } from '../models/weight-entry.model';

@Component({
    imports: [],
    selector: 'app-weight-chart',
    styleUrl: './weight-chart.scss',
    templateUrl: './weight-chart.html',
})
export class WeightChart {
    weightChart?: Chart;
    @Input() entries: WeightEntry[] = [];

    ngAfterViewInit() {
        this.weightChart = new Chart('weightChart', {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Weight',
                        data: [],
                        borderWidth: 2,
                        pointHitRadius: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 6,
                            maxRotation: 0,
                        }
                    },
                    y: {
                        suggestedMin: 100,
                        suggestedMax: 500,
                        position: 'right',
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        this.updateChart();
    }

    ngOnChanges() {
        this.updateChart();
    }

    ngOnDestroy() {
        this.weightChart?.destroy();
    }

    private updateChart() {
        const chart = this.weightChart;

        if (!chart) {
            return;
        }

        const weights = this.entries.map((entry) => entry.weight);
        const dates = this.entries.map((entry) => entry.date.toLocaleDateString());

        chart.data.labels = dates;
        chart.data.datasets[0].data = weights;
        chart.update();
    }
}
