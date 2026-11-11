import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WeightEntry } from '../models/weight-entry.model';
import { formatDate } from '@angular/common';

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
                        borderWidth: 3,
                        pointHitRadius: 12,
                        pointRadius: 3.5,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderColor: '#157A6E',
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#FFFFFF',
                        pointHoverBorderColor: '#157A6E',
                        pointHoverBorderWidth: 2,
                        fill: 'start',
                        backgroundColor: (context) => {
                            const { ctx, chartArea } = context.chart;

                            if (!chartArea) {
                                return 'rgba(21, 122, 110, 0.08)';
                            }

                            const gradient = ctx.createLinearGradient(
                                0,
                                chartArea.top,
                                0,
                                chartArea.bottom,
                            );

                            gradient.addColorStop(0, 'rgba(21, 122, 110, 0.16)');
                            gradient.addColorStop(1, 'rgba(21, 122, 110, 0)');

                            return gradient;
                        },
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        position: 'top',
                        align: 'start',
                        text: 'Weight history',
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: '#1C1C1C',
                        titleColor: '#D4D4D4',
                        bodyColor: '#FFFFFF',

                        borderColor: '#404040',
                        borderWidth: 1,
                        cornerRadius: 10,
                        padding: 12,
                        displayColors: false,

                        titleFont: {
                            family: 'system-ui',
                            size: 12,
                            weight: 'normal',
                        },
                        bodyFont: {
                            family: 'system-ui',
                            size: 15,
                            weight: 'bold',
                        },
                        callbacks: {
                            title: (items) => {
                                const index = items[0]?.dataIndex;

                                if (index === undefined) return '';

                                const entry = this.entries[index];

                                return formatDate(entry.date, 'mediumDate', 'en-US');
                            },
                            label: (context) => {
                                const entry = this.entries[context.dataIndex];

                                return `${entry.weight} ${entry.unit}`;
                            },
                        },
                    },
                },
                layout: {
                    padding: {
                        left: 16,
                        right: 16,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 6,
                            maxRotation: 0,
                        },
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        },
                    },
                    y: {
                        position: 'right',
                        ticks: {
                            stepSize: 1,
                            maxTicksLimit: 10,
                        },
                        grid: {
                            color: '#E7E2DB',
                        },
                        border: {
                            display: false,
                        },
                    },
                },
                elements: {
                    line: {},
                },
                backgroundColor: '#157a6e',
                borderColor: '#157a6e',
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
        const dates = this.entries.map((entry) => this.formatMonthDay(entry.date));

        chart.data.labels = dates;
        chart.data.datasets[0].data = weights;
        chart.update();
    }

    private formatMonthDay(date: string): string {
        const monthDayLabel = date.slice(5);

        return monthDayLabel;
    }
}
