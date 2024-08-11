import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private contactService = inject(ContactService)
    subscription!: Subscription
    ngOnInit(): void {
        this.subscription = this.contactService.loadContacts()
            .subscribe({
                error: err => console.log('err:', err)
            })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
