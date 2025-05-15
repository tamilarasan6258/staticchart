

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
  selector: 'app-exchart',
  imports: [FormsModule],
  templateUrl: './exchart.component.html',
  styleUrl: './exchart.component.css'
})
export class ExchartComponent implements AfterViewInit{


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

    if (this.chartType === 'bar') {
      const shopping = this.expenses.map(e => e.shopping);
      const food = this.expenses.map(e => e.food);
      const travel = this.expenses.map(e => e.travel);
      const others = this.expenses.map(e => e.others);

      const option: echarts.EChartsOption = {
        title: { text: 'Monthly Expenses by Category', left: 'center' },
        tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
        legend: {top: 30 },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: { rotate: 20 }
        },
        yAxis: {
          type: 'value',
          name: 'Amount (₹)'
        },
        series: [
          { name: 'shopping', type: 'bar', data: shopping, itemStyle: { color: '#3498db' } },
          { name: 'Food', type: 'bar', data: food, itemStyle: { color: '#2ecc71' } },
          { name: 'Travel', type: 'bar', data: travel, itemStyle: { color: '#f1c40f' } },
          { name: 'Others', type: 'bar', data: others, itemStyle: { color: '#9b59b6' } },

          // { name: 'shopping', type: 'bar', stack: 'total', data: shopping, itemStyle: { color: '#3498db' } },
          // { name: 'Food', type: 'bar', stack: 'total', data: food, itemStyle: { color: '#2ecc71' } },
          // { name: 'Travel', type: 'bar', stack: 'total', data: travel, itemStyle: { color: '#f1c40f' } },
          // { name: 'Others', type: 'bar', stack: 'total', data: others, itemStyle: { color: '#9b59b6' } }
    
        ]
      };

      this.chartInstance.setOption(option, true);
    }

    if (this.chartType === 'pie') {
      const total = { shopping: 0, food: 0, travel: 0, others: 0 };

      this.expenses.forEach(e => {
        total.shopping += e.shopping;
        total.food += e.food;
        total.travel += e.travel;
        total.others += e.others;
      });

      const pieData = [
        { name: 'shopping', value: total.shopping },
        { name: 'Food', value: total.food },
        { name: 'Travel', value: total.travel },
        { name: 'Others', value: total.others }
      ];

      const option: echarts.EChartsOption = {
        title: { text: 'Total Expenses by Category', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{b}: ₹{c} ({d}%)' },
        legend: { bottom: 10, left: 'center' },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.chartInstance.setOption(option, true);
    }


    if (this.chartType === 'line') {
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



    if (this.chartType === 'area') {
      const months = this.expenses.map(e => e.month);
      const shopping = this.expenses.map(e => e.shopping);
      const food = this.expenses.map(e => e.food);
      const travel = this.expenses.map(e => e.travel);
      const others = this.expenses.map(e => e.others);
    
      const option: echarts.EChartsOption = {
        title: { text: 'Monthly Expense Area Chart', left: 'center' },
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
          {
            name: 'Shopping',
            type: 'line',
            data: shopping,
            areaStyle: {},
            smooth: true,
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: 'Food',
            type: 'line',
            data: food,
            areaStyle: {},
            smooth: true,
            itemStyle: { color: '#10b981' }
          },
          {
            name: 'Travel',
            type: 'line',
            data: travel,
            areaStyle: {},
            smooth: true,
            itemStyle: { color: '#f59e0b' }
          },
          {
            name: 'Others',
            type: 'line',
            data: others,
            areaStyle: {},
            smooth: true,
            itemStyle: { color: '#8b5cf6' }
          }
        ]
      };
    
      this.chartInstance.setOption(option, true);
    }


    
    
  }
}
