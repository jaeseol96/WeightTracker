import { Component } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-title',
    styleUrl: './title.scss',
    templateUrl: './title.html',
})
export class Title {
    title: string = 'Weight Tracker';
}
