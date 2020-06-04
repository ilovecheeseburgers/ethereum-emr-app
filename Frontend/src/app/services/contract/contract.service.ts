import {Injectable} from '@angular/core';
import contract from 'truffle-contract';
import {MdcSnackbar} from '@angular-mdc/web';
import {Subject} from 'rxjs';

declare let require: any;
const Web3 = require('web3');
const tokenAbi = require('../../../../../Blockchain/build/contracts/Health.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private web3Provider: null;
  private contracts: {};
  public compatible: boolean;
  private accounts: string[];
  public accountsObservable = new Subject<string[]>();

  constructor(private snackbar: MdcSnackbar) {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
      this.compatible = true;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      // if you are using linix or ganche cli maybe the port is  http://localhost:8545
      //   Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      //   this.web3Provider = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/Private_key'));
      // Change with your credentials as the test network and private key in infura.io
    }
    window.web3 = new Web3(this.web3Provider);
    console.log('connect');
  }


  seeAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((err, account) => {
        if (account === true) {
          console.log('dondt work' + account);
          return reject({name: 'account'});
        } else {
          window.web3.eth.getBalance(account, (error, balance) => {
            if (error === false) {
              return resolve({
                originAccount: account,
                balance: (window.web3.utils.fromWei(balance, 'ether'))
              });
            } else {
              console.log(balance);
              return reject({name: 'balance'});
            }
          });
        }
      });
    });
  }

  refreshAccounts() {

    window.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err === true) {
        console.warn('There was an error fetching your accounts.');
        console.log(err, accs);
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      console.log('ready');
    });
  }




  addDoctor(originAccount, name, address) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.addDoctor(
          address, name,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  registerPatient(originAccount, name, dob, gender, hseAddress, contactNumber) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.registerPatient(
          name, dob, gender, hseAddress, contactNumber,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  giveCreateOnlyAccessToDoctor(originAccount, address) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.giveCreateOnlyAccessToDoctor(
          address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }
  revokeCreateOnlyAccessToDoctor(originAccount, address) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.revokeCreateOnlyAccessToDoctor(
          address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  giveViewOnlyAccessToDoctor(originAccount, address) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.giveViewOnlyAccessToDoctor(
          address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }
  revokeViewOnlyAccessToDoctor(originAccount, address) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.revokeViewOnlyAccessToDoctor(
          address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }


  getDoctorsWithCreateOnlyAccess(originAccount) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getDoctorsWithCreateOnlyAccess(
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }


  getDoctorsWithViewOnlyAccess(originAccount) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getDoctorsWithViewOnlyAccess(
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }


  getDoctorsDetails(originAccount, address) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.doctors(address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }


  addPrescriptionForPatient(originAccount, address, prescription, visitDate, additionalNotes, fromPlace) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.addPrescriptionForPatient(address, prescription, visitDate, additionalNotes, fromPlace,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getPatientsRecordsCount(originAccount, address) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getPatientsRecordsCount(address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getPatientsRecords(originAccount, address, index) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getPatientsRecords(address, index,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getPatients(originAccount, address) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getPatients(address,
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getPatientsWithCreateOnlyAccess(originAccount) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getPatientsWithCreateOnlyAccess(
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getPatientsWithViewOnlyAccess(originAccount) {
    const that = this;
    console.log("account origin ", originAccount)
    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.getPatientsWithViewOnlyAccess(
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        if (status) {
          return resolve(status);
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  getAllDoctor(originAccount) {
    const that = this;

    return new Promise((resolve, reject) => {
      const healthContract = contract(tokenAbi);
      healthContract.setProvider(that.web3Provider);

      healthContract.deployed().then((instance) => {
        console.log("instance", instance);
        return instance.doctors('0x3c41749F9eCDF5247e3639Cd15acc6514264e039',
          {
            from: originAccount,
            value: '0'
          });
      }).then((status) => {
        console.log(status);
        if (status) {
          return resolve({status: true});
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error ');
      });
    });
  }

  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.afterDismiss().subscribe(reason => {
    });
  }

  succes() {
    const snackbarRef = this.snackbar.open('Transaction complete successfuly');
    snackbarRef.afterDismiss().subscribe(reason => {
    });
  }
}
