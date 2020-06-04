import {contract} from 'truffle-contract';
import {Component, OnInit} from '@angular/core';
import {ContractService} from './../../services/contract/contract.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MdcSnackbar} from "@angular-mdc/web";
// import { MdcSnackbar } from '@angular-mdc/web';

type TransactionField = 'sendaddress' | 'amount';

// type FormErrors = {[u in TransactionField]: string};
@Component({
  selector: 'app-addDoctor',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent {

  address: any;
  name: any;
  compatible: boolean;
  direction: string;
  balance: string;
  datas:any=[];
  constructor(private contract: ContractService, private snackbar: MdcSnackbar) {
    this.compatible = contract.compatible;
    contract.seeAccountInfo().then((value: any) => {
      this.direction = value.originAccount;
      console.log(this.direction);
      this.balance = value.balance;


      this.contract.getPatientsRecordsCount(this.direction,this.direction).then((r:any) => {
        console.log("getPatientsRecordsCount", r)

        for (let i = 0; i < r.words[0]; i++) {

          this.contract.getPatientsRecords(this.direction, this.direction,i).then((rx) => {
            console.log("getPatientsRecords",rx);
            this.datas.push(rx);
          });

        }
      }).catch((e) => {
        this.contract.failure('Transaction failed');
      });


    }).catch((error: any) => {
      contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });


    //test
//
//     this.contract.getAllDoctor(this.direction).then((r) => {
//       console.log("rr",r)
//       // this.contract.succes();
// // tslint:disable-next-line: no-shadowed-variable
//     }).catch((e) => {
//       this.contract.failure('Transaction failed');
//     });
  }

//   submit() {
//
//     console.log(this.name, this.address);
//     this.contract.addDoctor(this.direction, this.name, this.address).then((r) => {
//       this.contract.succes();
// // tslint:disable-next-line: no-shadowed-variable
//     }).catch((e) => {
//       this.contract.failure('Transaction failed');
//     });
//   }


}
