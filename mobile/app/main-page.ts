import 'reflect-metadata';
import "rxjs/add/operator/map";
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';

interface Person {
    name: string;
    age: number;
}

@Component({
	selector: 'main',
	template: `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
    <Label [text]='"loaded people: " + people.length' class='title'></Label>
    <Label *ngFor="#person of people" [text]='person.name'></Label>
</StackLayout>
`,
})
export class MainPage {
    public message: string = "Hello, Angular!";
    @Input() public people: Person[] = [];

    constructor(private http: Http) {
        console.log('HTTP: ' + http);
    }

    public ngOnInit() {
        this.http.get('http://192.168.56.1:3000/data.json')
            .map(response => {
                return response.json()
            })
            .subscribe((items: Person[]) => {
                console.log('items: ' + items);
                this.people = items;
            }, error => console.dump(error))
    }
}
