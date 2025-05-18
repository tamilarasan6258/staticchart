// import { Component } from '@angular/core';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';

interface ExpenseData {
  month: string;
  shopping: number;
  food: number;
  travel: number;
  others: number;
}

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
  chartType: string = 'bar';

  expenses: ExpenseData[] = [
    { month: 'January', shopping: 50000, food: 45000, travel: 3000, others: 4000 },
    { month: 'February', shopping: 52000, food: 46000, travel: 3200, others: 3800 },
    { month: 'March', shopping: 51000, food: 47000, travel: 2900, others: 4200 }
  ];

  ngAfterViewInit(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.renderChart();
    setTimeout(() => this.chartInstance?.resize(), 100);
  }

  renderChart(): void {
    if (!this.chartInstance) return;
   
      const months = this.expenses.map(e => e.month);
      const shopping = this.expenses.map(e => e.shopping);
      const food = this.expenses.map(e => e.food);
      const travel = this.expenses.map(e => e.travel);
      const others = this.expenses.map(e => e.others);

      const option: echarts.EChartsOption = {
        title: { text: 'Monthly Expense Trends', left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { top: 30 },
        xAxis: {
          type: 'category',
          data: months
        },
        yAxis: {
          type: 'value',
          name: 'Amount (₹)'
        },
        series: [
          { name: 'shopping', type: 'line', data: shopping, smooth: true },
          { name: 'Food', type: 'line', data: food, smooth: true },
          { name: 'Travel', type: 'line', data: travel, smooth: true },
          { name: 'Others', type: 'line', data: others, smooth: true }
        ]
      };

      this.chartInstance.setOption(option, true);
    
  }
}
