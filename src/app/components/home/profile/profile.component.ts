import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  marks = [
    {
      month: 'January',
      subjects: [
        {name: 'Maths', marks: [9, 4, 8, 5, 7, 10, 4, 5, 6, 2] },
        {name: 'Science', marks: [6, 4, 5, 8, 9, 10] },
      ]
    },
    {
      month: 'February',
      subjects: [
        {name: 'Maths', marks: [9, 4] },
        {name: 'Science', marks: [6, 4, 6] },
      ]
    },
    {
      month: 'March',
      subjects: [
        {name: 'Maths', marks: [9, 4,5,7] },
        {name: 'Science', marks: [6, 4, 6,9,4] },
      ]
    },
  ];

  buttonTitle: any = {
    subject: 'Select Subject',
    month: 'Select Month'
  }

  selectedSubject: any = {
    month: {
      name: '',
      number: 0,
    },
    subject: {
      name: '',
      number: 0,
    },
    labels: [],
    dataSets: [],
    name: '',
  }

  chart: any = []
  destroyChart = true;

  ngOnInit() {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {

        labels: this.selectedSubject.labels,
        datasets: [
          {
            label: '# of Votes',
            data: this.selectedSubject.dataSets,
            borderWidth: 3,
            backgroundColor: 'rgba(221,99,255,0.2)',
            borderColor: 'rgba(221,99,255,0.2)',

          },
        ],

      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  selectMonth(month: string, index: number){
    this.buttonTitle.month = month;
    this.selectedSubject.labels = [];
    this.chart.destroy();
    this.selectedSubject.month.name = month;
    this.selectedSubject.month.number = index;
    this.selectedSubject.dataSets = this.marks[this.selectedSubject.month.number].subjects[this.selectedSubject.subject.number].marks
    this.selectedSubject.labels = this.createLabels();
    this.createChart();
    console.log('mese selezionato',this.selectedSubject.month)
    console.log('materia selezionata',this.selectedSubject.subject)
    console.log('-----------------',this.selectedSubject.dataSets)
  }

  selectSubject(subject: string, index: number){
    this.buttonTitle.subject = subject;
    this.selectedSubject.labels = [];
    this.chart.destroy();
    this.selectedSubject.subject.name = subject;
    this.selectedSubject.subject.number = index;
    this.selectedSubject.dataSets = this.marks[this.selectedSubject.month.number].subjects[this.selectedSubject.subject.number].marks
    this.selectedSubject.labels = this.createLabels();
    this.createChart();
    console.log('mese selezionato',this.selectedSubject.month)
    console.log('materia selezionata',this.selectedSubject.subject)
    console.log(this.selectedSubject.dataSets)
  }

  createLabels(){
    for(let i = 0; i < this.selectedSubject.dataSets.length; i++){
      this.selectedSubject.labels.push('Challenge' + (i + 1 ));
    }
    return this.selectedSubject.labels;
  }

}
