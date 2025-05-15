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
  selector: 'app-bar-chart',
  imports: [FormsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements AfterViewInit{


  

 @ViewChild('chartContainer') chartContainer!: ElementRef;
 chartInstance: echarts.ECharts | null = null;


 expenses: ExpenseData[] = [
   { month: 'January', shopping: 50000, food: 45000, travel: 3000, others: 4000 },
   { month: 'February', shopping: 52000, food: 46000, travel: 3200, others: 3800 },
   { month: 'March', shopping: 51000, food: 47000, travel: 2900, others: 4200 }
 ];

 ngAfterViewInit(): void {
   this.chartInstance = echarts.init(this.chartContainer.nativeElement);
   this.renderChart();
  //  setTimeout(() => this.chartInstance?.resize(), 100);
 }

 renderChart(): void {
   if (!this.chartInstance) return;

   const months = this.expenses.map(e => e.month);

     const shopping = this.expenses.map(e => e.shopping);
     const food = this.expenses.map(e => e.food);
     const travel = this.expenses.map(e => e.travel);
     const others = this.expenses.map(e => e.others);

     const option: echarts.EChartsOption = {
       title: { text: 'Monthly Expenses by Category', left: 'center' },
       tooltip: { trigger: 'item'},
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

}
