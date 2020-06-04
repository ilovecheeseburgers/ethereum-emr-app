import {contract} from 'truffle-contract';
import {Component, OnInit} from '@angular/core';
import {ContractService} from './../../services/contract/contract.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MdcSnackbar} from "@angular-mdc/web";
// import { MdcSnackbar } from '@angular-mdc/web';

type TransactionField = 'sendaddress' | 'amount';

// type FormErrors = {[u in TransactionField]: string};
@Component({
  selector: 'app-permittedDoctors',
  templateUrl: './permittedDoctors.component.html',
  styleUrls: ['./permittedDoctors.component.scss']
})
export class PermittedDoctorsComponent {

  address: any;
  name: any;
  compatible: boolean;
  direction: string;
  balance: string;

  doctorsWithCreatOnlyAccess: any = [];
  doctorsWithViewOnlyAccess: any = [];

  doctorsWithCreatOnlyAccessDetails: any = [];
  doctorsWithViewOnlyAccessDetails: any = [];


  constructor(private contract: ContractService, private snackbar: MdcSnackbar) {
    this.compatible = contract.compatible;
    contract.seeAccountInfo().then((value: any) => {
      this.direction = value.originAccount;
      console.log(this.direction);

      this.contract.getDoctorsWithCreateOnlyAccess(this.direction).then((r) => {
        console.log("getDoctorsWithCreateOnlyAccess", r)
        this.doctorsWithCreatOnlyAccess = r;

        for (let i = 0; i < this.doctorsWithCreatOnlyAccess.length; i++) {

          this.contract.getDoctorsDetails(this.direction, this.doctorsWithCreatOnlyAccess[i]).then((rx) => {
            console.log(rx);
            rx['access'] = "Create";
            rx['address'] = this.doctorsWithCreatOnlyAccess[i];
            this.doctorsWithCreatOnlyAccessDetails.push(rx);
          });

        }
      }).catch((e) => {
        this.contract.failure('Transaction failed');
      });



      this.contract.getDoctorsWithViewOnlyAccess(this.direction).then((r) => {
        console.log("getDoctorsWithViewOnlyAccess", r)
        this.doctorsWithViewOnlyAccess = r;

        for (let i = 0; i < this.doctorsWithViewOnlyAccess.length; i++) {

          this.contract.getDoctorsDetails(this.direction, this.doctorsWithViewOnlyAccess[i]).then((rx) => {
            console.log(rx);
            rx['access'] = "View";
            rx['address'] = this.doctorsWithViewOnlyAccess[i];

            this.doctorsWithCreatOnlyAccessDetails.push(rx);
          });

        }
      }).catch((e) => {
        this.contract.failure('Access Error');
      });


      this.balance = value.balance;
    }).catch((error: any) => {
      contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });


  }

//   submit(){
//
//     console.log(this.name, this.address);
//     this.contract.getDoctorsWithCreateOnlyAccess(this.direction).then((r) => {
//       this.contract.succes();
// // tslint:disable-next-line: no-shadowed-variable
//     }).catch((e) => {
//       this.contract.failure('Transaction failed');
//     });
//   }


}
