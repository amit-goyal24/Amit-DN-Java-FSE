import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

/**
 * GlobalSpinner: Displays a loading spinner overlay when HTTP requests are in progress.
 * Integrated with LoadingService to track request states via interceptors.
 */
@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './global-spinner.html',
  styleUrl: './global-spinner.css',
})
export class GlobalSpinner {
  private readonly loadingService = inject(LoadingService);
  readonly isLoading$ = this.loadingService.isLoading$;
}
