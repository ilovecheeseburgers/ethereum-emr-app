pragma solidity 0.5.0;

contract Health {

  struct doctor {
    bool exist;
    string name;

  }

  struct record{

    string prescriptionData;
    address doctorAddress;
    string visitDate;
    string additionalNotes;
    string fromPlace; // location clinic
  }

  struct access{
    bool createOnly;
    bool viewOnly;
  }


  struct patient {
    bool exist;
    string name;
    string DOB;
    string gender;
    string hseAddress;
    string contactNumber;
    mapping(address => access) doctors;

    record[] records;
  }

  address government;

  mapping(address => doctor) public doctors;
  mapping(address => patient)  patients;

  address[] public doctorsArray;
  address[] public patientsArray;

  modifier onlyGovernment() {
    require(msg.sender == government);
    _;
  }

  constructor()public{
    government = msg.sender;
  }

  function addDoctor(address _addr,string memory _name) public onlyGovernment returns (bool) {   // Government can only add doctor
    require(!doctors[_addr].exist,'Doctor Already exist');

    doctors[_addr].name = _name;
    doctors[_addr].exist = true;

    doctorsArray.push(_addr);
    return true;

  }

  function removeDoctor(address _addr) public onlyGovernment returns (bool) {// Government can only remove doctor
    require(doctors[_addr].exist,'Doctor does not exist');

    doctors[_addr].exist = false;

    return true;

  }

  function registerPatient(string memory _name,string memory _DOB,string memory _gender, string memory _hseAddress, string memory _contactNumber) public  returns (bool) {    // any one can register as a patient
    require(!patients[msg.sender].exist,'Patient Already exist');

    patients[msg.sender].exist = true;
    patients[msg.sender].name = _name;
    patients[msg.sender].DOB = _DOB;
    patients[msg.sender].hseAddress = _hseAddress;
    patients[msg.sender].contactNumber = _contactNumber;

    patientsArray.push(msg.sender);


    return true;

  }


  function giveCreateOnlyAccessToDoctor(address _addr) public  returns (bool) {  //patient give access to doctor
    require(doctors[_addr].exist,'Doctor does not exist');
    require(patients[msg.sender].exist,'Patient record does not exist.Please register first!!');
    require(!patients[msg.sender].doctors[_addr].createOnly,'Doctor already has access !!');

    patients[msg.sender].doctors[_addr].createOnly = true;

    return true;
  }

  function revokeCreateOnlyAccessToDoctor(address _addr) public  returns (bool) {  //patient revoke access to doctor
    require(doctors[_addr].exist,'Doctor does not exist');
    require(patients[msg.sender].exist,'Patient record does not exist.Please register first!!');
    require(patients[msg.sender].doctors[_addr].createOnly,'Doctor do not has access !!');

    patients[msg.sender].doctors[_addr].createOnly = false;

    return true;
  }

  function giveViewOnlyAccessToDoctor(address _addr) public  returns (bool) {  //patient give  view access to doctor
    require(doctors[_addr].exist,'Doctor does not exist');
    require(patients[msg.sender].exist,'Patient record does not exist.Please register first!!');
    require(!patients[msg.sender].doctors[_addr].viewOnly,'Doctor already has access !!');

    patients[msg.sender].doctors[_addr].viewOnly = true;

    return true;
  }

  function revokeViewOnlyAccessToDoctor(address _addr) public  returns (bool) {  //patient  view revoke access to doctor
    require(doctors[_addr].exist,'Doctor does not exist');
    require(patients[msg.sender].exist,'Patient record does not exist.Please register first!!');
    require(patients[msg.sender].doctors[_addr].viewOnly,'Doctor do not has access !!');

    patients[msg.sender].doctors[_addr].viewOnly = false;

    return true;
  }

  function addPrescriptionForPatient(address _addr, string memory _prescription,string memory _visitDate,string memory _additionalNotes, string memory _fromPlace) public  returns (bool) {  //doctor adds prescription for patient
    require(doctors[msg.sender].exist,'Doctor does not exist. please register first');
    require(patients[_addr].exist,'Patient record does not exist.');
    require(patients[_addr].doctors[msg.sender].createOnly,'Doctor do not has access !!');


    record memory newRecord = record({

      prescriptionData:_prescription,
      doctorAddress:msg.sender,
      visitDate:_visitDate,
      additionalNotes:_additionalNotes,
      fromPlace:_fromPlace
      });

    patients[_addr].records.push(newRecord);

    return true;
  }


  function getDoctorsCount() public view returns(uint count) {
    return doctorsArray.length;
  }


  function getPatientsCount() public view returns(uint count) {
    return patientsArray.length;
  }



  function getPatientsWithCreateOnlyAccess() public view  returns(address[] memory _patients) { // doctor can get all patients with create record access
    require(doctors[msg.sender].exist,'Doctor Not Registered');

    uint  count = patientsArray.length;

    address[] memory dataList = new address[](count);

    for( uint i = 0 ; i < getPatientsCount() ; i++){

      if(patients[patientsArray[i]].doctors[msg.sender].createOnly){

        dataList[i] = patientsArray[i];

      }
    }
    return dataList;

  }

  function getPatientsWithViewOnlyAccess() public view  returns(address[] memory _patients) { // doctor can get all patients with viewOnly access
    require(doctors[msg.sender].exist,'Doctor Not Registered');


    uint  count = patientsArray.length;

    address[] memory dataList = new address[](count);

    for( uint i = 0 ; i < getPatientsCount() ; i++){

      if(patients[patientsArray[i]].doctors[msg.sender].viewOnly){

        dataList[i] = patientsArray[i];

      }
    }
    return dataList;

  }


  function getDoctorsWithViewOnlyAccess() public view  returns(address[] memory _doctors) { // patients can get all doctor that have their view access
    require(patients[msg.sender].exist,'Patient Not Registered');

    uint  count = doctorsArray.length;

    address[] memory dataList = new address[](count);

    for( uint i = 0 ; i < getDoctorsCount() ; i++){

      if(patients[msg.sender].doctors[doctorsArray[i]].viewOnly){

        dataList[i] = doctorsArray[i];
      }
    }
    return dataList;

  }

  function getDoctorsWithCreateOnlyAccess() public view  returns(address[] memory ) { // patients can get all doctor that have their create record access
    require(patients[msg.sender].exist,'Patient Not Registered');

    uint  count = doctorsArray.length;

    address[] memory dataList = new address[](count);

    for( uint i = 0 ; i < getDoctorsCount() ; i++){

      if(patients[msg.sender].doctors[doctorsArray[i]].createOnly){

        dataList[i] = doctorsArray[i];
      }
    }
    return dataList;
  }


  function getPatients(address _addr) public view returns(string memory _name,string memory _DOB,string memory _gender) {
    require(patients[_addr].exist,'Patient record does not exist.Please register first!!');
    require(patients[_addr].doctors[msg.sender].viewOnly || _addr == msg.sender,'Do not has view access !!');

    _name = patients[_addr].name;
    _gender = patients[_addr].gender;
    _DOB = patients[_addr].DOB;

  }


  function getPatientsRecordsCount(address _addr) public view returns(uint count) {  // can be viewed by patient himself and doctor who has view access
    require(patients[_addr].exist,'Patient record does not exist.Please register first!!');
    require(patients[_addr].doctors[msg.sender].viewOnly ||  _addr == msg.sender,'Do not has view access  !!');
    return patients[_addr].records.length;
  }

  function getPatientsRecords(address _addr,uint256 index) public view returns(string memory _prescriptionData,
    address _doctorAddress,string memory _doctorName,string memory _visitDate,string memory _additionalNotes,string memory _fromPlace) {   // can be viewed by patient himself and doctor who has view access
    require(patients[_addr].exist,'Patient record does not exist.Please register first!!');
    require(patients[_addr].doctors[msg.sender].viewOnly || _addr == msg.sender,'Do not has view access !!');

    _prescriptionData =  patients[_addr].records[index].prescriptionData;
    _doctorAddress =  patients[_addr].records[index].doctorAddress;
    _doctorName =  doctors[_doctorAddress].name;
    _visitDate =  patients[_addr].records[index].visitDate;
    _additionalNotes =  patients[_addr].records[index].additionalNotes;
    _fromPlace =  patients[_addr].records[index].fromPlace;
  }


}
