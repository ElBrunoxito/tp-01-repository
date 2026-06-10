import { Component } from '@angular/core';

interface Activity {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-t12',
  imports: [],
  templateUrl: './t12.html',
  styleUrl: './t12.css',
})
export class T12 {
constructor() {}

  ngOnInit(): void {
    // Aquí puedes inicializar logs o estados de análisis si se requiere
  }
}
