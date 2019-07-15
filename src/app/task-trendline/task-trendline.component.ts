import { Component } from '@angular/core';

@Component({
    selector: 'app-task-trendline',
    templateUrl: './task-trendline.component.html',
    styleUrls: ['./task-trendline.component.css']
})

export class TaskTrendline {
    ticks = [];

    transformData(data: object): any[][] {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November',
                        'December'];
        let ret = [];

        for (let month in data) {
            let entries = (data as any)[month];

            let yearNum = new Date().getFullYear();
            let monthNum = months.indexOf(month) + 1;

            this.ticks.push({v: new Date(yearNum, monthNum, 16), f: month.substring(0, 3).toUpperCase()});

            let phaseLen = entries.length / 6;

            for (let i = 0; i < entries.length; i += phaseLen) {
                let start = Math.floor(i);
                let end = Math.floor(i + phaseLen);
                let phase = entries.slice(start, end);

                let comp = [];
                let req = [];

                for (let entry of phase) {
                    comp.push(entry[0]);
                    req.push(entry[1]);
                }

                let compAvg = Math.floor(comp.reduce((s, i) => s + i, 0) / comp.length);
                let reqAvg = Math.floor(req.reduce((s, i) => s + i, 0) / comp.length);

                let dateNum = start + Math.floor((end - start) / 2) - 1;

                ret.push([new Date(yearNum, monthNum, dateNum), compAvg, reqAvg]);
            }
        }

        return ret;
    }

    type = 'ComboChart';
    data = this.transformData({
        'May': [[506, 769], [332, 821], [454, 836], [525, 823], [437, 862],
                [485, 503], [446, 864], [745, 798], [550, 645], [350, 764],
                [372, 476], [818, 829], [340, 376], [591, 829], [758, 822],
                [300, 826], [397, 589], [354, 696], [678, 839], [309, 656],
                [723, 804], [505, 582], [360, 735], [711, 891], [354, 435],
                [613, 859], [492, 891], [408, 417], [446, 723], [392, 707],
                [887, 894]],
        'June': [[617, 649], [607, 884], [524, 693], [461, 499], [634, 700],
                 [688, 703], [745, 840], [338, 664], [615, 690], [570, 755],
                 [570, 875], [472, 488], [453, 731], [618, 782], [393, 816],
                 [319, 518], [412, 600], [528, 678], [500, 671], [422, 780],
                 [361, 425], [651, 867], [326, 681], [320, 900], [477, 630],
                 [512, 530], [465, 887], [320, 458], [403, 698], [309, 372],
                 [0, 0]],
        'July': [[0, 772], [0, 535], [0, 707], [0, 547], [0, 364], [0, 699],
                 [0, 886], [0, 690], [0, 574], [0, 603], [0, 831], [0, 752],
                 [0, 735], [0, 581], [0, 502], [0, 728], [0, 597], [0, 753],
                 [0, 690], [0, 827], [0, 885], [0, 495], [0, 847], [0, 561],
                 [0, 815], [0, 825], [0, 378], [0, 851], [0, 786], [0, 843],
                 [0, 861]]
    });
    columnNames = ['Month', 'Completed', 'Requested'];
    options = {
        vAxis: {
            viewWindow: {
                min: 0
            },
            gridlines: {
                color: 'transparent'
            },
            baselineColor: '#979797'
        },
        hAxis: {
            ticks: this.ticks,
            gridlines: {
                color: 'transparent'
            },
            minorGridlines: {
                color: '#000000'
            },
            textStyle: {
                fontName: 'Calibri',
                fontSize: 10,
                color: '#CCCCCC'
            }
        },
        series: {
            0: {
                type: 'area',
                color: '#689F38'
            },
            1: {
                type: 'line',
                lineDashStyle: [5, 2],
                color: '#00C3E6'
            }
        },
        focusTarget: 'category',
        legend: 'none',
        chartArea: {
            top: 0,
            width: '100%',
            height: '72%',
            backgroundColor: '#2B2B2B'
        },
        backgroundColor: 'transparent',
        lineWidth: 2,
        areaOpacity: 0.6,
        tooltip: {
            isHtml: true
        }
    };
    width = 480;
    height = 80;
}
