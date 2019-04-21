pragma solidity >=0.4.21 <0.6.0;
import "./Ownable.sol";

contract TrustExam is Ownable {
  struct ExamResult {
    bytes32 hashAnswer;
    string rawAnswer;
  }

  string public examName;
  uint256 public startTime;
  uint256 public duration;
  uint256 public submissionWindow;
  bytes32[] public listExamIDs;
  mapping(address => bytes32) public participants;
  mapping(address => ExamResult) public results;
  constructor(
    string memory _examName,
    uint256 _startTime,
    uint256 _duration, 
    uint256 _submissionWindow,
    bytes32[] memory _listExamIDs
  ) public {
    examName = _examName;
    startTime = _startTime;
    duration = _duration;
    submissionWindow = _submissionWindow;
    listExamIDs = _listExamIDs;
  }

  function registerParticipant(
    address _participantAddress,
    bytes32 _examID
  ) public onlyOwner onlyBeforeStartTime onlyValidExamId(_examID) returns(bool) {
    participants[_participantAddress] = _examID;
    return true;
  }

  function submitHashAnswer(bytes32 hashAnswer) public onlyParticipant onlyInProgress returns(bool) {
    results[msg.sender].hashAnswer = hashAnswer;
    return true;
  }

  function submitRawAnswer(string memory rawAnswer) public onlyParticipant onlyInSubmitRawAnswerTime returns(bool) {
    require(isValidAnswer(results[msg.sender].hashAnswer, rawAnswer));
    results[msg.sender].rawAnswer = rawAnswer;
    return true;
  }

  function isValidAnswer(bytes32 hashResult, string memory rawResult) private pure returns(bool) {
    return keccak256(abi.encode(rawResult)) == hashResult;
  }
  
  function getListExamIDs() public view returns(bytes32[] memory) {
    return listExamIDs;
  }

  function endTime() public view returns(uint256){
    return startTime + duration;
  }

  modifier onlyBeforeStartTime() {
    require(block.timestamp < startTime);
    _;
  }

  modifier onlyInProgress() {
    require(block.timestamp > startTime && block.timestamp < startTime + duration);
    _;
  }

  modifier onlyInSubmitRawAnswerTime() {
    require(block.timestamp > startTime + duration && block.timestamp < startTime + duration + submissionWindow);
    _;
  }

  modifier onlyParticipant() {
    require(participants[msg.sender] != 0x0);
    _;
  }

  modifier onlyValidExamId(bytes32 examId) {
    bool isInExamList = false;
    for(uint256 count = 0; count < listExamIDs.length; count++) {
      if(listExamIDs[count] == examId) {
        isInExamList = true;
        break;
      }
    }
    require(isInExamList);
    _;
  }
}
// "a",  1555747762, 200, 300, ["0x0000000000000000000000000000000000000000000000000000000000000012"]