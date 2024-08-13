import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  @Input() contact!: string; // The contact to transfer funds to
  @Input() maxCoins!: number; // Maximum coins available to transfer
  @Output() onTransferCoins = new EventEmitter<void>(); // Event emitter to handle the transfer

  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.transferForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });

    // Watch for changes to maxCoins and update validation accordingly
    this.transferForm.get('amount')?.valueChanges.subscribe(value => {
      if (value !== null) {
        this.updateValidators();
      }
    });
  }

  private updateValidators() {
    const amountControl = this.transferForm.get('amount');
    if (amountControl) {
      amountControl.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.max(this.maxCoins)
      ]);
      amountControl.updateValueAndValidity({ emitEvent: false });
    }
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const amount = this.transferForm.value.amount;
      if (amount > 0 && amount <= this.maxCoins) {
        this.userService.addMove(this.contact, amount);
        this.onTransferCoins.emit(); // Emit the event after transfer
      } else {
        console.error('Amount is invalid or exceeds available coins.');
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
