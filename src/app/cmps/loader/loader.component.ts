import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading$ = inject(LoaderService).isLoading$
}
