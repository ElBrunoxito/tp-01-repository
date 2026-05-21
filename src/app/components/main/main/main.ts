import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavLeft } from "../nav-left/nav-left";

@Component({
  selector: 'app-main',
  imports: [RouterModule, NavLeft],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
