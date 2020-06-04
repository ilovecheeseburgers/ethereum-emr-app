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
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  address: any;
  name: any;
  compatible: boolean;
  direction: string;
  balance: string;
  datas: any = [];
  patientsWithCreatOnlyAccess: any = [];
  patientsWithViewOnlyAccess: any = [];
  viewRecord:any = false;
  patientsWithCreatOnlyAccessDetails: any = [];
  patientsWithViewOnlyAccessDetails: any = [];

  constructor(private contract: ContractService, private snackbar: MdcSnackbar) {
    this.compatible = contract.compatible;
    contract.seeAccountInfo().then(async (value: any) => {
      this.direction = value.originAccount;
      console.log(this.direction);
      this.balance = value.balance;

      let r = await this.contract.getPatientsWithCreateOnlyAccess(this.direction);
      console.log("getPatientsWithCreateOnlyAccess", r);
      this.patientsWithCreatOnlyAccess = r;

      for (let i = 0; i < this.patientsWithCreatOnlyAccess.length; i++) {
        if(this.patientsWithCreatOnlyAccess[i] !== '0x0000000000000000000000000000000000000000'){
          let rx = await this.contract.getPatients(this.direction, this.patientsWithCreatOnlyAccess[i]);
          console.log(rx);
          rx['access'] = "Create";
          rx['address'] = this.patientsWithCreatOnlyAccess[i];
          this.patientsWithCreatOnlyAccessDetails.push(rx);
        }

      }
      // }).catch((e) => {
      //   this.contract.failure('Transaction failed');
      // });


      let r1 = await  this.contract.getPatientsWithViewOnlyAccess(this.direction);
      console.log("getPatientsWithViewOnlyAccess", r1);
      this.patientsWithViewOnlyAccess = r1;

      for (let i = 0; i < this.patientsWithViewOnlyAccess.length; i++) {
        if(this.patientsWithViewOnlyAccess[i] !== '0x0000000000000000000000000000000000000000') {
          let rx1 = await this.contract.getPatients(this.direction, this.patientsWithViewOnlyAccess[i]);
          console.log(rx1);
          rx1['access'] = "View";
          rx1['address'] = this.patientsWithViewOnlyAccess[i];

          this.patientsWithCreatOnlyAccessDetails.push(rx1);
          // });
        }

      }
      // }).catch((e) => {
      //   this.contract.failure('Access Error');
      // });
      //
      // let merged = [];
      //
      // for(let i=0; i<arr1.length; i++) {
      //   merged.push({
      //     ...arr1[i],
      //     ...(arr2.find((itmInner) => itmInner.id === arr1[i].id))}
      //   );
      // }


    }).catch((error: any) => {
      contract.failure('Access error');
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

  getPatientsRecords(address) {

  this.viewRecord = !this.viewRecord;
    this.contract.getPatientsRecordsCount(this.direction, address).then((r: any) => {
      console.log("getPatientsRecordsCount", r)

      for (let i = 0; i < r.words[0]; i++) {

        this.contract.getPatientsRecords(this.direction, address, i).then((rx) => {
          console.log("getPatientsRecords", rx);
          this.datas.push(rx);
        });

      }
    }).catch((e) => {
      this.contract.failure('Transaction failed');
    });
  }

  back(){
    this.datas = [];
    this.viewRecord = !this.viewRecord;
  }


}
