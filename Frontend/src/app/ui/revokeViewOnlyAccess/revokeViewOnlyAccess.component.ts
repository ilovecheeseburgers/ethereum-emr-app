import {contract} from 'truffle-contract';
import {Component, OnInit} from '@angular/core';
import {ContractService} from './../../services/contract/contract.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MdcSnackbar} from "@angular-mdc/web";

type TransactionField = 'sendaddress' | 'amount';

@Component({
  selector: 'app-giveViewOnlyAccess',
  templateUrl: './revokeViewOnlyAccess.component.html',
  styleUrls: ['./revokeViewOnlyAccess.component.scss']
})
export class RevokeViewOnlyAccessComponent {

  address: any;
  name: any;
  compatible: boolean;
  direction: string;
  balance: string;

  constructor(private contract: ContractService, private snackbar: MdcSnackbar) {
    this.compatible = contract.compatible;
    contract.seeAccountInfo().then((value: any) => {
      this.direction = value.originAccount;
      console.log(this.direction);
      this.balance = value.balance;
    }).catch((error: any) => {
      contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }

  submit() {
    console.log(this.name, this.address);
    this.contract.revokeViewOnlyAccessToDoctor(this.direction, this.address).then((r) => {
      this.contract.succes();
    }).catch((e) => {
      this.contract.failure('Transaction failed');
    });
  }


}
