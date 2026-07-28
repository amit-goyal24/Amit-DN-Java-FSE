import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { GlobalSpinner } from './components/global-spinner/global-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, GlobalSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
