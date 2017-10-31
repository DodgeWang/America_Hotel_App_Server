module.exports = {
    //用户基础信息 tbl_users
    userBaseInfo: {
          IdCode : "idCode",
          UserId : "id",
          Username : "username",
          Password : "password",
          DepartmentId : "departmentId",
          RoleId: "roleId",
          Name : "name",
          Social_security_Number : "SSN",
          Mailing_Address : "mailAddress",
          city_state_Zip_Code : "zipCode",
          Telephone : "telephone",
          Age : "age",
          Email : "email",

          Days_work : "daysWork",
          Work_nature : "workNature",
          Work_hours : "workHours",
          Work_at_night : "workAtNight",
          Work_available_date : "workAvailableDate",

          Is_Legal_status : "isLegalStatus",
          Have_Criminal_Record : "haveCriminalRecord",
          Criminal_Record : "criminalRecord",
          Have_DL : "haveDL",
          DL_Number : "DLNumber",
          DL_Issued_State : "DLIssuedState",

          Is_Jioned_Army : "IsJionedArmy",
          Is_Member_NG : "isMemberNG",
          Military_Specialty : "militarySpecialty"
    },

	//用户教育表映射 tbl_userschool
	userSchool: {
		Name: "name",
		Address: "address",
		Years_Completed: "yearCompleted",
		Major: "major",
		Degree_Diploma: "degreeDiploma"
	},

	//用户工作经历表映射 tbl_userworks
	userWork: {
		Name : "name",
        Supervisor : "supervisor",
        Hours : "hours",
        Address : "address",
        ZipCode : "zipCode",
        Phone : "phone",
        Job_Title : "jobTitle",
        Start_Date : "startDate",
        End_Date : "endDate",
        Start_Salary : "startSalary",
        End_Salary : "endSalary",
        Reason_Leaving : "reasonLeaving",
        Self_Summary : "selfSummary",
        Could_Contact :"couldContact"
	},



    //用户熟人信息表映射 tbl_usereferences
	userReferences: {
		Content: "content"
	},

  //房型信息表映射 tbl_usereferences
  roomType: {
    Id: "id",
    Type: "type"
  },
  
  //房间信息表映射 tbl_usereferences
  room: {
    Id: "id",
    Number: "number",
    TypeId: "typeId"
  },


	mappingToStr: function(obj){
		var strList = [];
        for(var i in obj){
          itemStr = obj[i] + ' AS ' + i;
          strList.push(itemStr)
        }
        return strList.join(",")
	}
}

